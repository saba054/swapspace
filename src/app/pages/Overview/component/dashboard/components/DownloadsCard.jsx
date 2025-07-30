import React from "react";
import { User, Briefcase } from "lucide-react"; // nice lightweight icons

export default function DownloadsCard() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-4 hover:shadow-xl transition w-full h-[160px]">
      <h3 className="font-semibold text-sm mb-3 tracking-wide uppercase">
        Application Downloads
      </h3>

      <div className="flex justify-around items-center">
        {/* Broker */}
        <div className="flex flex-col items-center">
          <Briefcase size={20} className="mb-1 opacity-90" />
          <p className="font-bold text-lg">25</p>
          <p className="text-xs opacity-80">Broker</p>
        </div>

        {/* Customer */}
        <div className="flex flex-col items-center">
          <User size={20} className="mb-1 opacity-90" />
          <p className="font-bold text-lg">30</p>
          <p className="text-xs opacity-80">Customer</p>
        </div>
      </div>
    </div>
  );
}
