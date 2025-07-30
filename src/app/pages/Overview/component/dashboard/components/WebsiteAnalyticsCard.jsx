import React from "react";
import { Users, Eye, Download, MousePointerClick } from "lucide-react";

export default function WebsiteAnalyticsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition">
      {/* Header */}
      <h3 className="font-semibold text-base text-gray-800 flex items-center gap-2">
        📊 Website Analytics
      </h3>
      <p className="text-xs text-emerald-600 mt-1">
        Conversion rate <span className="font-bold">27.3%</span>
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="bg-emerald-50 rounded-lg p-2 text-center hover:bg-emerald-100 transition">
          <Users size={14} className="mx-auto text-emerald-600" />
          <p className="font-bold text-gray-800">1.1k</p>
          <p className="text-[11px] text-gray-500">Visitors</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-2 text-center hover:bg-blue-100 transition">
          <Eye size={14} className="mx-auto text-blue-600" />
          <p className="font-bold text-gray-800">200</p>
          <p className="text-[11px] text-gray-500">Page Views</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-2 text-center hover:bg-purple-100 transition">
          <Download size={14} className="mx-auto text-purple-600" />
          <p className="font-bold text-gray-800">300</p>
          <p className="text-[11px] text-gray-500">Downloads</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-2 text-center hover:bg-orange-100 transition">
          <MousePointerClick size={14} className="mx-auto text-orange-600" />
          <p className="font-bold text-gray-800">330</p>
          <p className="text-[11px] text-gray-500">Clicks</p>
        </div>
      </div>
    </div>
  );
}
