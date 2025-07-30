"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const allReports = [
  {
    id: 1,
    name: "Maheen Tanvir",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    report: "No full property description",
    description: "Property details are incomplete...",
    time: "12:00pm",
    status: "new",
  },
  {
    id: 2,
    name: "Mehwash Jab",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    report: "Already occupied",
    description: "Property details are incomplete...",
    time: "12:01pm",
    status: "new",
  },
  {
    id: 3,
    name: "Sana Amir",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    report: "Location is not exact",
    description: "Property details are incomplete...",
    time: "12:02pm",
    status: "new",
  },
  {
    id: 4,
    name: "Lucia Santana",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    report: "Image didn't match",
    description: "Property details are incomplete...",
    time: "12:03pm",
    status: "new",
  },
  {
    id: 5,
    name: "Rahul Binta",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    report: "Broker is a scam",
    description: "Property details are incomplete...",
    time: "12:04pm",
    status: "new",
  },
  {
    id: 6,
    name: "King Andrew",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    report: "Wrong number for home",
    description: "Property details are incomplete...",
    time: "12:05pm",
    status: "new",
  },
  {
    id: 7,
    name: "Mubeen Ashi",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    report: "Unwanted price",
    description: "Property details are incomplete...",
    time: "12:06pm",
    status: "new",
  },
  {
    id: 8,
    name: "Mehwash Jab",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    report: "Already occupied",
    description: "Property details are incomplete...",
    time: "12:07pm",
    status: "new",
  },
  {
    id: 9,
    name: "Mehwash Jab",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    report: "Location is not exact",
    description: "Property details are incomplete...",
    time: "12:08pm",
    status: "new",
  },
];

export default function ReportsPage() {
  const [tab, setTab] = useState("new");

  const filteredReports = allReports.filter((r) => r.status === tab);

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold">Reports</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline">Today</Button>
          <Button variant="outline">This Week</Button>
          <Button variant="outline">This Month</Button>
          <Button variant="outline" className="flex items-center space-x-1">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">10/10/2025 - 10/10/2024</span>
            <span className="sm:hidden">Date</span>
          </Button>
          <Button className="bg-teal-600 text-white hover:bg-teal-700">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden">DL</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="new" onValueChange={setTab} value={tab}>
        <TabsList className="border-b border-gray-200 bg-transparent">
          <TabsTrigger value="new" className="data-[state=active]:border-b-2 border-teal-600">
            New
          </TabsTrigger>
          <TabsTrigger value="responded" className="data-[state=active]:border-b-2 border-teal-600">
            Responded
          </TabsTrigger>
          <TabsTrigger value="not-responded" className="data-[state=active]:border-b-2 border-teal-600">
            Not Responded
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table Header & Rows */}
      <div className="overflow-x-auto rounded-lg show-scrollbar overflow-y-auto">
        <div className="min-w-[600px] grid grid-cols-1 md:grid-cols-12 bg-teal-600 text-white font-semibold py-2 px-4 rounded-md text-xs sm:text-sm">
          <div className="col-span-4 md:col-span-4">Reporter Name</div>
          <div className="col-span-3 md:col-span-3">Report</div>
          <div className="col-span-3 md:col-span-3">Description</div>
          <div className="col-span-2 md:col-span-2 text-right">Time</div>
        </div>
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow min-w-[600px]">
              <CardContent className="grid grid-cols-1 md:grid-cols-12 items-center py-4 px-4 text-xs sm:text-sm">
                <div className="col-span-4 md:col-span-4 flex items-center space-x-3">
                  <Avatar>
                    {report.avatar ? (
                      <AvatarImage src={report.avatar} alt={report.name} />
                    ) : (
                      <AvatarFallback>{report.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="font-medium">{report.name}</span>
                </div>
                <div className="col-span-3 md:col-span-3">{report.report}</div>
                <div className="col-span-3 md:col-span-3 text-gray-600 text-xs sm:text-sm">{report.description}</div>
                <div className="col-span-2 md:col-span-2 text-right text-xs sm:text-sm text-gray-500">{report.time}</div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">No reports found for this tab.</div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">1–10 of 100</span>
        <Button variant="outline" size="sm" className="flex items-center">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

