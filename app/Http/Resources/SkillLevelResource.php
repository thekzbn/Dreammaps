<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillLevelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'skill_id' => $this->skill_id,
            'category_id' => $this->category_id,
            'video_link' => $this->video_link,
            'skill' => new SkillResource($this->whenLoaded('skill')),
            'category' => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}

