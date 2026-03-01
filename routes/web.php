<?php

use App\Http\Controllers\ClipProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TikTokController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard = project list
    Route::get('/dashboard', [ClipProjectController::class, 'index'])->name('dashboard');

    // Integrations
    Route::get('/integrations', function () {
        $hasTikTok = auth()->user()->tiktokCredential()->exists();
        return Inertia::render('Integrations', ['hasTikTok' => $hasTikTok]);
    })->name('integrations');

    // Clip Projects
    Route::post('/projects', [ClipProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}', [ClipProjectController::class, 'show'])->name('projects.show');
    Route::post('/projects/{project}/refresh', [ClipProjectController::class, 'refresh'])->name('projects.refresh');

    // TikTok OAuth
    Route::get('/tiktok/redirect', [TikTokController::class, 'redirect'])->name('tiktok.redirect');
    Route::get('/tiktok/callback', [TikTokController::class, 'callback'])->name('tiktok.callback');
    Route::delete('/tiktok/disconnect', [TikTokController::class, 'disconnect'])->name('tiktok.disconnect');
    Route::post('/tiktok/publish', [TikTokController::class, 'publish'])->name('tiktok.publish');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/terms-of-service', function () {
    return Inertia::render('TermsOfService');
})->name('terms.of.service');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy.policy');

require __DIR__ . '/auth.php';
