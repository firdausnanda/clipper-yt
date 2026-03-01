<?php

namespace App\Jobs;

use App\Models\ClipProject;
use App\Services\VizardService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PollVizardProjects implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  public function handle(VizardService $vizard): void
  {
    $projects = ClipProject::where('status', 'processing')
      ->whereNotNull('vizard_project_id')
      ->get();

    foreach ($projects as $project) {
      try {
        $result = $vizard->queryProject($project->vizard_project_id);

        $code = $result['code'] ?? null;

        if ($code === 2000 && !empty($result['videos'])) {
          $project->update([
            'status' => 'completed',
            'clips' => $result['videos'],
          ]);
          Log::info("Vizard project {$project->vizard_project_id} completed with " . count($result['videos']) . " clips.");
        } elseif ($code !== 1000 && $code !== 2000) {
          // Unknown status, possibly failed
          $project->update(['status' => 'failed']);
          Log::warning("Vizard project {$project->vizard_project_id} returned unrecognized code: {$code}");
        }
        // code 1000 = still processing, do nothing

      } catch (\Exception $e) {
        Log::error("Error polling Vizard project {$project->vizard_project_id}: " . $e->getMessage());
      }
    }
  }
}
