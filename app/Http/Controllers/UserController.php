<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller{
   public function me(){
        $user = Auth::user()->load('profileImage');
        // 5min
        

        return response()->json([
            'id' => $user->id,
            'full_name' => $user->full_name,
            'username' => $user->username,
            'email' => $user->email,
            'profile_image' => $user->profileImage ? sezan($user->profileImage->image_path) : null,
        ]);


   }
}
