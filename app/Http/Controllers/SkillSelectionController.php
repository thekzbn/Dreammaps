<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddUserSkilllRequest;
use App\Http\Resources\SkillResource;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Models\UserSkill;

class SkillSelectionController extends Controller
{
    public function showSkillSelectionPage()
    {
        return inertia('Onboarding/SkillSelection', [
            'skills' => SkillResource::collection(Skill::all())
        ]);
    }

    public function addUserSkills(AddUserSkilllRequest $request)
    {
        $user = $request->user();

        // Remove existing skills if you want to replace them
        $user->userSkills()->delete();

        foreach ($request->skills as $skillId) {
            UserSkill::create([
                'user_id' => $user->id,
                'skill_id' => $skillId,
            ]);
        }

        return redirect()->route('onboarding.skill-picked');
    }
}
