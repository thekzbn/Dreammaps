<?php

namespace Database\Factories;

use App\Models\Skill;
use Illuminate\Database\Eloquent\Factories\Factory;

class SkillFactory extends Factory
{
    protected $model = Skill::class;

    public function definition()
    {
        $skills = [
            'Coding/Programming',
            'Public Speaking',
            'Networking',
            'Problem Solving',
            'Digital Marketing',
            'Research',
            'Financial Literacy',
            'Sales',
            'Web Development',
            'Social Media Management',
            'Mobile App Development',
            'Decision Making',
            'Event Planning',
            'Baking',
            'Healthcare Skills',
            'Emotional Intelligence',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($skills),
        ];
    }
}
