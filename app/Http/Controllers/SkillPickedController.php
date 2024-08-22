<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SkillPickedController extends Controller
{
    public function showSkillPickedPage()
    {
        return inertia('Onboarding/SkillPicked');
    }
}
