<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClipProject extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'youtube_url',
    'vizard_project_id',
    'status',
    'clips',
    'project_name',
  ];

  protected function casts(): array
  {
    return [
      'clips' => 'array',
    ];
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
