<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdditionalDetailsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'department' => ['required', 'string'],
            'school' => ['required', 'string'],
            'school_level' => ['required', 'string'],
            'category_id' => ['required', 'integer'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'department.required' => 'The department field is required.',
            'school.required' => 'The school field is required.',
            'category_id.required' => 'The category id field is required.',
            'school_level.required' => 'The school level id field is required.',
        ];
    }
}
