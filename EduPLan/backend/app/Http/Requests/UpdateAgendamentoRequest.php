<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAgendamentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $agendamento = $this->route('agendamento');
        
        return $user->isCoordenador() || $agendamento->user_id === $user->id;
    }

    public function rules(): array
    {
        return [
            'data' => 'sometimes|required|date|after_or_equal:today',
            'hora_inicio' => 'sometimes|required|date_format:H:i',
            'hora_fim' => 'sometimes|required|date_format:H:i|after:hora_inicio',
            'motivo_solicitacao' => 'nullable|string',
            'sala_id' => 'sometimes|required|exists:salas,id',
        ];
    }
}