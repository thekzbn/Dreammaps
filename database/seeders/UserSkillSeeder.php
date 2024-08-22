<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserSkill;
use App\Models\User;
use App\Models\Skill;
use App\Models\Category;

class UserSkillSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $skills = Skill::all();
        $categories = Category::all();

        foreach ($users as $user) {
            foreach ($skills->random(3) as $skill) { // Assign 3 random skills to each user
                UserSkill::create([
                    'user_id' => $user->id,
                    'skill_id' => $skill->id,
                    'category_id' => $categories->random()->id,
                ]);
            }
        }
    }
}
