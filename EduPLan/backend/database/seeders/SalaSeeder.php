<?php

namespace Database\Seeders;

use App\Models\Sala;
use Illuminate\Database\Seeder;

class SalaSeeder extends Seeder
{
    public function run(): void
    {
        Sala::create([
            'nome' => 'Mini Auditorio',
            'capacidade' => 50,
            'descricao' => 'Auditorio para palestras e apresentacoes',
        ]);

        Sala::create([
            'nome' => 'Laboratorio de Informatica',
            'capacidade' => 30,
            'descricao' => 'Laboratorio com 30 computadores',
        ]);

        Sala::create([
            'nome' => 'Laboratorio de Ciencias',
            'capacidade' => 25,
            'descricao' => 'Laboratorio para experimentos cientificos',
        ]);

        Sala::create([
            'nome' => 'Sala de Video',
            'capacidade' => 40,
            'descricao' => 'Sala equipada com projetor e sistema de som',
        ]);

        Sala::create([
            'nome' => 'Biblioteca',
            'capacidade' => 60,
            'descricao' => 'Espaco para estudos e pesquisas',
        ]);
    }
}