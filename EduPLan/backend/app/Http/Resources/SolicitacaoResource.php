<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SolicitacaoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'data_solicitacao' => $this->data_solicitacao->format('Y-m-d'),
            'status' => $this->status,
            'justificativa_professor' => $this->justificativa_professor,
            'justificativa_coordenador' => $this->justificativa_coordenador,
            'user_id' => $this->user_id,
            'coordenador_id' => $this->coordenador_id,
            'agendamento_id' => $this->agendamento_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'coordenador' => new UserResource($this->whenLoaded('coordenador')),
            'agendamento' => new AgendamentoResource($this->whenLoaded('agendamento')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}