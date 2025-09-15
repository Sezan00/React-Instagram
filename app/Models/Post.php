<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
      protected $fillable = [
        'user_id',
        'caption',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function photos(){
        return $this->hasMany(Photo::class);
    }
}
