<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show($username){
        $user = User::where('username', $username)->with('photos')->firstOrFail();
    
    return response()->json([
        'user' => $user,
        'photos' => $user->photos
    ]);
    }
}
