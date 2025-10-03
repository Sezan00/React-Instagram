import { Link } from "react-router-dom";

import { toggleFollow } from "../api/userFollowApi/userFollow";
import { useState } from "react";

export default function FollowersModal({ open, onClose, users, title }) {
  if (!open) return null;

  const [localUsers, setLocalUsers] = useState(users);

  const handleRemove = async (userId) =>{
    try{
        await toggleFollow(userId);
         setLocalUsers(localUsers.filter(u => u.id !== userId));
    } catch(err){
        console.log('failed to remove', err);
    }
  };



  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-96 max-h-[500px] rounded-lg shadow-lg overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">X</button>
        </div>

        {/* Body */}
        <div className="p-4">
          {users.length > 0 ? (
            users.map((u) => (
              <div key={u.id} className="flex items-center justify-between mb-3">
                {/* Left side: image + username */}
                <div className="flex items-center gap-3">
                  <img
                    src={u.profile_image || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                    alt={u.username}
                    className="w-10 h-10 rounded-full border"
                  />
                  <p className="text-sm font-semibold">
                    <Link to={`/profile/${u.username}`} className="hover:underline" onClick={onClose}>
                      {u.username}
                    </Link>
                  </p>
                </div>

                {/* Right side: Remove button */}
                <button onClick={()=> handleRemove(u.id)} className="bg-red-500 px-3 py-1 rounded text-white">
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No {title.toLowerCase()} yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
