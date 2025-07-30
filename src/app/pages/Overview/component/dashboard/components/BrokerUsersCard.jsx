"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Active Users", value: 66 },
  { name: "Non-active Users", value: 34 },
];

const COLORS = ["#6366F1", "#F59E0B"]; // indigo + amber

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight="bold"
      pointerEvents="none"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function UsersBrokerCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center max-w-[350px] w-full border border-gray-200 transition hover:shadow-lg ml-2 md:ml-0">
      <h3 className="font-bold text-sm text-gray-700 mb-2">Users (Broker)</h3>

      <PieChart width={150} height={150}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          label={renderLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontSize: "13px",
            color: "#111827",
          }}
          cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
        />
      </PieChart>

      <div className="flex gap-4 mt-3">
        <LegendDot color="#6366F1" label="Active" />
        <LegendDot color="#F59E0B" label="Inactive" textColor="text-yellow-600" />
      </div>
    </div>
  );
}

function LegendDot({ color, label, textColor = "text-gray-800" }) {
  return (
    <div className="flex items-center gap-1 select-none">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  );
}
