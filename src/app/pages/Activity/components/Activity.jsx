"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Download, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const activityData = [
  {
    id: 1,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Tenant",
    company: "Test User",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the Button",
    description: "Viewed the property",
    ip: "23.678954"
  },
  {
    id: 2,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Tenant",
    company: "Test User",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 3,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Agent",
    company: "Apartment Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 4,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Broker",
    company: "Company Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 5,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Agent",
    company: "Apartment Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 6,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Agent",
    company: "Apartment Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 7,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Agent",
    company: "Apartment Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 8,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Agent",
    company: "Apartment Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 9,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Agent",
    company: "Apartment Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  },
  {
    id: 10,
    username: "Arsden Raj",
    email: "arsden124@gmail.com",
    role: "Agent",
    company: "Apartment Name",
    date: "August 24,2023",
    time: "2:30 p.m",
    action: "Clicked the down arrow",
    description: "Wishlisted the property",
    ip: "23.678954"
  }
];

export default function ActivityPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 100;

  // Pagination logic (mocked for now)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = activityData.slice(startIndex, endIndex);

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h2 className="text-2xl font-semibold">Activity</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline">Today</Button>
          <Button variant="outline">This Week</Button>
          <Button variant="outline">This Month</Button>
          <Button variant="outline" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>10/10/2025-10/10/2024</span>
          </Button>
          <Button className="bg-teal-600 text-white hover:bg-teal-700">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Pagination & Filter */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={endIndex >= totalItems}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter By
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 show-scrollbar overflow-y-auto">
        <table className="min-w-[700px] w-full bg-white text-xs sm:text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Username & Email</th>
              <th className="py-2 px-4 text-left">User Role</th>
              <th className="py-2 px-4 text-left">Date & Time</th>
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4">
                  <div className="font-medium text-gray-900">{row.username}</div>
                  <div className="text-xs text-gray-500">{row.email}</div>
                </td>
                <td className="py-2 px-4">
                  <div className="font-medium text-gray-900">{row.role}</div>
                  <div className="text-xs text-gray-500">{row.company}</div>
                </td>
                <td className="py-2 px-4">
                  <div className="font-medium text-gray-900">{row.date}</div>
                  <div className="text-xs text-gray-500">{row.time}</div>
                </td>
                <td className="py-2 px-4">{row.action}</td>
                <td className="py-2 px-4">{row.description}</td>
                <td className="py-2 px-4">{row.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 