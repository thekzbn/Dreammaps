<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            SkillSeeder::class,
            CategorySeeder::class,
            SkillLevelSeeder::class,
            UserSeeder::class,
            UserSkillSeeder::class,
        ]);
    }
}
