<?php

namespace App\Http\Controllers;

use App\Models\Solicitacao;
use Illuminate\Http\Request;

class SolicitacaoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isCoordenador()) {
            $solicitacoes = Solicitacao::with(['user', 'coordenador', 'agendamento.sala'])->get();
        } else {
            $solicitacoes = Solicitacao::with(['user', 'coordenador', 'agendamento.sala'])
                ->where('user_id', $user->id)
                ->get();
        }

        return response()->json($solicitacoes);
    }

    public function show(Solicitacao $solicitacao)
    {
        $solicitacao->load(['user', 'coordenador', 'agendamento.sala']);

        return response()->json($solicitacao);
    }

    public function aprovar(Request $request, Solicitacao $solicitacao)
    {
        $user = $request->user();

        if (!$user->isCoordenador()) {
            return response()->json([
                'message' => 'Apenas coordenadores podem aprovar solicitacoes',
            ], 403);
        }

        $request->validate([
            'justificativa_coordenador' => 'nullable|string',
        ]);

        $solicitacao->update([
            'status' => 'aprovada',
            'justificativa_coordenador' => $request->justificativa_coordenador,
            'coordenador_id' => $user->id,
        ]);

        $solicitacao->agendamento->update([
            'status' => 'aprovado',
        ]);

        $solicitacao->load(['user', 'coordenador', 'agendamento.sala']);

        return response()->json([
            'message' => 'Solicitacao aprovada com sucesso',
            'solicitacao' => $solicitacao,
        ]);
    }

    public function reprovar(Request $request, Solicitacao $solicitacao)
    {
        $user = $request->user();

        if (!$user->isCoordenador()) {
            return response()->json([
                'message' => 'Apenas coordenadores podem reprovar solicitacoes',
            ], 403);
        }

        $request->validate([
            'justificativa_coordenador' => 'required|string',
        ]);

        $solicitacao->update([
            'status' => 'reprovada',
            'justificativa_coordenador' => $request->justificativa_coordenador,
            'coordenador_id' => $user->id,
        ]);

        $solicitacao->agendamento->update([
            'status' => 'reprovado',
        ]);

        $solicitacao->load(['user', 'coordenador', 'agendamento.sala']);

        return response()->json([
            'message' => 'Solicitacao reprovada',
            'solicitacao' => $solicitacao,
        ]);
    }
}