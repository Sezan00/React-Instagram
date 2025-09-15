<?php 

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileImageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PhotoController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile-image', [ProfileImageController::class, 'index']);
    Route::post('/profile-image', [ProfileImageController::class, 'store']); 
    Route::delete('/profile-image', [ProfileImageController::class, 'destroy']);

    Route::get('/user', [UserController::class, 'me']);


    // photo upload section 

    Route::get('/photos', [PhotoController::class, 'index']);
    Route::post('/photos', [PhotoController::class, 'store']);
});