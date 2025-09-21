<?php 

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileImageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ProfileController;

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
    Route::get('/profile/{username}', [ProfileController::class, 'show']);


    // follow unfollow section route 

    Route::post('/user/{id}/follow', [FollowController::class, 'toggle']);
    Route::get('/users/{id}/followers', [FollowController::class, 'followers']); // followers list
    Route::get('/users/{id}/followings', [FollowController::class, 'followings']);
    Route::get('/user/{id}', [ProfileController::class, 'show']);
});