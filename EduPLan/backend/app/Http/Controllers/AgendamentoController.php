<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use App\Models\Solicitacao;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isCoordenador()) {
            $agendamentos = Agendamento::with(['user', 'sala'])->get();
        } else {
            $agendamentos = Agendamento::with(['user', 'sala'])
                ->where('user_id', $user->id)
                ->get();
        }

        return response()->json($agendamentos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'data' => 'required|date|after_or_equal:today',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fim' => 'required|date_format:H:i|after:hora_inicio',
            'motivo_solicitacao' => 'nullable|string',
            'sala_id' => 'required|exists:salas,id',
            'justificativa_professor' => 'nullable|string',
        ]);

        // Verificar conflito de horario
        $conflito = Agendamento::where('sala_id', $request->sala_id)
            ->where('data', $request->data)
            ->where('status', '!=', 'reprovado')
            ->where(function ($query) use ($request) {
                $query->whereBetween('hora_inicio', [$request->hora_inicio, $request->hora_fim])
                    ->orWhereBetween('hora_fim', [$request->hora_inicio, $request->hora_fim])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('hora_inicio', '<=', $request->hora_inicio)
                          ->where('hora_fim', '>=', $request->hora_fim);
                    });
            })
            ->exists();

        if ($conflito) {
            return response()->json([
                'message' => 'Ja existe um agendamento para este horario',
            ], 422);
        }

        $agendamento = Agendamento::create([
            'data' => $request->data,
            'hora_inicio' => $request->hora_inicio,
            'hora_fim' => $request->hora_fim,
            'motivo_solicitacao' => $request->motivo_solicitacao,
            'status' => 'pendente',
            'user_id' => $request->user()->id,
            'sala_id' => $request->sala_id,
        ]);

        // Criar solicitacao automaticamente
        Solicitacao::create([
            'data_solicitacao' => now(),
            'status' => 'pendente',
            'justificativa_professor' => $request->justificativa_professor,
            'user_id' => $request->user()->id,
            'agendamento_id' => $agendamento->id,
        ]);

        $agendamento->load(['user', 'sala', 'solicitacao']);

        return response()->json([
            'message' => 'Agendamento solicitado com sucesso',
            'agendamento' => $agendamento,
        ], 201);
    }

    public function show(Agendamento $agendamento)
    {
        $agendamento->load(['user', 'sala', 'solicitacao']);

        return response()->json($agendamento);
    }

    public function update(Request $request, Agendamento $agendamento)
    {
        $user = $request->user();

        // Apenas o dono ou coordenador pode editar
        if (!$user->isCoordenador() && $agendamento->user_id !== $user->id) {
            return response()->json([
                'message' => 'Voce nao tem permissao para editar este agendamento',
            ], 403);
        }

        $request->validate([
            'data' => 'sometimes|required|date|after_or_equal:today',
            'hora_inicio' => 'sometimes|required|date_format:H:i',
            'hora_fim' => 'sometimes|required|date_format:H:i|after:hora_inicio',
            'motivo_solicitacao' => 'nullable|string',
            'sala_id' => 'sometimes|required|exists:salas,id',
        ]);

        $agendamento->update($request->all());

        return response()->json([
            'message' => 'Agendamento atualizado com sucesso',
            'agendamento' => $agendamento,
        ]);
    }

    public function destroy(Request $request, Agendamento $agendamento)
    {
        $user = $request->user();

        if (!$user->isCoordenador() && $agendamento->user_id !== $user->id) {
            return response()->json([
                'message' => 'Voce nao tem permissao para remover este agendamento',
            ], 403);
        }

        $agendamento->delete();

        return response()->json([
            'message' => 'Agendamento removido com sucesso',
        ]);
    }
}