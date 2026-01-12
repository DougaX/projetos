<?php

namespace App;

class Paciente extends Pessoa
{
    private string $convenio;

    public function __construct(string $nome, int $idade, float $peso, float $altura, string $convenio)
    {
        parent::__construct($nome, $idade, $peso, $altura);
        $this->convenio = $convenio;
    }

    public function getConvenio(): string
    {
        return $this->convenio;
    }

    public function __toString(): string
    {
        return parent::__toString() . ", Convênio: {$this->convenio}";
    }
}