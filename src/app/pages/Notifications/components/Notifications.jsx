"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Download, ChevronLeft, ChevronRight, RefreshCw, Bell } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Lease expiration",
    description: "This property lease is going to expire in some month time",
    time: "13:27 PM",
    isUnread: true,
    type: "lease"
  },
  {
    id: 2,
    title: "Report",
    description: "Aslam raj just reported an issue",
    time: "13:27 PM",
    isUnread: true,
    type: "report"
  },
  {
    id: 3,
    title: "New user",
    description: "This property lease is going to expire in some month time",
    time: "13:17 PM",
    isUnread: true,
    type: "user"
  },
  {
    id: 4,
    title: "Upload request",
    description: "Roselyn tynent uploaded a property",
    time: "13:05 PM",
    isUnread: false,
    type: "upload"
  },
  {
    id: 5,
    title: "Property request",
    description: "Roselyn tyrant just joined the agent app",
    time: "12:45 PM",
    isUnread: false,
    type: "property"
  },
  {
    id: 6,
    title: "Property upload",
    description: "Roselyn tyrant just joined the agent app",
    time: "12:40 PM",
    isUnread: false,
    type: "upload"
  },
  {
    id: 7,
    title: "Upload request",
    description: "Roselyn tyront just joined the agent app",
    time: "12:39 PM",
    isUnread: false,
    type: "upload"
  },
  {
    id: 8,
    title: "Lease expiration",
    description: "This property lease is going to expire in some month time",
    time: "12:27 PM",
    isUnread: false,
    type: "lease"
  },
  {
    id: 9,
    title: "New listing",
    description: "Roselyn tyront just joined the agent app",
    time: "12:20 PM",
    isUnread: false,
    type: "listing"
  }
];

export default function NotificationsPage() {
  const [tab, setTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("today");
  const itemsPerPage = 5;

  // Filter notifications based on tab
  const filteredNotifications = notifications.filter(notification => {
    if (tab === "unread") return notification.isUnread;
    if (tab === "read") return !notification.isUnread;
    return true; // "all" tab
  });

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  const handleSendNotification = () => {
    alert("Send Notification functionality - Add your notification sending logic here");
  };

  const handleRefresh = () => {
    alert("Refresh functionality - Add your refresh logic here");
  };

  const handleDownload = () => {
    alert("Download functionality - Add your download logic here");
  };

  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Notifications</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant={dateFilter === "today" ? "default" : "outline"}
            className={dateFilter === "today" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
            onClick={() => handleDateFilter("today")}
          >
            Today
          </Button>
          <Button 
            variant={dateFilter === "week" ? "default" : "outline"}
            className={dateFilter === "week" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
            onClick={() => handleDateFilter("week")}
          >
            This Week
          </Button>
          <Button 
            variant={dateFilter === "month" ? "default" : "outline"}
            className={dateFilter === "month" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
            onClick={() => handleDateFilter("month")}
          >
            This Month
          </Button>
          <Button variant="outline" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">10/10/2025-10/10/2024</span>
            <span className="sm:hidden">Date</span>
          </Button>
          <Button 
            className="bg-teal-600 text-white hover:bg-teal-700"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={tab} onValueChange={(value) => {
        setTab(value);
        setCurrentPage(1); // Reset to first page when tab changes
      }} defaultValue="all">
        <TabsList className="border-b border-gray-200 bg-transparent">
          <TabsTrigger value="all" className="data-[state=active]:border-b-2 border-teal-600">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:border-b-2 border-teal-600">
            Unread
          </TabsTrigger>
          <TabsTrigger value="read" className="data-[state=active]:border-b-2 border-teal-600">
            Read
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Action Buttons & Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            className="bg-teal-600 text-white hover:bg-teal-700"
            onClick={handleSendNotification}
          >
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Send Notification</span>
            <span className="sm:hidden">Send</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600">
            {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} of {filteredNotifications.length}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3 show-scrollbar overflow-y-auto">
        {currentNotifications.map((notification) => (
          <Card key={notification.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 px-4 text-xs sm:text-sm">
              {notification.isUnread && (
                <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-xs sm:text-sm ${notification.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                  {notification.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  {notification.description}
                </p>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm flex-shrink-0">
                {notification.time}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentNotifications.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No notifications found for this filter.
        </div>
      )}
    </div>
  );
}