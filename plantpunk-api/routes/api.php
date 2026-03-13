<?php

use App\Http\Controllers\Api\PlantController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TagController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('settings', fn () => response()->json([
        'name' => config('app.name'),
        'version' => config('app.version'),
    ]));

    Route::get('plants', [PlantController::class, 'index']);
    Route::get('plants/{plant:slug}', [PlantController::class, 'show']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('tags', [TagController::class, 'index']);
});
