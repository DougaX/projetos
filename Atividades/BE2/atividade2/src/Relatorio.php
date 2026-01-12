<?php

namespace App;

use App\Interfaces\iFuncionario;

class Relatorio
{
    private array $pessoas = [];

    /**
     * Adiciona uma pessoa ao relatório
     * Mantém a assinatura recebendo objeto do tipo Pessoa
     */
    public function add(Pessoa $pessoa): void
    {
        $this->pessoas[] = $pessoa;
    }

    /**
     * Gera o log do relatório
     * Se a pessoa implementa iFuncionario, mostra informações de contrato
     */
    public function log(): void
    {
        echo "=== RELATÓRIO ===" . PHP_EOL . PHP_EOL;

        foreach ($this->pessoas as $index => $pessoa) {
            echo "--- Pessoa " . ($index + 1) . " ---" . PHP_EOL;
            echo $pessoa . PHP_EOL;

            // Verifica se implementa a interface iFuncionario
            if ($pessoa instanceof iFuncionario) {
                echo $pessoa->mostrarSalario() . PHP_EOL;
                echo $pessoa->mostrarTempoContrato() . PHP_EOL;
            }

            echo PHP_EOL;
        }
    }
}