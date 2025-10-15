<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function Register(Request $request) {
        $request->validate([
           'full_name' => 'required|string|max:255',
            'username'  => 'required|string|max:255|unique:users',
            'email'     => 'required|string|email|unique:users',
            'password'  => 'required|string',     
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'username'  => $request->username,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
        ]);
        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user
        ]);
    }

   public function login(Request $request){
    $request->validate([
        'email' => 'required|email',
        'password'=> 'required',
    ]);

   $user = User::where('email', $request->email)->first();

   if(!$user || !Hash::check($request->password, $user->password)){
        return response()->json(['message'=>'Invalid credentials'], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);

    }


    public function updateUsername(Request $request, $id)
{
    $request->validate([
        'full_name' => 'sometimes|string',
        'username' => 'sometimes|required|string|min:3|max:20|unique:users,username,' . $id,
    ]);

    $user = User::findOrFail($id);

    if ($request->filled('full_name')) {
        $user->full_name = $request->full_name;
    }

    if ($request->filled('username')) {
        $user->username = Str::slug($request->username);
    }

    $user->save();

    return response()->json([
        'message' => 'User updated successfully',
        'user' => $user
    ]);
}
}
