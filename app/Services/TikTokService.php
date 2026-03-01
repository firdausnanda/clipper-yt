<?php

namespace App\Services;

use App\Models\TikTokCredential;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TikTokService
{
  protected string $clientId;
  protected string $clientSecret;
  protected string $redirectUri;

  public function __construct()
  {
    $this->clientId = config('services.tiktok.client_id');
    $this->clientSecret = config('services.tiktok.client_secret');
    $this->redirectUri = config('services.tiktok.redirect_uri');
  }

  /**
   * Generate the TikTok OAuth authorization URL.
   */
  public function getAuthUrl(): string
  {
    $csrfState = Str::random(40);
    $codeVerifier = Str::random(128);

    session([
      'tiktok_csrf_state' => $csrfState,
      'tiktok_code_verifier' => $codeVerifier,
    ]);

    $codeChallenge = strtr(rtrim(base64_encode(hash('sha256', $codeVerifier, true)), '='), '+/', '-_');

    $params = http_build_query([
      'client_key' => $this->clientId,
      'scope' => 'user.info.basic,video.publish,video.upload',
      'response_type' => 'code',
      'redirect_uri' => $this->redirectUri,
      'state' => $csrfState,
      'code_challenge' => $codeChallenge,
      'code_challenge_method' => 'S256',
    ]);

    return "https://www.tiktok.com/v2/auth/authorize/?{$params}";
  }

  /**
   * Exchange authorization code for access & refresh tokens.
   */
  public function exchangeCodeForToken(string $code): array
  {
    $codeVerifier = session('tiktok_code_verifier', '');

    $response = Http::asForm()->post('https://open.tiktokapis.com/v2/oauth/token/', [
      'client_key' => $this->clientId,
      'client_secret' => $this->clientSecret,
      'code' => $code,
      'grant_type' => 'authorization_code',
      'redirect_uri' => $this->redirectUri,
      'code_verifier' => $codeVerifier,
    ]);

    $data = $response->json();

    if ($response->failed() || !isset($data['access_token'])) {
      Log::error('TikTok token exchange failed', ['body' => $data]);
      throw new \Exception('Failed to exchange TikTok auth code: ' . ($data['error_description'] ?? 'Unknown error'));
    }

    return [
      'access_token' => $data['access_token'],
      'refresh_token' => $data['refresh_token'] ?? null,
      'open_id' => $data['open_id'] ?? null,
      'expires_in' => $data['expires_in'] ?? 86400,
    ];
  }

  /**
   * Refresh an expired TikTok access token.
   */
  public function refreshToken(TikTokCredential $credential): array
  {
    $response = Http::asForm()->post('https://open.tiktokapis.com/v2/oauth/token/', [
      'client_key' => $this->clientId,
      'client_secret' => $this->clientSecret,
      'grant_type' => 'refresh_token',
      'refresh_token' => $credential->refresh_token,
    ]);

    $data = $response->json();

    if ($response->failed() || !isset($data['access_token'])) {
      Log::error('TikTok token refresh failed', ['body' => $data]);
      throw new \Exception('Failed to refresh TikTok token');
    }

    return [
      'access_token' => $data['access_token'],
      'refresh_token' => $data['refresh_token'] ?? $credential->refresh_token,
      'expires_in' => $data['expires_in'] ?? 86400,
    ];
  }

  /**
   * Publish a video to TikTok using PULL_FROM_URL.
   */
  public function publishVideo(TikTokCredential $credential, string $videoUrl, string $title = ''): array
  {
    // Ensure token is valid
    if ($credential->expires_at && $credential->expires_at->isPast()) {
      $tokens = $this->refreshToken($credential);
      $credential->update([
        'access_token' => $tokens['access_token'],
        'refresh_token' => $tokens['refresh_token'],
        'expires_at' => now()->addSeconds($tokens['expires_in']),
      ]);
      $credential->refresh();
    }

    $response = Http::withHeaders([
      'Authorization' => 'Bearer ' . $credential->access_token,
      'Content-Type' => 'application/json; charset=UTF-8',
    ])->post('https://open.tiktokapis.com/v2/post/publish/video/init/', [
          'post_info' => [
            'title' => Str::limit($title, 150),
            'privacy_level' => 'SELF_ONLY', // Default to private until app is audited
            'disable_duet' => false,
            'disable_comment' => false,
            'disable_stitch' => false,
          ],
          'source_info' => [
            'source' => 'PULL_FROM_URL',
            'video_url' => $videoUrl,
          ],
        ]);

    $data = $response->json();

    if ($response->failed()) {
      Log::error('TikTok post publish failed', [
        'status' => $response->status(),
        'body' => $data,
      ]);
      throw new \Exception('Failed to publish to TikTok: ' . ($data['error']['message'] ?? 'Unknown error'));
    }

    return [
      'publish_id' => $data['data']['publish_id'] ?? null,
    ];
  }
}
