<?php

namespace App;

use App\Interfaces\iFuncionario;

class Medico extends Pessoa implements iFuncionario
{
    private string $especialidade;
    private string $crm;
    private float $salario;
    private int $anosContrato;

    public function __construct(
        string $nome, 
        int $idade, 
        float $peso, 
        float $altura,
        string $especialidade,
        string $crm,
        float $salario,
        int $anosContrato
    ) {
        parent::__construct($nome, $idade, $peso, $altura);
        $this->especialidade = $especialidade;
        $this->crm = $crm;
        $this->salario = $salario;
        $this->anosContrato = $anosContrato;
    }

    public function getEspecialidade(): string
    {
        return $this->especialidade;
    }

    public function getCRM(): string
    {
        return $this->crm;
    }

    // Implementação da interface iFuncionario
    public function mostrarSalario(): string
    {
        return "Salário: R$ " . number_format($this->salario, 2, ',', '.');
    }

    public function mostrarTempoContrato(): string
    {
        $anos = $this->anosContrato == 1 ? "ano" : "anos";
        return "Contrato de {$this->anosContrato} {$anos}.";
    }

    public function __toString(): string
    {
        return parent::__toString() . 
               ", Especialidade: {$this->especialidade}" .
               ", CRM: {$this->crm}";
    }
}