import React from "react";
import { UserPlus, Users } from "lucide-react";

export default function NewUsersCard() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-transform duration-300 max-w-sm mx-auto">
      {/* Heading */}
      <h3 className="font-extrabold text-xl text-gray-800 mb-5 flex items-center gap-2">
        👥 New Users
      </h3>

      {/* Content Rows */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-white rounded-xl shadow px-4 py-3 hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-full">
              <UserPlus className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="font-semibold text-gray-700">Broker</span>
          </div>
          <span className="text-emerald-600 font-bold text-base">+2</span>
        </div>

        <div className="flex justify-between items-center bg-white rounded-xl shadow px-4 py-3 hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-700">Customer</span>
          </div>
          <span className="text-blue-600 font-bold text-base">+3</span>
        </div>
      </div>

      {/* See More Button */}
      <button className="mt-6 w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 rounded-xl shadow-md hover:brightness-110 transition">
        See more
      </button>
    </div>
  );
}
