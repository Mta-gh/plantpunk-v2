<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlantResource;
use App\Models\Plant;
use Illuminate\Http\Request;

class PlantController extends Controller
{
    public function index()
    {
        return PlantResource::collection(Plant::with(['category', 'tags'])->get());
    }

    public function show(Plant $plant)
    {
        return new PlantResource($plant->load(['category', 'tags']));
    }
}
