<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Http\Requests\StoreSalaRequest;
use App\Http\Requests\UpdateSalaRequest;
use App\Http\Resources\SalaResource;

class SalaController extends Controller
{
    public function index()
    {
        $salas = Sala::with('itens')->get();

        return SalaResource::collection($salas);
    }

    public function store(StoreSalaRequest $request)
    {
        $sala = Sala::create($request->validated());

        return response()->json([
            'message' => 'Sala criada com sucesso',
            'sala' => new SalaResource($sala),
        ], 201);
    }

    public function show(Sala $sala)
    {
        $sala->load('itens', 'agendamentos');

        return new SalaResource($sala);
    }

    public function update(UpdateSalaRequest $request, Sala $sala)
    {
        $sala->update($request->validated());

        return response()->json([
            'message' => 'Sala atualizada com sucesso',
            'sala' => new SalaResource($sala),
        ]);
    }

    public function destroy(Sala $sala)
    {
        $sala->delete();

        return response()->json([
            'message' => 'Sala removida com sucesso',
        ]);
    }
}