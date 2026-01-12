<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nome',
        'email',
        'password',
        'tipo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // Relacionamentos
    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class);
    }

    public function solicitacoes()
    {
        return $this->hasMany(Solicitacao::class);
    }

    public function solicitacoesAvaliadas()
    {
        return $this->hasMany(Solicitacao::class, 'coordenador_id');
    }

    // Helpers
    public function isCoordenador(): bool
    {
        return $this->tipo === 'coordenador';
    }

    public function isProfessor(): bool
    {
        return $this->tipo === 'professor';
    }
}