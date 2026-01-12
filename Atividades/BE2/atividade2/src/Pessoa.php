<?php

namespace App;

abstract class Pessoa
{
    protected string $nome;
    protected int $idade;
    protected float $peso;
    protected float $altura;

    public function __construct(string $nome, int $idade, float $peso, float $altura)
    {
        $this->nome = $nome;
        $this->idade = $idade;
        $this->peso = $peso;
        $this->altura = $altura;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function getIdade(): int
    {
        return $this->idade;
    }

    public function getPeso(): float
    {
        return $this->peso;
    }

    public function getAltura(): float
    {
        return $this->altura;
    }

    public function __toString(): string
    {
        return "Nome: {$this->nome}, Idade: {$this->idade} anos";
    }
}