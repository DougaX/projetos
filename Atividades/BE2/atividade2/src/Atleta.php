<?php

namespace App;

use App\Traits\IMCTrait;
use App\Interfaces\iFuncionario;

class Atleta extends Pessoa implements iFuncionario
{
    use IMCTrait;

    private string $modalidade;
    private float $salario;
    private int $anosContrato;

    public function __construct(
        string $nome, 
        int $idade, 
        float $peso, 
        float $altura,
        string $modalidade,
        float $salario,
        int $anosContrato
    ) {
        parent::__construct($nome, $idade, $peso, $altura);
        $this->modalidade = $modalidade;
        $this->salario = $salario;
        $this->anosContrato = $anosContrato;
        
        // Calcula o IMC ao criar o objeto
        $this->calcIMC();
    }

    public function getModalidade(): string
    {
        return $this->modalidade;
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
               ", Modalidade: {$this->modalidade}" .
               ", IMC: {$this->imc} ({$this->classifica()})";
    }
}