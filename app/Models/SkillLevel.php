<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkillLevel extends Model
{
    use HasFactory;

    protected $fillable = ['skill_id', 'category_id', 'video_link'];

    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
