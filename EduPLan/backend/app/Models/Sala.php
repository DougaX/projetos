<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'capacidade',
        'descricao',
    ];

    // Relacionamentos
    public function itens()
    {
        return $this->hasMany(Item::class);
    }

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class);
    }
}