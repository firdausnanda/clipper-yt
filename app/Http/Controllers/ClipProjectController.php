<?php

namespace App\Http\Controllers;

use App\Models\ClipProject;
use App\Services\VizardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClipProjectController extends Controller
{
  /**
   * Display a list of the user's clip projects.
   */
  public function index(Request $request)
  {
    $projects = $request->user()
      ->clipProjects()
      ->orderByDesc('created_at')
      ->paginate(12);

    $hasTikTok = $request->user()->tiktokCredential()->exists();

    return Inertia::render('Dashboard', [
      'projects' => $projects,
      'hasTikTok' => $hasTikTok,
    ]);
  }

  /**
   * Submit a new YouTube URL for clipping.
   */
  public function store(Request $request, VizardService $vizard)
  {
    $validated = $request->validate([
      'youtube_url' => ['required', 'url', 'regex:/youtube\.com|youtu\.be/i'],
    ]);

    $project = $request->user()->clipProjects()->create([
      'youtube_url' => $validated['youtube_url'],
      'status' => 'pending',
    ]);

    try {
      $result = $vizard->createProject($validated['youtube_url']);
      $project->update([
        'vizard_project_id' => $result['project_id'],
        'status' => 'processing',
      ]);
    } catch (\Exception $e) {
      $project->update(['status' => 'failed']);
      return back()->withErrors(['youtube_url' => 'Failed to submit to Vizard: ' . $e->getMessage()]);
    }

    return redirect()->route('projects.show', $project)
      ->with('success', 'Video submitted! Clips will appear once processing is complete.');
  }

  /**
   * Display a single project with its clips.
   */
  public function show(Request $request, ClipProject $project)
  {
    // Ensure the project belongs to the authenticated user
    if ($project->user_id !== $request->user()->id) {
      abort(403);
    }

    $hasTikTok = $request->user()->tiktokCredential()->exists();

    return Inertia::render('Projects/Show', [
      'project' => $project,
      'hasTikTok' => $hasTikTok,
    ]);
  }

  /**
   * Manually refresh a project's status from Vizard.
   */
  public function refresh(Request $request, ClipProject $project, VizardService $vizard)
  {
    if ($project->user_id !== $request->user()->id) {
      abort(403);
    }

    if (!$project->vizard_project_id || $project->status === 'completed') {
      return back();
    }

    try {
      $result = $vizard->queryProject($project->vizard_project_id);

      if (($result['code'] ?? null) === 2000 && !empty($result['videos'])) {
        $project->update([
          'status' => 'completed',
          'clips' => $result['videos'],
        ]);
      }
    } catch (\Exception $e) {
      // Silently fail on manual refresh
    }

    return back();
  }
}
