<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;

class ItemController extends Controller
{
    public function index()
    {
        $itens = Item::with('sala')->get();

        return ItemResource::collection($itens);
    }

    public function store(StoreItemRequest $request)
    {
        $item = Item::create($request->validated());

        return response()->json([
            'message' => 'Item criado com sucesso',
            'item' => new ItemResource($item),
        ], 201);
    }

    public function show(Item $item)
    {
        $item->load('sala');

        return new ItemResource($item);
    }

    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->update($request->validated());

        return response()->json([
            'message' => 'Item atualizado com sucesso',
            'item' => new ItemResource($item),
        ]);
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return response()->json([
            'message' => 'Item removido com sucesso',
        ]);
    }
}