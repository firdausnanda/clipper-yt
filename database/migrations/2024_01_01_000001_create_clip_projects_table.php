<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create('clip_projects', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->string('youtube_url');
      $table->string('vizard_project_id')->nullable();
      $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
      $table->json('clips')->nullable();
      $table->string('project_name')->nullable();
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('clip_projects');
  }
};
