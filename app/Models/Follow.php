<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    public function followingUser(){
        return $this->belongsTo(User::class, 'following_id');
    }

    public function followerUser(){
        return $this->belongsTo(User::class, 'follower_id');
    }
}
