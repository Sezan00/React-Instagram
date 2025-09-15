<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;
use App\Models\Post;
  
class PhotoController extends Controller
{
    public function index(Request $request){
        $posts = Post::with('photos')->latest()->get();
        return response()->json($posts);

    }

    public function store(Request $request){
        // Validation
     $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2049',
            'caption'  => 'nullable|string',
        ]);

        //  Create the Post
        $post = Post::create([
            'user_id' => $request->user()->id,
            'caption' => $request->caption,
        ]);

        //  Loop through each image and save in photos table
        foreach ($request->file('images') as $image) {
            $base64 = base64_encode(file_get_contents($image->getRealPath()));
            $post->photos()->create([
                'image' => $base64,
            ]);
        }

        //  Return post with photos
        return response()->json($post->load('photos'), 201);
}

}