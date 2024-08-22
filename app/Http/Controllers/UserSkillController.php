<?php

namespace App\Http\Controllers;

use App\Models\UserSkill;
use App\Models\SkillLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserSkillController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Fetch the user's skills and categories
        $userSkills = UserSkill::where('user_id', $user->id)
            ->with(['skill', 'category'])
            ->get();

        // Fetch videos based on the user's skills and categories, with relationships
        $videos = SkillLevel::with(['skill', 'category'])
            ->whereIn('skill_id', $userSkills->pluck('skill_id'))
            ->whereIn('category_id', $userSkills->pluck('category_id'))
            ->get();

        return Inertia::render('UserSkill/Index', [
            'videos' => $videos,
            'userSkills' => $userSkills,
        ]);
    }

    public function show($id)
    {
        // Fetch the video with related skill and category
        $video = SkillLevel::with(['skill', 'category'])->findOrFail($id);

        return Inertia::render('UserSkill/Show', [
            'video' => $video,
        ]);
    }
}


