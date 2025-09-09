<?php

namespace App\Http\Controllers;

use App\Models\ProfileImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class ProfileImageController extends Controller
{

    public function index() {
    $user = Auth::user();
    $image = $user->profileImage; // hasOne relation
    return response()->json([
        'image_url' => $image ? url(Storage::url($image->image_path)) : null
    ]);
}


   public function store(Request $request)
{
     
    $request->validate([
        'image'   => 'required|image|mimes:jpg,jpeg,png|max:2048',
        'caption' => 'nullable|string|max:255',
    ]);

    $user = Auth::user();

   
    if ($user->ProfileImage) {
        Storage::disk('public')->delete($user->profileImage->image_path);
        $user->profileImage->delete(); 
    }

    // Store new image
    $path = $request->file('image')->store('profile_images', 'public');

    $profileImage = ProfileImage::create([
        'user_id'    => $user->id,
        'image_path' => $path,
        'caption'    => $request->caption,
    ]);

    return response()->json([
        'id'        => $profileImage->id,
        'image_url' => url(Storage::url($profileImage->image_path)),
        'caption'   => $profileImage->caption,
    ], 201);
}

    
}
