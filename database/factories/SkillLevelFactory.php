<?php

namespace Database\Factories;

use App\Models\SkillLevel;
use Illuminate\Database\Eloquent\Factories\Factory;

class SkillLevelFactory extends Factory
{
    protected $model = SkillLevel::class;

    public function definition()
    {
        return [
            'skill_id' => \App\Models\Skill::factory(),
            'category_id' => \App\Models\Category::factory(),
            'video_link' => $this->faker->url,
        ];
    }
}

