import React from "react";
import { Smartphone, Monitor } from "lucide-react"; // lightweight icons

export default function ConversionRateCard() {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg p-4 hover:shadow-xl transition w-full h-[160px]">
      <h3 className="font-semibold text-sm mb-3 tracking-wide uppercase">
        Conversion Rate by Device
      </h3>

      <div className="flex justify-between">
        {/* Mobile Section */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 text-xs">
            <Smartphone size={16} />
            <span>Mobile</span>
          </div>
          <p className="font-bold text-lg">22.1%</p>
          <p className="text-xs opacity-80">600 visitors</p>
        </div>

        {/* Desktop Section */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 text-xs">
            <Monitor size={16} />
            <span>Desktop</span>
          </div>
          <p className="font-bold text-lg">5%</p>
          <p className="text-xs opacity-80">400 visitors</p>
        </div>
      </div>
    </div>
  );
}
