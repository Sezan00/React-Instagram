<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'full_name',
        'username',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [ 
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function profileImage(){
        return $this->hasOne(ProfileImage::class);
    }

    public function photos(){
        return $this->hasMany(Photo::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function following(){
        return $this->belongsToMany( User::class, 'follows', 'follower_id', 'following_id')->withTimestamps();
    }

    public function followers(){
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id')->withTimestamps();
    }
    
}
