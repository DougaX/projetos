<?php

namespace Database\Factories;

use App\Models\Agendamento;
use App\Models\User;
use App\Models\Sala;
use Illuminate\Database\Eloquent\Factories\Factory;

class AgendamentoFactory extends Factory
{
    protected $model = Agendamento::class;

    public function definition(): array
    {
        $horaInicio = fake()->numberBetween(7, 18);
        $horaFim = $horaInicio + fake()->numberBetween(1, 3);

        return [
            'data' => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'hora_inicio' => sprintf('%02d:00', $horaInicio),
            'hora_fim' => sprintf('%02d:00', $horaFim),
            'status' => fake()->randomElement(['pendente', 'aprovado', 'reprovado']),
            'motivo_solicitacao' => fake()->sentence(8),
            'user_id' => User::factory(),
            'sala_id' => Sala::factory(),
        ];
    }

    public function pendente(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pendente',
        ]);
    }

    public function aprovado(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'aprovado',
        ]);
    }
}