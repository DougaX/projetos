<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAgendamentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'data' => 'required|date|after_or_equal:today',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fim' => 'required|date_format:H:i|after:hora_inicio',
            'motivo_solicitacao' => 'nullable|string',
            'sala_id' => 'required|exists:salas,id',
            'justificativa_professor' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'data.required' => 'A data e obrigatoria',
            'data.after_or_equal' => 'A data deve ser hoje ou futura',
            'hora_inicio.required' => 'A hora de inicio e obrigatoria',
            'hora_fim.required' => 'A hora de fim e obrigatoria',
            'hora_fim.after' => 'A hora de fim deve ser depois da hora de inicio',
            'sala_id.required' => 'A sala e obrigatoria',
            'sala_id.exists' => 'A sala selecionada nao existe',
        ];
    }
}