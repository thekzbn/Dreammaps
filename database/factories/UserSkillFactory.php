<?php

namespace Database\Factories;

use App\Models\UserSkill;
use App\Models\User;
use App\Models\Skill;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserSkillFactory extends Factory
{
    protected $model = UserSkill::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'skill_id' => Skill::factory(),
            'category_id' => Category::factory(),
        ];
    }
}
