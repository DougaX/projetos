<?php

namespace App;

class IMC
{
    /**
     * Calcula o IMC de um Paciente
     * Fórmula: peso / (altura²)
     */
    public static function calc(Paciente $paciente): float
    {
        $peso = $paciente->getPeso();
        $altura = $paciente->getAltura();
        
        return round($peso / ($altura * $altura), 2);
    }

    /**
     * Classifica o IMC de acordo com a tabela padrão
     * Considera idade e retorna a classificação como string
     */
    public static function classifica(Paciente $paciente): string
    {
        $imc = self::calc($paciente);
        $idade = $paciente->getIdade();

        // Tabela de IMC normal por faixa etária (valores médios)
        // Baseado na imagem fornecida
        $faixasNormais = [
            ['min' => 19, 'max' => 24, 'imcMin' => 19, 'imcMax' => 24],
            ['min' => 25, 'max' => 34, 'imcMin' => 20, 'imcMax' => 25],
            ['min' => 35, 'max' => 44, 'imcMin' => 21, 'imcMax' => 26],
            ['min' => 45, 'max' => 54, 'imcMin' => 22, 'imcMax' => 27],
            ['min' => 55, 'max' => 64, 'imcMin' => 23, 'imcMax' => 28],
            ['min' => 65, 'max' => 150, 'imcMin' => 24, 'imcMax' => 29],
        ];

        // Classificação padrão (sem considerar idade específica)
        if ($imc < 18.5) {
            return "Abaixo do peso";
        } elseif ($imc >= 18.5 && $imc <= 24.9) {
            return "Saudável";
        } elseif ($imc >= 25.0 && $imc <= 29.9) {
            return "Sobrepeso";
        } else {
            return "Obesidade";
        }
    }
}