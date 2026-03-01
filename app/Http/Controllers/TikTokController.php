<?php

namespace App\Http\Controllers;

use App\Models\ClipProject;
use App\Services\TikTokService;
use Illuminate\Http\Request;

class TikTokController extends Controller
{
  /**
   * Redirect the user to TikTok for authorization.
   */
  public function redirect(TikTokService $tiktok)
  {
    return redirect()->away($tiktok->getAuthUrl());
  }

  /**
   * Handle the TikTok OAuth callback.
   */
  public function callback(Request $request, TikTokService $tiktok)
  {
    $request->validate([
      'code' => 'required|string',
    ]);

    // Verify CSRF state
    $sessionState = session('tiktok_csrf_state');
    if ($request->state !== $sessionState) {
      return redirect()->route('integrations')->withErrors(['tiktok' => 'Invalid OAuth state.']);
    }

    try {
      $tokens = $tiktok->exchangeCodeForToken($request->code);

      $request->user()->tiktokCredential()->updateOrCreate(
        ['user_id' => $request->user()->id],
        [
          'access_token' => $tokens['access_token'],
          'refresh_token' => $tokens['refresh_token'],
          'open_id' => $tokens['open_id'],
          'expires_at' => now()->addSeconds($tokens['expires_in']),
        ]
      );

      return redirect()->route('integrations')->with('success', 'TikTok account connected successfully!');
    } catch (\Exception $e) {
      return redirect()->route('integrations')->withErrors(['tiktok' => 'Failed to connect TikTok: ' . $e->getMessage()]);
    }
  }

  /**
   * Disconnect TikTok account.
   */
  public function disconnect(Request $request)
  {
    $request->user()->tiktokCredential()?->delete();
    return back()->with('success', 'TikTok account disconnected.');
  }

  /**
   * Publish a clip to TikTok.
   */
  public function publish(Request $request, TikTokService $tiktok)
  {
    $validated = $request->validate([
      'video_url' => 'required|url',
      'caption' => 'nullable|string|max:150',
      'project_id' => 'required|exists:clip_projects,id',
    ]);

    $credential = $request->user()->tiktokCredential;

    if (!$credential) {
      return back()->withErrors(['tiktok' => 'Please connect your TikTok account first.']);
    }

    // Verify project ownership
    $project = ClipProject::where('id', $validated['project_id'])
      ->where('user_id', $request->user()->id)
      ->firstOrFail();

    try {
      $result = $tiktok->publishVideo(
        $credential,
        $validated['video_url'],
        $validated['caption'] ?? ''
      );

      return back()->with('success', 'Video submitted to TikTok! It will appear in your drafts shortly.');
    } catch (\Exception $e) {
      return back()->withErrors(['tiktok' => 'Failed to publish: ' . $e->getMessage()]);
    }
  }
}
