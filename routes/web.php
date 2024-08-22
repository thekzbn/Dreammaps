<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\SkillLevelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSkillController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\SkillSelectionController;
use App\Http\Controllers\AdditionalDetailsController;
use App\Http\Controllers\SkillPickedController;
use App\Http\Middleware\AdditionalDetailsCompletedMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(
        [
            'auth',
            'verified',
            AdditionalDetailsCompletedMiddleware::class,
        ]
    )->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // onboarding
    Route::get('/onboarding/user-welcome', [WelcomeController::class, 'showWelcomePage'])->name('onboarding.user-welcome');
    Route::get('/onboarding/skill-picked', [SkillPickedController::class, 'showSkillPickedPage'])->name('onboarding.skill-picked');
    Route::get('/onboarding/select-skills', [SkillSelectionController::class, 'showSkillSelectionPage'])->name('onboarding.select-skills');
    Route::get('/onboarding/additional-details', [AdditionalDetailsController::class, 'showAdditionalDetailsPage'])->name('onboarding.additional-details');
    Route::post('/onboarding/add-user-skills', [SkillSelectionController::class, 'addUserSkills'])->name('onboarding.add-user-skills');
    Route::post('/onboarding/save-additional-details', [AdditionalDetailsController::class, 'saveAdditionalDetails'])->name('onboarding.save-additional-details');

    //users
    Route::resource('users', UserController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('skill-level', SkillLevelController::class);
    Route::resource('skills', SkillController::class);
    Route::get('user-skill', [UserSkillController::class, 'index'])->name('user-skill.index');
    Route::get('user-skill/{id}', [UserSkillController::class, 'show'])->name('user-skill.show');
});

Route::get('/feature', [FeatureController::class, 'feature'])->name('feature');
Route::get('/pricing', [FeatureController::class, 'pricing'])->name('pricing');
Route::get('/aboutus', [FeatureController::class, 'aboutus'])->name('aboutus');

require __DIR__ . '/auth.php';
