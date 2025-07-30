import React from "react";
import { UserPlus, Home, List, Mail, Tag, Users } from "lucide-react";

export default function ConversionPathwayCard() {
  const data = [
    { label: "Leads", value: 300, color: "bg-emerald-50", icon: <UserPlus size={14} className="text-emerald-600 mx-auto" /> },
    { label: "Rented", value: 120, color: "bg-blue-50", icon: <Home size={14} className="text-blue-600 mx-auto" /> },
    { label: "Total Listings", value: 80, color: "bg-purple-50", icon: <List size={14} className="text-purple-600 mx-auto" /> },
    { label: "Requests", value: 60, color: "bg-orange-50", icon: <Mail size={14} className="text-orange-600 mx-auto" /> },
    { label: "Offers", value: 40, color: "bg-pink-50", icon: <Tag size={14} className="text-pink-600 mx-auto" /> },
    { label: "Clients", value: 200, color: "bg-yellow-50", icon: <Users size={14} className="text-yellow-600 mx-auto" /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition">
      <h3 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
        🔄 Sale Conversion Pathway
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {data.map((item, i) => (
          <div
            key={i}
            className={`${item.color} rounded-lg p-2 text-center transform-gpu transition hover:scale-105 hover:z-10 shadow-sm`}
          >
            {item.icon}
            <p className="font-bold text-gray-800 text-sm mt-1">{item.value}</p>
            <p className="text-[10px] text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
