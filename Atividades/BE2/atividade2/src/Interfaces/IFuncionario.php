<?php

namespace App\Interfaces;

interface iFuncionario
{
    /**
     * Retorna a string "Salário: R$ 00.000,00"
     */
    public function mostrarSalario(): string;

    /**
     * Retorna o tempo total de contrato como string
     * Exemplo: "Contrato de x anos."
     */
    public function mostrarTempoContrato(): string;
}