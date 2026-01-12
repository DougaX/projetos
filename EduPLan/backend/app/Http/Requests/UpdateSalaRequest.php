<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isCoordenador();
    }

    public function rules(): array
    {
        return [
            'nome' => 'sometimes|required|string|max:255',
            'capacidade' => 'sometimes|required|integer|min:1',
            'descricao' => 'nullable|string',
        ];
    }
}