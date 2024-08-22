<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function skillLevels()
    {
        return $this->hasMany(SkillLevel::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'skill_levels');
    }
}
