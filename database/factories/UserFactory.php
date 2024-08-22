<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Enums\UserRoles;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'dob' => $this->faker->date,
            'role' => $this->faker->randomElement([UserRoles::ADMIN, UserRoles::USER]),
        ];
    }

    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => UserRoles::ADMIN,
            ];
        });
    }

    public function user()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => UserRoles::USER,
            ];
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
