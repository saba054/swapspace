"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Active Users", value: 45 },
  { name: "Non-active Users", value: 55 },
];

const COLORS = ["#3b82f6", "#e5e7eb"]; // blue & light gray

// Custom label inside slices
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.1 ? (
    <text
      x={x}
      y={y}
      fill="#1e3a8a"
      fontSize={12}
      fontWeight="600"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function UsersCustomerCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-lg p-5 flex flex-col items-center max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300">
      <h3 className="font-extrabold text-lg mb-3 text-blue-700">
        Users (Customer)
      </h3>

      <PieChart width={170} height={170}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={65}
          label={renderLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            fontSize: "13px",
            color: "#111827",
          }}
        />
      </PieChart>

      <div className="flex gap-4 mt-3">
        <LegendDot color="#3b82f6" label="Active" />
        <LegendDot color="#d1d5db" label="Non-active" textColor="text-gray-600" />
      </div>
    </div>
  );
}

// Reusable Legend Dot Component
function LegendDot({ color, label, textColor = "text-gray-800" }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      <span className={`text-sm font-medium ${textColor}`}>{label}</span>
    </div>
  );
}
