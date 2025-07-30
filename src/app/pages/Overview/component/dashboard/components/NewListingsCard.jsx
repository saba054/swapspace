import React from "react";

export default function NewListingsCard() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-3xl shadow-xl p-6 max-w-sm mx-auto">
      <h3 className="font-extrabold text-2xl mb-2 text-purple-700 relative inline-block">
        New listings
        <span className="block h-1 w-16 bg-gradient-to-r from-pink-400 to-purple-600 rounded mt-1"></span>
      </h3>
      <p className="text-sm text-gray-600 font-semibold">Total: <span className="text-purple-700">24</span></p>

      <div className="space-y-2 mt-2">
        {[
          { name: "Erik Apartment", time: "10:15 AM" },
          { name: "Busha Villa", time: "11:30 AM" },
        ].map(({ name, time }, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-2"
          >
            <span className="font-semibold text-purple-800">{name}</span>
            <span className="text-xs bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white px-3 py-1 rounded-full font-medium select-none">
              Listed {time}
            </span>
          </div>
        ))}
      </div>

      <button
        className="mt-2 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-lg hover:brightness-110 transition"
        type="button"
      >
        View all
      </button>
    </div>
  );
}
