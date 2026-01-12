<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'status' => $this->status,
            'sala_id' => $this->sala_id,
            'sala' => new SalaResource($this->whenLoaded('sala')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}