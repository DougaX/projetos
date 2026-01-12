<?php

namespace App;

class App
{
    public static function init(): void
    {
        echo "=== CALCULADORA DE IMC ===" . PHP_EOL . PHP_EOL;

        // Criando pacientes para teste
        $pacientes = [
            new Paciente("Maria Silva", 25, 55, 1.65, "Unimed"),
            new Paciente("João Santos", 40, 90, 1.75, "SulAmérica"),
            new Paciente("Ana Oliveira", 30, 48, 1.60, "Bradesco"),
            new Paciente("Carlos Souza", 55, 110, 1.80, "Unimed"),
        ];

        foreach ($pacientes as $paciente) {
            echo "Paciente: " . $paciente->getNome() . PHP_EOL;
            echo "Idade: " . $paciente->getIdade() . " anos" . PHP_EOL;
            echo "Peso: " . $paciente->getPeso() . " kg" . PHP_EOL;
            echo "Altura: " . $paciente->getAltura() . " m" . PHP_EOL;
            echo "IMC: " . IMC::calc($paciente) . PHP_EOL;
            echo "Classificação: " . IMC::classifica($paciente) . PHP_EOL;
            echo str_repeat("-", 40) . PHP_EOL;
        }
    }
}