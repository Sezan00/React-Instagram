import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu, Boxes, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/login/loginSlice";
import { useState } from "react";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
    }

  return (
    <>
        <div className="w-64 h-screen border-r border-gray-300 flex flex-col p-5">
            <h1 className="font-dancing-script text-3xl font-bold mb-4">Instagram</h1>
            <div className="flex flex-col justify-between flex-1 ">
                <nav className="flex flex-col gap-2 hover:text-gray-700">
              <button className="flex items-center gap-3 font-roboto mt-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                  <Home size={22} /> Home
              </button>
              <button className="flex items-center gap-3 font-roboto mt-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                <Search size={22}/> Search
              </button>
              <button className="flex items-center gap-3 font-roboto mt-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                <Compass size={22}/> Explore
              </button>
              <button className="flex items-center gap-3 font-roboto mt-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                <Film/> Reels
              </button>
              <button className="flex items-center gap-3 font-roboto mt-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                <MessageCircle/> Message
              </button>
              <button className="flex items-center gap-3 font-roboto mt-5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                <Heart/> Notifactions
              </button>
              <button onClick={()=>setOpen(true)} className="flex items-center gap-3 font-roboto mt-5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                <PlusSquare/> Create
              </button>
              {open && <CreatePost onClose={()=>setOpen(false)}/>}
              <button className="flex items-center gap-3 font-roboto mt-5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                <User/> Profile
              </button>
            </nav>

              <div className="flex flex-col gap-3 mt-5">
                  <button className="flex items-center gap-3 font-roboto mt-5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                      <Menu/> More
                  </button>
                  <button className="flex items-center gap-3 font-roboto mt-5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                      <Boxes/> More
                  </button>
                  <button onClick={handleLogout} className="flex items-center gap-3 font-roboto mt-5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition">
                      <Trash/> Logout
                  </button>
              </div>
            </div>
            
            
        </div>
    </>
  );
}
