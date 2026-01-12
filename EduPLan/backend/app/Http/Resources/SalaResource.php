<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'capacidade' => $this->capacidade,
            'descricao' => $this->descricao,
            'itens' => ItemResource::collection($this->whenLoaded('itens')),
            'agendamentos' => AgendamentoResource::collection($this->whenLoaded('agendamentos')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}