<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\SolicitacaoController;
use App\Http\Controllers\UserController;

// Rotas publicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas publicas de leitura
Route::get('/salas', [SalaController::class, 'index']);
Route::get('/salas/{sala}', [SalaController::class, 'show']);
Route::get('/itens', [ItemController::class, 'index']);
Route::get('/itens/{item}', [ItemController::class, 'show']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    
    // Autenticacao
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-all', [AuthController::class, 'logoutAll']);

    // Usuarios (coordenador gerencia professores)
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    // Salas (apenas coordenador pode criar, editar, deletar)
    Route::post('/salas', [SalaController::class, 'store']);
    Route::put('/salas/{sala}', [SalaController::class, 'update']);
    Route::delete('/salas/{sala}', [SalaController::class, 'destroy']);

    // Itens (apenas coordenador pode criar, editar, deletar)
    Route::post('/itens', [ItemController::class, 'store']);
    Route::put('/itens/{item}', [ItemController::class, 'update']);
    Route::delete('/itens/{item}', [ItemController::class, 'destroy']);

    // Agendamentos
    Route::get('/agendamentos', [AgendamentoController::class, 'index']);
    Route::post('/agendamentos', [AgendamentoController::class, 'store']);
    Route::get('/agendamentos/{agendamento}', [AgendamentoController::class, 'show']);
    Route::put('/agendamentos/{agendamento}', [AgendamentoController::class, 'update']);
    Route::delete('/agendamentos/{agendamento}', [AgendamentoController::class, 'destroy']);

    // Solicitacoes
    Route::get('/solicitacoes', [SolicitacaoController::class, 'index']);
    Route::get('/solicitacoes/{solicitacao}', [SolicitacaoController::class, 'show']);
    Route::post('/solicitacoes/{solicitacao}/aprovar', [SolicitacaoController::class, 'aprovar']);
    Route::post('/solicitacoes/{solicitacao}/reprovar', [SolicitacaoController::class, 'reprovar']);
});