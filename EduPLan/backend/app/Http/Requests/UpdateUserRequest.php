<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $currentUser = $this->user();
        $targetUser = $this->route('user');
        
        return $currentUser->isCoordenador() || $currentUser->id === $targetUser->id;
    }

    public function rules(): array
    {
        $userId = $this->route('user')->id;
        
        return [
            'nome' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|unique:users,email,' . $userId,
            'password' => 'sometimes|required|string|min:6',
            'tipo' => 'sometimes|required|in:professor,coordenador',
        ];
    }
}