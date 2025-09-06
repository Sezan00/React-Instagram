// components/Profile.jsx
import React from 'react'
import { Boxes, Bookmark, Contact  } from "lucide-react";

export default function Profile() {
  return (
      <>
            <div className="ml-120 mt-14 flex-col justify-center">
              <div className="flex">

             
              <div className="flex"> 
                  <img src="/images/profile photo.jpg" className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow" alt="" />
              </div>
                

              <div className="ml-24 mt-4">

                <div className="flex items-center gap-5">
                  <p className="font-semibold text-lg">Sezan.__</p>
                  <button className="bg-gray-200 px-4 py-1 rounded text-sm font-medium">
                    Edit profile
                  </button>
                  <button className="bg-gray-200 px-4 py-1 rounded text-sm font-medium">
                    View archive
                  </button>
                </div>

                <div className="flex items-center gap-5 mt-4">
                  <p>6 posts</p>
                  <p>40 followers</p>
                  <p>0 following</p>
                </div>

                <div className="flex items-center gap-5 mt-5">
                  <p className="font-semibold">Al Sharia Sezan</p>
                  </div>
                  <div className="flex">
                    <button className="bg-gray-200 px-1 py-1 text-sm rounded-2xl">Sezan.__</button>
                  </div>
              </div>
               </div>
              {/* story highlight section  */}
            <div className="flex gap-15 mt-10"> 
            <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
            <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
            <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
            <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
            <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
            <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
            </div>

              <div className="flex gap-50 mt-20">
                    <button className='px-2 py-2 hover:bg-gray-100'>
                       <Boxes size={32} strokeWidth={2} />
                    </button>
                   <button className='px-2 py-2 hover:bg-gray-100'>
                        <Bookmark  size={32} strokeWidth={2} />
                   </button>
  
                    <button className='px-2 py-2 hover:bg-gray-100'>
                        <Contact  size={32} strokeWidth={2} />
                    </button>
              
              </div>

           <div className="flex items-center my-6 ">
              <div className=" flex-grow border-t border-gray-300"></div>
            
            </div>
              {/* image card  */}
            <div className="grid grid-cols-3 ">
                <div className="w-40 h-40 border border-gray-300">
                  <img
                    src="https://via.placeholder.com/300"
                    alt="img1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-40 h-40 border border-gray-300">
                  <img
                    src="https://via.placeholder.com/301"
                    alt="img2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-40 h-40 border border-gray-300">
                  <img
                    src="https://via.placeholder.com/302"
                    alt="img3"
                    className="w-full h-full object-cover"
                  />
                </div>
          </div>
            

            </div>

            
              
           
        </>
  );
}
