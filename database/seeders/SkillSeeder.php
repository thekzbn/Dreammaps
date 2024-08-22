<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    public function run()
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

        foreach ($skills as $skill) {
            Skill::create([
                'name' => $skill,
            ]);
        }
    }
}

