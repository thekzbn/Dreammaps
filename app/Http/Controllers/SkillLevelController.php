<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSkillLevelRequest;
use App\Http\Requests\UpdateSkillLevelRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\SkillLevelResource;
use App\Http\Resources\SkillResource;
use App\Models\Category;
use App\Models\Skill;
use App\Models\SkillLevel;
use Illuminate\Http\Request;

class SkillLevelController extends Controller
{
    public function index()
    {
        $skillLevels = SkillLevelResource::collection(SkillLevel::with(['skill', 'category'])->get());

        return inertia('SkillLevel/Index', [
            'skillLevels' => $skillLevels,
        ]);
    }

    public function create()
    {
        return inertia('SkillLevel/Create', [
            'skills' => SkillResource::collection(Skill::all()),
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    public function store(StoreSkillLevelRequest $request)
    {
        // Check for duplicate combination of skill_id, category_id, and video_link
        $exists = SkillLevel::where('skill_id', $request->skill_id)
            ->where('category_id', $request->category_id)
            ->where('video_link', $request->video_link)
            ->exists();

        if ($exists) {
            return redirect()->back()->withErrors(['duplicate' => 'This skill level already exists.']);
        }

        SkillLevel::create($request->validated());
        return redirect()->route('skill-level.index');
    }

    public function edit(SkillLevel $skillLevel)
    {
        return inertia('SkillLevel/Edit', [
            'skillLevel' => SkillLevelResource::make($skillLevel),
            'skills' => SkillResource::collection(Skill::all()),
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    public function update(UpdateSkillLevelRequest $request, SkillLevel $skillLevel)
    {
        $skillLevel->update($request->validated());

        return redirect()->route('skill-level.index');
    }

    public function destroy(SkillLevel $skillLevel)
    {
        $skillLevel->delete();
        return redirect()->route('skillLevel.index');
    }
}