<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show($username){
        $user = User::where('username', $username)->with('posts.photos', 'profileImage')->firstOrFail();

        $posts = $user->posts;

        $user = collect($user)->toArray();

        $user['profile_image'] = $user['profile_image'] ? url('storage/' . $user['profile_image']['image_path']) : null;
    
        return response()->json([
            'user' => $user,
            'posts' => $posts
        ]);
    }
}
