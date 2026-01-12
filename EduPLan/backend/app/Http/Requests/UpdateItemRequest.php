<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isCoordenador();
    }

    public function rules(): array
    {
        return [
            'nome' => 'sometimes|required|string|max:255',
            'descricao' => 'nullable|string',
            'status' => 'in:disponivel,manutencao,indisponivel',
            'sala_id' => 'sometimes|required|exists:salas,id',
        ];
    }
}