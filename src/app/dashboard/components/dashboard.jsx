import React from "react";
import { FaCity, FaBell, FaThLarge, FaUser } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex items-center w-full bg-white border-t border-gray-200 p-2 mb-10 ml-2 md:mt-0" style={{ minHeight: '48px' }}>
      {/* Sidebar/Logo */}
      <div className="flex items-center gap-1 ml-2">
        <FaCity className="w-7 h-7 text-gray-700 -ml-2" />
        <span className="text-lg font-bold ml-2">Swap<span className="text-green-600">Space</span></span>
      </div>
      <div className="flex-grow" />
      {/* Right Icons */}
      <div className="flex items-center gap-6 mr-4">
        <FaBell className="w-6 h-6 text-black" />
        <FaThLarge className="w-6 h-6 text-black" />
        <FaUser className="w-6 h-6 text-black" />
      </div>
    </div>
  );
};

export default Dashboard;
