<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user->isCoordenador()) {
            return response()->json([
                'message' => 'Acesso negado',
            ], 403);
        }

        $users = User::all();

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $newUser = User::create($data);

        return response()->json([
            'message' => 'Usuario criado com sucesso',
            'user' => new UserResource($newUser),
        ], 201);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Usuario atualizado com sucesso',
            'user' => new UserResource($user),
        ]);
    }

    public function destroy(Request $request, User $user)
    {
        $currentUser = $request->user();

        if (!$currentUser->isCoordenador()) {
            return response()->json([
                'message' => 'Apenas coordenadores podem excluir usuarios',
            ], 403);
        }

        if ($currentUser->id === $user->id) {
            return response()->json([
                'message' => 'Voce nao pode excluir a si mesmo',
            ], 400);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuario removido com sucesso',
        ]);
    }
}