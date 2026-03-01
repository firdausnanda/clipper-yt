<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VizardService
{
  protected string $apiKey;
  protected string $baseUrl;

  public function __construct()
  {
    $this->apiKey = config('services.vizard.api_key');
    $this->baseUrl = config('services.vizard.base_url');
  }

  /**
   * Submit a YouTube URL to Vizard for AI clipping.
   * Returns the Vizard project ID.
   */
  public function createProject(string $youtubeUrl, array $options = []): array
  {
    $response = Http::withHeaders([
      'VIZARDAI_API_KEY' => $this->apiKey,
      'Content-Type' => 'application/json',
    ])->post("{$this->baseUrl}/project/create", [
          'videoUrl' => $youtubeUrl,
          'videoType' => 2, // YouTube
          'lang' => $options['lang'] ?? 'auto',
          'preferLength' => $options['preferLength'] ?? [0], // auto
          'maxClipNumber' => $options['maxClipNumber'] ?? 10,
          'removeSilenceSwitch' => $options['removeSilence'] ?? 1,
          'subtitleSwitch' => $options['subtitles'] ?? 1,
        ]);

    $data = $response->json();

    if ($response->failed() || !isset($data['projectId'])) {
      Log::error('Vizard createProject failed', [
        'status' => $response->status(),
        'body' => $data,
      ]);
      throw new \Exception('Failed to create Vizard project: ' . ($data['message'] ?? 'Unknown error'));
    }

    return [
      'project_id' => $data['projectId'],
    ];
  }

  /**
   * Query the status of a Vizard project.
   * Returns status code and clips array if completed.
   * code 2000 = completed, code 1000 = still processing
   */
  public function queryProject(string $projectId): array
  {
    $response = Http::withHeaders([
      'VIZARDAI_API_KEY' => $this->apiKey,
    ])->get("{$this->baseUrl}/project/query/{$projectId}");

    $data = $response->json();

    if ($response->failed()) {
      Log::error('Vizard queryProject failed', [
        'projectId' => $projectId,
        'status' => $response->status(),
        'body' => $data,
      ]);
      throw new \Exception('Failed to query Vizard project');
    }

    return [
      'code' => $data['code'] ?? null,
      'message' => $data['message'] ?? '',
      'videos' => $data['videos'] ?? [],
    ];
  }
}
