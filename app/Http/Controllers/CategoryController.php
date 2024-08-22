<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return inertia('Category/Index', [
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    public function create()
    {
        return inertia('Category/Create', [
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());
        return redirect()->route('categories.index');
    }

    public function edit(Category $category)
    {
        return inertia('Category/Edit', [
            'category' => CategoryResource::make($category),
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->route('categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index');
    }
}
