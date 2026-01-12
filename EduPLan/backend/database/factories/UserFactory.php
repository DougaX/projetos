<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    protected static ?string $password;

    public function definition(): array
    {
        return [
            'nome' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('123456'),
            'tipo' => fake()->randomElement(['professor', 'coordenador']),
            'remember_token' => Str::random(10),
        ];
    }

    public function professor(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'professor',
        ]);
    }

    public function coordenador(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'coordenador',
        ]);
    }
}