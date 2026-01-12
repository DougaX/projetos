<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isCoordenador();
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'tipo' => 'required|in:professor,coordenador',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome e obrigatorio',
            'email.required' => 'O email e obrigatorio',
            'email.unique' => 'Este email ja esta em uso',
            'password.required' => 'A senha e obrigatoria',
            'password.min' => 'A senha deve ter no minimo 6 caracteres',
        ];
    }
}