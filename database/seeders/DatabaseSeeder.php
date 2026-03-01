<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@clipper.test',
            'password' => bcrypt('password'),
        ]);

        // Test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@clipper.test',
            'password' => bcrypt('password'),
        ]);
    }
}
