<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSalaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isCoordenador();
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'capacidade' => 'required|integer|min:1',
            'descricao' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da sala e obrigatorio',
            'capacidade.required' => 'A capacidade e obrigatoria',
            'capacidade.min' => 'A capacidade deve ser no minimo 1',
        ];
    }
}