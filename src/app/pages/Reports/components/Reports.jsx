"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download, ChevronRight, ChevronLeft, User, AlertTriangle, Clock, MessageSquare, Eye, CheckCircle, XCircle } from "lucide-react";
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
    status: "responded",
  },
  {
    id: 4,
    name: "Lucia Santana",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    report: "Image didn't match",
    description: "Property details are incomplete...",
    time: "12:03pm",
    status: "not-responded",
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
    status: "responded",
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
    status: "not-responded",
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
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("all");
  const [reports, setReports] = useState(allReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const itemsPerPage = 10;
  const totalItems = 100;

  const filteredReports = reports.filter((r) => r.status === tab);

  // Date filter functions
  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    // In a real app, you would filter reports based on date
    console.log(`Filtering by: ${filter}`);
  };

  // Download function
  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Report,Description,Time,Status\n"
      + filteredReports.map(report => 
          `${report.name},${report.report},${report.description},${report.time},${report.status}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reports_${tab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View details function
  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setShowDetailsModal(true);
  };

  // Respond to report function
  const handleRespond = (report) => {
    setSelectedReport(report);
    setShowRespondModal(true);
  };

  // Submit response function
  const handleSubmitResponse = () => {
    if (!responseMessage.trim()) {
      alert("Please enter a response message");
      return;
    }

    setReports(prevReports => 
      prevReports.map(report => 
        report.id === selectedReport.id 
          ? { ...report, status: "responded" }
          : report
      )
    );

    setResponseMessage("");
    setShowRespondModal(false);
    setSelectedReport(null);
    alert("Response submitted successfully!");
  };

  // Mark as resolved function
  const handleMarkResolved = (reportId) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, status: "responded" }
          : report
      )
    );
    alert("Report marked as resolved!");
  };

  // Mark as not resolved function
  const handleMarkNotResolved = (reportId) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, status: "not-responded" }
          : report
      )
    );
    alert("Report marked as not resolved!");
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Reports</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={dateFilter === "today" ? "default" : "outline"} 
              size="sm" 
              className="text-xs sm:text-sm"
              onClick={() => handleDateFilter("today")}
            >
              <span className="hidden sm:inline">Today</span>
              <span className="sm:hidden">Today</span>
            </Button>
            <Button 
              variant={dateFilter === "week" ? "default" : "outline"} 
              size="sm" 
              className="text-xs sm:text-sm"
              onClick={() => handleDateFilter("week")}
            >
              <span className="hidden sm:inline">This Week</span>
              <span className="sm:hidden">Week</span>
            </Button>
            <Button 
              variant={dateFilter === "month" ? "default" : "outline"} 
              size="sm" 
              className="text-xs sm:text-sm"
              onClick={() => handleDateFilter("month")}
            >
              <span className="hidden sm:inline">This Month</span>
              <span className="sm:hidden">Month</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center text-xs sm:text-sm">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden lg:inline">10/10/2025 - 10/10/2024</span>
              <span className="hidden sm:inline lg:hidden">Date Range</span>
              <span className="sm:hidden">Date</span>
            </Button>
            <Button 
              className="bg-teal-600 text-white hover:bg-teal-700" 
              size="sm"
              onClick={handleDownload}
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="new" onValueChange={setTab} value={tab}>
        <TabsList className="border-b border-gray-200 bg-transparent w-full overflow-x-auto">
          <TabsTrigger value="new" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            New ({reports.filter(r => r.status === "new").length})
          </TabsTrigger>
          <TabsTrigger value="responded" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            Responded ({reports.filter(r => r.status === "responded").length})
          </TabsTrigger>
          <TabsTrigger value="not-responded" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            Not Responded ({reports.filter(r => r.status === "not-responded").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Reporter Name</th>
              <th className="py-3 px-4 text-left font-medium">Report</th>
              <th className="py-3 px-4 text-left font-medium">Description</th>
              <th className="py-3 px-4 text-right font-medium">Time</th>
              <th className="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, idx) => (
              <tr key={report.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      {report.avatar ? (
                        <AvatarImage src={report.avatar} alt={report.name} />
                      ) : (
                        <AvatarFallback>{report.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium">{report.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{report.report}</td>
                <td className="py-3 px-4 text-gray-600">{report.description}</td>
                <td className="py-3 px-4 text-right text-gray-500">{report.time}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(report)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRespond(report)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Respond
                    </Button>
                    {report.status === "new" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkResolved(report.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkNotResolved(report.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet Table */}
      <div className="hidden md:block lg:hidden overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-[500px] w-full bg-white text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-2 px-3 text-left font-medium">Reporter</th>
              <th className="py-2 px-3 text-left font-medium">Report & Description</th>
              <th className="py-2 px-3 text-right font-medium">Time</th>
              <th className="py-2 px-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, idx) => (
              <tr key={report.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      {report.avatar ? (
                        <AvatarImage src={report.avatar} alt={report.name} />
                      ) : (
                        <AvatarFallback className="text-xs">{report.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium text-sm">{report.name}</span>
                  </div>
                </td>
                <td className="py-2 px-3">
                  <div className="font-medium text-sm">{report.report}</div>
                  <div className="text-xs text-gray-600">{report.description}</div>
                </td>
                <td className="py-2 px-3 text-right text-xs text-gray-500">{report.time}</td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(report)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRespond(report)}
                    >
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Reporter Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {report.avatar ? (
                          <AvatarImage src={report.avatar} alt={report.name} />
                        ) : (
                          <AvatarFallback>{report.name[0]}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{report.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <User className="h-3 w-3" />
                          Reporter
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {report.time}
                      </div>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div className="font-medium text-gray-900 text-sm">{report.report}</div>
                    </div>
                    <div className="text-sm text-gray-600 ml-6">{report.description}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleRespond(report)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Respond
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(report)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                  
                  {/* Status Actions for New Reports */}
                  {report.status === "new" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkResolved(report.id)}
                        className="flex-1 text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkNotResolved(report.id)}
                        className="flex-1 text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p>No reports found for this tab.</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </span>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <span className="text-xs sm:text-sm text-gray-600 px-2">
            Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Report Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    {selectedReport.avatar ? (
                      <AvatarImage src={selectedReport.avatar} alt={selectedReport.name} />
                    ) : (
                      <AvatarFallback>{selectedReport.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedReport.name}</div>
                    <div className="text-sm text-gray-500">{selectedReport.time}</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">Report Type:</div>
                  <div className="text-sm">{selectedReport.report}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">Description:</div>
                  <div className="text-sm">{selectedReport.description}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">Status:</div>
                  <div className="text-sm capitalize">{selectedReport.status}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Respond Modal */}
      {showRespondModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Respond to Report</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRespondModal(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-sm text-gray-700 mb-2">Report by {selectedReport.name}:</div>
                  <div className="text-sm bg-gray-50 p-3 rounded">{selectedReport.report}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Response:</label>
                  <textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none text-sm"
                    placeholder="Enter your response to this report..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowRespondModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700"
                    onClick={handleSubmitResponse}
                  >
                    Submit Response
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

