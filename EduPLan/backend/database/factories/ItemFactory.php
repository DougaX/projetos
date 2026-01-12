<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Sala;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
        $itens = [
            'Projetor',
            'Computador',
            'Ar Condicionado',
            'Quadro Branco',
            'TV',
            'Caixa de Som',
            'Microfone',
            'Mesa',
            'Cadeira',
            'Microscopio',
            'Impressora',
            'Webcam',
        ];

        return [
            'nome' => fake()->randomElement($itens) . ' ' . fake()->numberBetween(1, 100),
            'descricao' => fake()->sentence(5),
            'status' => fake()->randomElement(['disponivel', 'manutencao', 'indisponivel']),
            'sala_id' => Sala::factory(),
        ];
    }

    public function disponivel(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'disponivel',
        ]);
    }

    public function manutencao(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'manutencao',
        ]);
    }
}