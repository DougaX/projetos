<?php

namespace App\Traits;

trait IMCTrait
{
    protected float $imc = 0;

    /**
     * Calcula o IMC do atleta e altera o atributo $this->imc
     */
    public function calcIMC(): float
    {
        $this->imc = round($this->peso / ($this->altura * $this->altura), 2);
        return $this->imc;
    }

    /**
     * Calcula e retorna a classificação do IMC como string
     */
    public function classifica(): string
    {
        // Garante que o IMC está calculado
        if ($this->imc == 0) {
            $this->calcIMC();
        }

        if ($this->imc < 18.5) {
            return "Abaixo do peso";
        } elseif ($this->imc >= 18.5 && $this->imc <= 24.9) {
            return "Saudável";
        } elseif ($this->imc >= 25.0 && $this->imc <= 29.9) {
            return "Sobrepeso";
        } else {
            return "Obesidade";
        }
    }

    /**
     * Retorna true se o IMC é normal considerando a idade
     * Baseado na tabela de IMC por faixa etária
     */
    public function isNormal(): bool
    {
        // Garante que o IMC está calculado
        if ($this->imc == 0) {
            $this->calcIMC();
        }

        // Tabela de IMC normal por faixa etária
        $faixas = [
            ['minIdade' => 19, 'maxIdade' => 24, 'minIMC' => 19, 'maxIMC' => 24],
            ['minIdade' => 25, 'maxIdade' => 34, 'minIMC' => 20, 'maxIMC' => 25],
            ['minIdade' => 35, 'maxIdade' => 44, 'minIMC' => 21, 'maxIMC' => 26],
            ['minIdade' => 45, 'maxIdade' => 54, 'minIMC' => 22, 'maxIMC' => 27],
            ['minIdade' => 55, 'maxIdade' => 64, 'minIMC' => 23, 'maxIMC' => 28],
            ['minIdade' => 65, 'maxIdade' => 150, 'minIMC' => 24, 'maxIMC' => 29],
        ];

        foreach ($faixas as $faixa) {
            if ($this->idade >= $faixa['minIdade'] && $this->idade <= $faixa['maxIdade']) {
                return $this->imc >= $faixa['minIMC'] && $this->imc <= $faixa['maxIMC'];
            }
        }

        // Faixa padrão para idades não mapeadas
        return $this->imc >= 18.5 && $this->imc <= 24.9;
    }

    public function getIMC(): float
    {
        return $this->imc;
    }
}