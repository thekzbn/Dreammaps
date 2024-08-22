<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return inertia('Skill/Index', [
            'skills' => SkillResource::collection(Skill::all())
        ]);
    }

    public function create()
    {
        return inertia('Skill/Create', [
            'skills' => SkillResource::collection(Skill::all()),
        ]);
    }

    public function store(StoreSkillRequest $request)
    {
        $skill = Skill::create($request->validated());
        return redirect()->route('skills.index');
    }

    public function edit(Skill $skill)
    {
        return inertia('Skill/Edit', [
            'skill' => SkillResource::make($skill),
        ]);
    }

    public function update(UpdateSkillRequest $request, Skill $skill)
    {
        $skill->update($request->validated());
        return redirect()->route('skills.index');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(null, 204);
    }
}