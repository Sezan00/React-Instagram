<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function show($username){
        $user = User::where('username', $username)->with('posts.photos', 'profileImage')->firstOrFail();

        $followers = DB::table('follows')
        ->join('users', 'follows.follower_id', '=', 'users.id')
        ->leftJoin('profile_images', 'users.id', '=', 'profile_images.user_id')
        ->where('following_id', $user->id)
        ->select('users.id', 'users.username',
            DB::raw("CASE 
                WHEN profile_images.image_path IS NOT NULL 
                THEN CONCAT('" . url('storage') . "/', profile_images.image_path)
                ELSE NULL
            END as profile_image")
        )
        ->get();

        $following = DB::table('follows')
        ->join('users', 'follows.following_id', '=', 'users.id')
        ->leftJoin('profile_images', 'users.id', '=', 'profile_images.user_id')
        ->where('follower_id', $user->id)
        ->select('users.id', 'users.username',
            DB::raw("CASE 
                WHEN profile_images.image_path IS NOT NULL 
                THEN CONCAT('" . url('storage') . "/', profile_images.image_path)
                ELSE NULL
            END as profile_image")
        )
        ->get();


        $posts = $user->posts;

        $user = collect($user)->toArray();


        $user['profile_image'] = $user['profile_image'] ? url('storage/' . $user['profile_image']['image_path']) : null;
    
        return response()->json([
            'user' => $user,
            'posts' => $posts,
            'followers' => $followers,
            'following' => $following
        ]);
    }
}
