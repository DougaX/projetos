<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgendamentoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'data' => $this->data->format('Y-m-d'),
            'hora_inicio' => $this->hora_inicio,
            'hora_fim' => $this->hora_fim,
            'status' => $this->status,
            'motivo_solicitacao' => $this->motivo_solicitacao,
            'user_id' => $this->user_id,
            'sala_id' => $this->sala_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'sala' => new SalaResource($this->whenLoaded('sala')),
            'solicitacao' => new SolicitacaoResource($this->whenLoaded('solicitacao')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}