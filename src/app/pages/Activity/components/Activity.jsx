"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Download, ChevronLeft, ChevronRight, Filter, User, Mail, Building, Clock, Activity, Info, Globe } from "lucide-react";

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
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Activity</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Today</span>
              <span className="sm:hidden">Today</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">This Week</span>
              <span className="sm:hidden">Week</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">This Month</span>
              <span className="sm:hidden">Month</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center text-xs sm:text-sm">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden lg:inline">10/10/2025-10/10/2024</span>
              <span className="hidden sm:inline lg:hidden">Date Range</span>
              <span className="sm:hidden">Date</span>
            </Button>
                         <Button className="bg-teal-600 text-white hover:bg-teal-700" size="sm">
               <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
               <span className="hidden sm:inline">Download</span>
               <span className="sm:hidden">Export</span>
             </Button>
          </div>
        </div>
      </div>

      {/* Pagination & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600">
            {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={endIndex >= totalItems}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
        <Button variant="outline" size="sm" className="flex items-center w-full sm:w-auto">
          <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Filter By</span>
          <span className="sm:hidden">Filter</span>
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Username & Email</th>
              <th className="py-3 px-4 text-left font-medium">User Role</th>
              <th className="py-3 px-4 text-left font-medium">Date & Time</th>
              <th className="py-3 px-4 text-left font-medium">Action</th>
              <th className="py-3 px-4 text-left font-medium">Description</th>
              <th className="py-3 px-4 text-left font-medium">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{row.username}</div>
                  <div className="text-xs text-gray-500">{row.email}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{row.role}</div>
                  <div className="text-xs text-gray-500">{row.company}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{row.date}</div>
                  <div className="text-xs text-gray-500">{row.time}</div>
                </td>
                <td className="py-3 px-4">{row.action}</td>
                <td className="py-3 px-4">{row.description}</td>
                <td className="py-3 px-4">{row.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet Table */}
      <div className="hidden md:block lg:hidden overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-[600px] w-full bg-white text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-2 px-3 text-left font-medium">User Info</th>
              <th className="py-2 px-3 text-left font-medium">Role & Company</th>
              <th className="py-2 px-3 text-left font-medium">Date & Time</th>
              <th className="py-2 px-3 text-left font-medium">Action & Description</th>
              <th className="py-2 px-3 text-left font-medium">IP</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-3">
                  <div className="font-medium text-gray-900">{row.username}</div>
                  <div className="text-xs text-gray-500">{row.email}</div>
                </td>
                <td className="py-2 px-3">
                  <div className="font-medium text-gray-900">{row.role}</div>
                  <div className="text-xs text-gray-500">{row.company}</div>
                </td>
                <td className="py-2 px-3">
                  <div className="font-medium text-gray-900">{row.date}</div>
                  <div className="text-xs text-gray-500">{row.time}</div>
                </td>
                <td className="py-2 px-3">
                  <div className="font-medium text-gray-900">{row.action}</div>
                  <div className="text-xs text-gray-500">{row.description}</div>
                </td>
                <td className="py-2 px-3">{row.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {currentData.map((row, idx) => (
          <Card key={row.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-teal-600" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{row.username}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Mail className="h-3 w-3" />
                        {row.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{row.date}</div>
                    <div className="text-xs text-gray-500">{row.time}</div>
                  </div>
                </div>

                {/* Role & Company */}
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{row.role}</div>
                    <div className="text-xs text-gray-500">{row.company}</div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  <div className="text-sm text-gray-900">{row.action}</div>
                </div>

                {/* Description */}
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-purple-600 mt-0.5" />
                  <div className="text-sm text-gray-700">{row.description}</div>
                </div>

                {/* IP Address */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <div className="text-xs text-gray-500">IP: {row.ip}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Pagination */}
      <div className="md:hidden flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-600 px-3">
          Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={endIndex >= totalItems}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 