<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use App\Models\Skill;
use App\Models\SkillLevel;
use App\Models\UserSkill;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getUsersCount()
    {
        return response()->json(['count' => User::count()]);
    }

    public function getCategoriesCount()
    {
        return response()->json(['count' => Category::count()]);
    }

    public function getSkillsCount()
    {
        return response()->json(['count' => Skill::count()]);
    }

    public function getSkillLevelsCount()
    {
        return response()->json(['count' => SkillLevel::count()]);
    }

    public function getUserGrowth()
    {
        $userGrowth = User::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', Carbon::now()->year)
            ->groupBy('month')
            ->pluck('count', 'month')
            ->all();

        // Prepare data for the chart
        $labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        $data = [];
        foreach ($labels as $key => $label) {
            // Populate the data array with counts, default to 0 if no data for the month
            $data[] = $userGrowth[$key + 1] ?? 0;
        }

        return response()->json([
            'labels' => $labels,
            'data' => $data,
        ]);
    }

    public function getSkillsDistribution()
    {
        dd("here");
        $skillsDistribution = Skill::selectRaw('category_id, COUNT(*) as count')
            ->groupBy('category_id')
            ->pluck('count', 'category_id')
            ->all();

        $labels = [];
        $data = [];

        foreach ($skillsDistribution as $categoryId => $count) {
            $categoryName = Category::find($categoryId)->name;
            $labels[] = $categoryName;
            $data[] = $count;
        }

        return response()->json([
            'labels' => $labels,
            'data' => $data,
        ]);
    }
}
