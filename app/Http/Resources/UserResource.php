<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'dob' => $this->dob,
            'gender' => $this->gender,
            'role' => $this->role,
            'department' => $this->department,
            'school' => $this->school,
            'created_at_formatted' => $this->created_at->toFormattedDateString(),
        ];
    }
}
