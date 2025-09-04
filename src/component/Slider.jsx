import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu, Boxes } from "lucide-react";

export default function Sidebar() {
  return (
    <>
        <div className="w-64 h-screen border-r border-gray-300 flex flex-col p-5">
            <h1 className="font-dancing-script text-3xl font-bold mb-4">Instagram</h1>
            <div className="flex flex-col justify-between flex-1">
                <nav className="flex flex-col gap-3 hover:text-gray-700"> 
              <button className="flex items-center gap-3 hover:text-gray-700 mt-7 font-roboto">
                  <Home size={22} /> Home
              </button>
              <button className="flex items-center gap-3 hover:text-gray-700 font-roboto mt-5">
                <Search size={22}/> Search
              </button>
              <button className="flex gap-3 hover:text-gray-700 font-roboto mt-5">
                <Compass size={22}/> Explore
              </button>
              <button className="flex items-center gap-3 hover:text-gray-700 font-roboto mt-5">
                <Film/> Reels
              </button>
              <button className="flex items-center gap-3 hover:text-gray-700  font-roboto mt-5">
                <MessageCircle/> Message
              </button>
              <button className="flex items-center gap-3 hover:text-gray-700  font-roboto mt-5">
                <Heart/> Notifactions
              </button>
              <button className="flex items-center gap-3 hover:text-gray-700  font-roboto mt-5">
                <PlusSquare/> Create
              </button>
              <button className="flex items-center gap-3 hover:text-gray-700  font-roboto mt-5 font-bold">
                <User/> Profile
              </button>
            </nav>

              <div className="flex flex-col gap-3 mt-5">
                  <button className="flex items-center gap-3 hover:text-gray-700 font-roboto mt-5">
                      <Menu/> More
                  </button>
                  <button className="flex items-center gap-3 hover:text-gray-700 font-roboto">
                      <Boxes/> More
                  </button>
              </div>
            </div>
            
            
        </div>
    </>
  );
}
