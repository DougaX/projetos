<?php

namespace Database\Factories;

use App\Models\Sala;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalaFactory extends Factory
{
    protected $model = Sala::class;

    public function definition(): array
    {
        $salas = [
            'Laboratorio de Informatica',
            'Laboratorio de Ciencias',
            'Mini Auditorio',
            'Sala de Video',
            'Biblioteca',
            'Sala de Reunioes',
            'Auditorio Principal',
            'Laboratorio de Fisica',
            'Laboratorio de Quimica',
            'Sala Multimidia',
        ];

        return [
            'nome' => fake()->unique()->randomElement($salas),
            'capacidade' => fake()->numberBetween(15, 100),
            'descricao' => fake()->sentence(10),
        ];
    }
}