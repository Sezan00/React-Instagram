import React, { useState, useEffect } from "react";
import Sidebar from "../component/Slider";

export default function Message() {



  return (
    <div className="flex min-h-screen bg-gray-100">
  <Sidebar />

  <div className="flex-1 bg-white rounded-none shadow-inner divide-y overflow-y-auto">

    <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 cursor-pointer border-b">
      <img
        src="https://i.pravatar.cc/40?img=5"
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        
      </div>
      <div className="flex-1 min-w-0 mt-2">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm truncate">Rahim Khan</p>
          <span className="text-xs text-gray-400">10:35 AM</span>
        </div>
        <p className="text-xs text-gray-500 truncate">
          Ami ajke ready.. kemon aso?
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 cursor-pointer border-b ">
      <img
        src="https://i.pravatar.cc/40?img=12"
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm truncate">Sumi Akter</p>
          <span className="text-xs text-gray-400">Yesterday</span>
        </div>
        <p className="text-xs text-gray-500 truncate">
          Kal meeting ta confirm?
        </p>
      </div>
    </div>

    {/* Chat 3 */}
    <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 cursor-pointer border-b">
      <img
        src="https://i.pravatar.cc/40?img=8"
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm truncate">Mita</p>
          <span className="text-xs text-gray-400">Mon</span>
        </div>
        <p className="text-xs text-gray-500 truncate">Bikel e coffee?</p>
      </div>
    </div>
  </div>
</div>

  );
}
