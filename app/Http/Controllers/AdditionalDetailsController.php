<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdditionalDetailsRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class AdditionalDetailsController extends Controller
{
    public function showAdditionalDetailsPage()
    {
        return inertia('Onboarding/AdditionalDetails', [
            'categories' => CategoryResource::collection(Category::all())
        ]);
    }

    public function saveAdditionalDetails(AdditionalDetailsRequest $request)
    {
        $user = $request->user();

        // Save user department, school, and school level
        $user->update([
            'department' => $request->input('department'),
            'school' => $request->input('school'),
            'school_level' => $request->input('school_level'),
        ]);

        // Update category_id for the user's skills
        $user->userSkills()->update(['category_id' => $request->input('category_id')]);

        return redirect(route('dashboard', absolute: false));
    }
}
