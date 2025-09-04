<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Import

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // Use traits একবারেই

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

    protected $casts = [ // Property হিসেবে
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
