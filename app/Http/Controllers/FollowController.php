<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class FollowController extends Controller
{
    public function toggle($id){
    $followerId = Auth::id();
    $followingId = $id;

    if($followerId == $followingId){
        return response()->json([
            'message' => 'cannot follow yourself'
        ], 400);
    }

    $targetUser = User::findOrFail($followingId); 
    $authUser   = Auth::user(); 

    $already = DB::table('follows')
        ->where('follower_id', $followerId)
        ->where('following_id', $followingId)
        ->exists();

    if($already){
        DB::table('follows')
            ->where('follower_id', $followerId)
            ->where('following_id', $followingId)
            ->delete();

        $isFollowing = false;
    } else {
        DB::table('follows')->insert([
            'follower_id' => $followerId,
            'following_id' => $followingId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $isFollowing = true;
    }

    return response()->json([
        'message'          => $isFollowing ? 'Followed' : 'Unfollowed',
        'is_following'     => $isFollowing,
        'followers_count'  => $targetUser->followers()->count(), 
        'followings_count' => $authUser->following()->count(),  
    ]);
}


    public function followers($id){
        $user = User::with('follwers')->findOrFail($id);
        return response()->json($user->followers);
    }

    public function followings($id){
        $user = User::with('following')->findOrFail($id);
        return response()->json($user->followings);
    }


    public function show($id){
        $user = User::withCount(['followers', 'followings'])->findOrFail($id);

          return response()->json([
            'user' => $user,
            'followers_count' => $user->followers_count,
            'followings_count' => $user->followings_count,
        ]);
    }

}
