<?php

namespace Database\Factories;

use App\Models\Solicitacao;
use App\Models\User;
use App\Models\Agendamento;
use Illuminate\Database\Eloquent\Factories\Factory;

class SolicitacaoFactory extends Factory
{
    protected $model = Solicitacao::class;

    public function definition(): array
    {
        return [
            'data_solicitacao' => fake()->dateTimeBetween('-7 days', 'now')->format('Y-m-d'),
            'status' => fake()->randomElement(['pendente', 'aprovada', 'reprovada']),
            'justificativa_professor' => fake()->sentence(10),
            'justificativa_coordenador' => fake()->optional()->sentence(8),
            'user_id' => User::factory(),
            'coordenador_id' => null,
            'agendamento_id' => Agendamento::factory(),
        ];
    }

    public function pendente(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pendente',
            'justificativa_coordenador' => null,
            'coordenador_id' => null,
        ]);
    }

    public function aprovada(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'aprovada',
        ]);
    }
}