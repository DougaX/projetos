<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Coordenador
        User::create([
            'nome' => 'Coordenador Teste',
            'email' => 'coordenador@eduplan.com',
            'password' => Hash::make('123456'),
            'tipo' => 'coordenador',
        ]);

        // Professores
        User::create([
            'nome' => 'Professor Joao',
            'email' => 'joao@eduplan.com',
            'password' => Hash::make('123456'),
            'tipo' => 'professor',
        ]);

        User::create([
            'nome' => 'Professora Maria',
            'email' => 'maria@eduplan.com',
            'password' => Hash::make('123456'),
            'tipo' => 'professor',
        ]);
    }
}