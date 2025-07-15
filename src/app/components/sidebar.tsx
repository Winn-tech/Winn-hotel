"use client";

import React from "react"; 
import { Home, Calendar, List, X, Building } from "lucide-react";
import Link from "next/link";
import { useMainContext } from '@/app/components/context'; 

const Sidebar: React.FC = () => {
  const { collapsed, toggleSidebar, setCollapsed } = useMainContext(); 
  const closesidebar = () =>{
    setCollapsed(true);
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-accent-500 text-white flex flex-col overflow-hidden transition-transform duration-300 z-40
          ${collapsed ? '-translate-x-full w-0 h-full p-0 m-0 border-0 shadow-none' : 'translate-x-0 w-80 border-b border-gray-700 shadow-lg'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-lg font-bold whitespace-nowrap overflow-hidden">WinnHotels</h1> 
          <button
            onClick={toggleSidebar} 
            className= {`p-2 rounded hover:bg-gray-700 focus:outline-none ${collapsed ? 'hidden' : 'block'}`}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded"
                onClick={closesidebar}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded"
                onClick={closesidebar}
              >
                <Building size={20} />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                href="/bookings"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded"
                onClick={closesidebar}

              >
                <Calendar size={20} />
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/suites"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded"
                onClick={closesidebar}

              >
                <List size={20} />
                <span>Suites</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
