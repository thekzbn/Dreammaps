<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SkillLevel;
use App\Models\Skill;
use App\Models\Category;

class SkillLevelSeeder extends Seeder
{
    public function run()
    {
        $skills = Skill::all();
        $categories = Category::all();

        foreach ($skills as $skill) {
            foreach ($categories as $category) {
                SkillLevel::create([
                    'skill_id' => $skill->id,
                    'category_id' => $category->id,
                    'video_link' => 'https://www.youtube.com/watch?v=' . $this->getRandomYoutubeId(),
                ]);
            }
        }
    }

    private function getRandomYoutubeId()
    {
        $ids = ['dQw4w9WgXcQ', '9bZkp7q19f0', 'L_jWHffIx5E']; // Example YouTube video IDs
        return $ids[array_rand($ids)];
    }
}
