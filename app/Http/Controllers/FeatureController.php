<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FeatureController extends Controller
{
    public function feature()
    {
        return inertia('Feature');
    }

    public function pricing()
    {
        return inertia('Pricing');
    }

    public function aboutus()
    {
        return inertia('Aboutus');
    }
}
