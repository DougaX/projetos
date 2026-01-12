<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $table = 'itens';

    protected $fillable = [
        'nome',
        'descricao',
        'status',
        'sala_id',
    ];

    // Relacionamentos
    public function sala()
    {
        return $this->belongsTo(Sala::class);
    }
}