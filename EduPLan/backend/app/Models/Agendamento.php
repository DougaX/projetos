<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'data',
        'hora_inicio',
        'hora_fim',
        'status',
        'motivo_solicitacao',
        'user_id',
        'sala_id',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'date',
        ];
    }

    // Relacionamentos
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sala()
    {
        return $this->belongsTo(Sala::class);
    }

    public function solicitacao()
    {
        return $this->hasOne(Solicitacao::class);
    }
}