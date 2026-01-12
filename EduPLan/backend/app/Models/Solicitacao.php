<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitacao extends Model
{
    use HasFactory;

    protected $table = 'solicitacoes';

    protected $fillable = [
        'data_solicitacao',
        'status',
        'justificativa_professor',
        'justificativa_coordenador',
        'user_id',
        'coordenador_id',
        'agendamento_id',
    ];

    protected function casts(): array
    {
        return [
            'data_solicitacao' => 'date',
        ];
    }

    // Relacionamentos
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function coordenador()
    {
        return $this->belongsTo(User::class, 'coordenador_id');
    }

    public function agendamento()
    {
        return $this->belongsTo(Agendamento::class);
    }
}