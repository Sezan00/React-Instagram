import React, { useState } from 'react'
import { updateUser } from '../api/userApi/userApi'
import { useNavigate } from 'react-router-dom';

export const UserEdit = ({user, onClose, onUpdate}) => {
  const [username, setUsername] = useState(user?.username || "");
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await updateUser(user.id, { username, full_name: fullName }, token);
        onUpdate(res.user);

        navigate(`/profile/${res.user.username}`);
        onClose();
    } catch (err) {
        setError(err.message);
    }
};

  return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'> 
            <div className='w-full max-w-5xl shadow-lg rounded-3xl overflow-hidden relative bg-gray-100 max-h-[90vh]'>
             <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl transition-all"
                    >
                    ✕
            </button>

            <div className="bg-white border-b border-gray-300 text-center py-3">
                <h2 className="font-motserrat font-bold text-lg">Edit Profile</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && <p className="text-red-500">{error}</p>}

            <div className='p-6 space-y-4'>
                <div>
                  <label className='block text-sm font-medium'>Username</label>
                  <input 
                  type="text"
                  value={username}
                 
                  onChange={(e)=>{setUsername(e.target.value)}}
                  className='w-full border rounded-lg p-2 mt-2'
                   />
                </div>
            </div>
            <div className='p-6 space-y-4'>
                <div>
                  <label className='block text-sm font-medium'>Full name</label>
                  <input 
                  type="text"
                  value={fullName}
             
                  onChange={(e)=>{setFullName(e.target.value)}}
                  className='w-full border rounded-lg p-2 mt-2'
                   />
                </div>
            </div>
            <div className='flex items-center justify-center'>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              </div>

             </form>
            </div>
        </div>
  )
}
