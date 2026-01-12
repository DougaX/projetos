<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isCoordenador();
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'status' => 'in:disponivel,manutencao,indisponivel',
            'sala_id' => 'required|exists:salas,id',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome do item e obrigatorio',
            'sala_id.required' => 'A sala e obrigatoria',
            'sala_id.exists' => 'A sala selecionada nao existe',
        ];
    }
}