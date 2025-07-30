import React from "react";
import { Globe2, MapPin } from "lucide-react";

export default function VisitorsLocationCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg px-6 hover:shadow-2xl transition-shadow duration-400 max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 mt-2">
        <h3 className="font-extrabold text-l text-gray-900 flex items-center gap-3">
          <span className="bg-gradient-to-tr from-purple-500 via-teal-400 to-cyan-400 p-2 rounded-full text-white shadow-md">
            <Globe2 className="w-6 h-4" />
          </span>
          Website Visitors by Location
        </h3>
        <span className="text-sm font-semibold text-teal-600 bg-teal-100 px-3 py-1 rounded-full shadow-inner select-none">
          1,100 Total
        </span>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-2xl h-22 flex flex-col items-center justify-center border-2 border-dashed border-purple-300">
        <MapPin className="w-10 h-8 text-purple-600 animate-bounce" />
        <span className="text-purple-500 text-sm font-medium tracking-wide mx-4">
          Interactive Map Coming Soon
        </span>
      </div>

      {/* Top Locations */}
      <div className="mt-2">
        <div className="flex justify-between items-center text-sm bg-gradient-to-r from-purple-50 to-cyan-50 px-4 py-3 rounded-xl hover:from-purple-100 hover:to-cyan-100 transition-colors cursor-pointer shadow-sm">
          <span className="font-semibold text-purple-700">United States</span>
          <span className="text-teal-600 font-bold bg-teal-100 px-3 py-1 rounded-full shadow-sm select-none">
            +450
          </span>
        </div>
        {/* You can add more locations similarly */}
      </div>

      {/* Action */}
      <div className="mb-4 pb-6" >
      <button
        className="mt-2 w-full py-2 font-semibold text-white rounded-2xl 
                   bg-gradient-to-r from-purple-600 via-teal-500 to-cyan-500 
                   shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
      >
        View Full Report
      </button>
      </div>
    </div>
  );
}
