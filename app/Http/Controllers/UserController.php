<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
   public function me(){
        $user = Auth::user()->load('profileImage');

        return response()->json([
            'id' => $user->id,
            'full_name' => $user->full_name,
            'username' => $user->username,
            'email' => $user->email,
            'profile_image' => $user->profileImage ? url('storage/' . $user->profileImage->image_path) : null,
        ]);
   }
}
