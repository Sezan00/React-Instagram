<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class ChatController extends Controller
{
public function chatList()
{
    $authId = Auth::id();

    $chatUserIds = Message::where('sender_id', $authId)
        ->orWhere('receiver_id', $authId)
        ->get()
        ->map(function ($msg) use ($authId) {
            return $msg->sender_id == $authId ? $msg->receiver_id : $msg->sender_id; //conditon for get reciver info 
        })
        ->unique()
        ->values();

     // profile image  
    $users = User::whereIn('id', $chatUserIds)
        ->with('profileImage')
        ->get();

  $users = $users->map(function ($user) use ($authId) {
    $user->profile_photo_url = $user->profileImage && $user->profileImage->image_path
        ? asset('storage/' . $user->profileImage->image_path)
        : asset('images/default.webp');

    // last message where jar msg last e ache tar ta show hbe ejnno 2 ta logic lekha 
    $lastMsg = Message::where(function($q) use ($authId, $user) {          //if i am sender 
        $q->where('sender_id', $authId)->where('receiver_id', $user->id); 
    })->orWhere(function($q) use ($authId, $user) {                        //if receiver is sender
        $q->where('sender_id', $user->id)->where('receiver_id', $authId);
    })->latest()->first();

    if ($lastMsg) {
        $user->last_message = $lastMsg->message; //table colum message
        $user->last_message_sender = $lastMsg->sender_id == $authId ? 'You' : $lastMsg->sender->username;
    } else {
        $user->last_message = null;
        $user->last_message_sender = null;
    }

    unset($user->profileImage);
    return $user;
});


    return response()->json($users);
}


 public function fetchMessage($userId)
{
    $authId = Auth::id();

    if ($authId == $userId) {
        return response()->json(['error' => 'You cannot message yourself'], 401);
    }

    $messages = Message::where(function ($q) use ($authId, $userId) {
            $q->where('sender_id', $authId)->where('receiver_id', $userId);
        })
        ->orWhere(function ($q) use ($authId, $userId) {
            $q->where('sender_id', $userId)->where('receiver_id', $authId);
        })
        ->orderBy('created_at', 'asc')
        ->with(['sender.profileImage', 'receiver.profileImage'])
        ->get();

    $messages = $messages->map(function ($msg) {
        return [
            'id' => $msg->id,
            'sender_id' => $msg->sender_id,
            'receiver_id' => $msg->receiver_id,
            'message' => $msg->message,
            'created_at' => $msg->created_at,
            'sender_photo' => $msg->sender->profileImage 
                ? url('storage/' . $msg->sender->profileImage->image_path) 
                : asset('images/default.webp'),
            'receiver_photo' => $msg->receiver->profileImage 
                ? url('storage/' . $msg->receiver->profileImage->image_path) 
                : asset('images/default.webp'),
        ];
    });

    return response()->json($messages);
}




   public function sendMessage(Request $request)
{
    $request->validate([
        'receiver_id' => 'required|exists:users,id',
        'message' => 'required|string'
    ]);

    $authId = Auth::id();

    if ($authId == $request->receiver_id) {
        return response()->json(['error' => 'You cannot send message to yourself'], 401);
    }

    // Message create
    $message = Message::create([
        'sender_id' => $authId,
        'receiver_id' => $request->receiver_id,
        'message' => $request->message,
    ]);

     $message->load(['sender.profileImage', 'receiver.profileImage']);

    // Profile image attach
    $message->sender_photo = $message->sender->profileImage
        ? Storage::url('profile_image/' . $message->sender->profileImage->image)
        : asset('images/default.webp');

    $message->receiver_photo = $message->receiver->profileImage
        ? Storage::url('profile_image/' . $message->receiver->profileImage->image)
        : asset('images/default.webp');

    return response()->json($message);
}


}
