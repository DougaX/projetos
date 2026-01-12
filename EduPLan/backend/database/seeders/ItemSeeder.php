<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        // Itens do Mini Auditorio (sala_id = 1)
        Item::create([
            'nome' => 'Projetor Epson',
            'descricao' => 'Projetor Full HD',
            'status' => 'disponivel',
            'sala_id' => 1,
        ]);

        Item::create([
            'nome' => 'Sistema de Som',
            'descricao' => 'Caixas de som e microfone',
            'status' => 'disponivel',
            'sala_id' => 1,
        ]);

        // Itens do Lab de Informatica (sala_id = 2)
        Item::create([
            'nome' => 'Computadores',
            'descricao' => '30 computadores com Windows 11',
            'status' => 'disponivel',
            'sala_id' => 2,
        ]);

        Item::create([
            'nome' => 'Ar Condicionado',
            'descricao' => 'Split 24000 BTUs',
            'status' => 'disponivel',
            'sala_id' => 2,
        ]);

        // Itens do Lab de Ciencias (sala_id = 3)
        Item::create([
            'nome' => 'Microscopios',
            'descricao' => '10 microscopios opticos',
            'status' => 'disponivel',
            'sala_id' => 3,
        ]);

        Item::create([
            'nome' => 'Vidrarias',
            'descricao' => 'Kit completo de vidrarias',
            'status' => 'manutencao',
            'sala_id' => 3,
        ]);

        // Itens da Sala de Video (sala_id = 4)
        Item::create([
            'nome' => 'TV 65 polegadas',
            'descricao' => 'Smart TV 4K',
            'status' => 'disponivel',
            'sala_id' => 4,
        ]);

        Item::create([
            'nome' => 'DVD Player',
            'descricao' => 'Player de DVD e Blu-ray',
            'status' => 'indisponivel',
            'sala_id' => 4,
        ]);

        // Itens da Biblioteca (sala_id = 5)
        Item::create([
            'nome' => 'Mesas de Estudo',
            'descricao' => '15 mesas para estudo individual',
            'status' => 'disponivel',
            'sala_id' => 5,
        ]);
    }
}