<?php

namespace App\Http\Controllers;

class WelcomeController extends Controller
{
    public function showWelcomePage()
    {
        return inertia('Onboarding/UserWelcome');
    }
}
