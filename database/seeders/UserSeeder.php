<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\UserRoles;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory()->count(3)->create([
            'role' => UserRoles::USER,
            'password' => Hash::make('password'),
        ]); // 3 regular users

        User::factory()->count(2)->create([
            'role' => UserRoles::ADMIN,
            'password' => Hash::make('password'),
        ]); // 2 admin users
    }
}