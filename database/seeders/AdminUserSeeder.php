<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('CASAYUR_ADMIN_EMAIL');
        $password = env('CASAYUR_ADMIN_PASSWORD');

        if (! $email || ! $password) {
            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            ['name' => env('CASAYUR_ADMIN_NAME', 'Casayur Admin'), 'password' => $password, 'role' => 'admin', 'email_verified_at' => now()]
        );
    }
}
