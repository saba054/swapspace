"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Download, ChevronLeft, ChevronRight, Edit, Search, Send, X, Reply, MoreVertical, Star, User, Mail, Clock, MessageSquare } from "lucide-react";

const initialMessages = [
  {
    id: 1,
    sender: "Rosalyn Tyrant",
    email: "rosalyn@example.com",
    message: "Subscription plan - Hello Sir, I would like to get more information about the new premium subscription plan. Could you please provide details about the features and pricing?",
    date: "May 27",
    time: "13:27 PM",
    isUnread: true,
    isStarred: false,
    status: "unread",
    category: "subscription"
  },
  {
    id: 2,
    sender: "John Smith",
    email: "john@example.com",
    message: "Property Inquiry - I'm interested in the apartment you listed. Is it still available? Can I schedule a viewing?",
    date: "May 27",
    time: "13:25 PM",
    isUnread: true,
    isStarred: true,
    status: "unread",
    category: "inquiry"
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    email: "sarah@example.com",
    message: "Support Request - I'm having trouble accessing my account. Can you help me reset my password?",
    date: "May 27",
    time: "13:20 PM",
    isUnread: true,
    isStarred: false,
    status: "unread",
    category: "support"
  },
  {
    id: 4,
    sender: "Mike Wilson",
    email: "mike@example.com",
    message: "Payment Confirmation - Thank you for processing my payment. I received the confirmation email.",
    date: "May 27",
    time: "13:15 PM",
    isUnread: false,
    isStarred: false,
    status: "read",
    category: "payment"
  },
  {
    id: 5,
    sender: "Lisa Brown",
    email: "lisa@example.com",
    message: "General Question - What are your business hours? I'd like to speak with someone about a property listing.",
    date: "May 27",
    time: "13:10 PM",
    isUnread: false,
    isStarred: true,
    status: "read",
    category: "general"
  }
];

export default function MessagePage() {
  const [tab, setTab] = useState("inbox");
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("today");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    message: ""
  });
  const [replyData, setReplyData] = useState({
    message: ""
  });

  const itemsPerPage = 5;

  // Filter messages based on tab and search
  const filteredMessages = messages.filter(message => {
    const matchesTab = 
      (tab === "inbox" && message.status !== "deleted") ||
      (tab === "sent" && message.status === "sent") ||
      (tab === "drafts" && message.status === "draft");
    
    const matchesSearch = 
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  const unreadCount = messages.filter(msg => msg.isUnread && msg.status !== "deleted").length;

  const handleSendNotification = () => {
    if (!composeData.to || !composeData.subject || !composeData.message) {
      alert("Please fill in all fields");
      return;
    }
    
    const newMessage = {
      id: Date.now(),
      sender: "You",
      email: composeData.to,
      message: composeData.subject + " - " + composeData.message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isUnread: false,
      isStarred: false,
      status: "sent",
      category: "outgoing"
    };
    
    setMessages([newMessage, ...messages]);
    setShowComposeModal(false);
    setComposeData({ to: "", subject: "", message: "" });
    alert("Message sent successfully!");
  };

  const handleReply = () => {
    if (!replyData.message.trim()) {
      alert("Please enter a reply message");
      return;
    }
    
    const replyMessage = {
      id: Date.now(),
      sender: "You",
      email: selectedMessage.email,
      message: `Re: ${selectedMessage.message.split(' - ')[0]} - ${replyData.message}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isUnread: false,
      isStarred: false,
      status: "sent",
      category: "reply"
    };
    
    setMessages([replyMessage, ...messages]);
    setShowReplyModal(false);
    setReplyData({ message: "" });
    setSelectedMessage(null);
    alert("Reply sent successfully!");
  };

  const handleRefresh = () => {
    // Simulate refreshing messages
    alert("Messages refreshed!");
  };

  const handleDownload = () => {
    alert("Download functionality - Add your export logic here");
  };

  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    setCurrentPage(1);
  };

  const toggleStar = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const markAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isUnread: false, status: "read" } : msg
    ));
  };

  const deleteMessage = (messageId) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: "deleted" } : msg
      ));
    }
  };

  const openReplyModal = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Message</h2>
          <Button 
            className="bg-teal-600 text-white hover:bg-teal-700"
            onClick={() => setShowComposeModal(true)}
            size="sm"
          >
            <Edit className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Compose</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={dateFilter === "today" ? "default" : "outline"}
              size="sm"
              className={dateFilter === "today" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
              onClick={() => handleDateFilter("today")}
            >
              <span className="hidden sm:inline">Today</span>
              <span className="sm:hidden">Today</span>
            </Button>
            <Button 
              variant={dateFilter === "week" ? "default" : "outline"}
              size="sm"
              className={dateFilter === "week" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
              onClick={() => handleDateFilter("week")}
            >
              <span className="hidden sm:inline">This Week</span>
              <span className="sm:hidden">Week</span>
            </Button>
            <Button 
              variant={dateFilter === "month" ? "default" : "outline"}
              size="sm"
              className={dateFilter === "month" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
              onClick={() => handleDateFilter("month")}
            >
              <span className="hidden sm:inline">This Month</span>
              <span className="sm:hidden">Month</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden lg:inline">10/10/2025-10/10/2024</span>
              <span className="hidden sm:inline lg:hidden">Date Range</span>
              <span className="sm:hidden">Date</span>
            </Button>
            <Button 
              className="bg-teal-600 text-white hover:bg-teal-700"
              onClick={handleDownload}
              size="sm"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        />
      </div>

      {/* Navigation Tabs */}
      <Tabs value={tab} onValueChange={(value) => {
        setTab(value);
        setCurrentPage(1);
      }} defaultValue="inbox">
        <TabsList className="border-b border-gray-200 bg-transparent w-full overflow-x-auto">
          <TabsTrigger value="inbox" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            Inbox ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="sent" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            Sent
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            Drafts
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Unread Messages & Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Unread Messages: {unreadCount}
        </span>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600">
            {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} of {filteredMessages.length}
          </span>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Sender</th>
              <th className="py-3 px-4 text-left font-medium">Message</th>
              <th className="py-3 px-4 text-right font-medium">Date</th>
              <th className="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((message) => (
              <tr key={message.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    {message.isUnread && (
                      <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium truncate ${message.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.sender}
                        </span>
                        {message.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{message.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  <p className="truncate">{message.message}</p>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="text-xs text-gray-500">{message.date}</div>
                  <div className="text-xs text-gray-400">{message.time}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openReplyModal(message)}
                      className="h-8 w-8 p-0"
                    >
                      <Reply className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(message.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Star className={`h-3 w-3 ${message.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
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
              <th className="py-2 px-3 text-left font-medium">Sender & Message</th>
              <th className="py-2 px-3 text-right font-medium">Date</th>
              <th className="py-2 px-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((message) => (
              <tr key={message.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-3">
                  <div className="flex items-center space-x-2">
                    {message.isUnread && (
                      <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm ${message.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.sender}
                        </span>
                        {message.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{message.email}</p>
                      <p className="text-xs text-gray-600 truncate">{message.message}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-3 text-right">
                  <div className="text-xs text-gray-500">{message.date}</div>
                  <div className="text-xs text-gray-400">{message.time}</div>
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openReplyModal(message)}
                      className="h-7 w-7 p-0"
                    >
                      <Reply className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(message.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Star className={`h-3 w-3 ${message.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                      className="h-7 w-7 p-0"
                    >
                      <X className="h-3 w-3" />
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
        {currentMessages.map((message) => (
          <Card key={message.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Message Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {message.isUnread && (
                      <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                    )}
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-teal-600" />
                      <div>
                        <div className={`font-medium text-sm ${message.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.sender}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Mail className="h-3 w-3" />
                          {message.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {message.date} {message.time}
                    </div>
                    {message.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-current mt-1" />}
                  </div>
                </div>

                {/* Message Content */}
                <div className="text-sm text-gray-700 pl-5">
                  {message.message}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => openReplyModal(message)}
                  >
                    <Reply className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStar(message.id)}
                    className={message.isStarred ? "text-yellow-600" : ""}
                  >
                    <Star className={`h-3 w-3 ${message.isStarred ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteMessage(message.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentMessages.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p>No messages found for this filter.</p>
        </div>
      )}

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Compose Message</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComposeModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">To:</label>
                  <input
                    type="email"
                    value={composeData.to}
                    onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject:</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    placeholder="Enter subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message:</label>
                  <textarea
                    value={composeData.message}
                    onChange={(e) => setComposeData({...composeData, message: e.target.value})}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-24 sm:h-32 resize-none text-sm"
                    placeholder="Enter your message"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowComposeModal(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto"
                    onClick={handleSendNotification}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Reply to {selectedMessage.sender}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Original message:</strong> {selectedMessage.message}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Reply:</label>
                  <textarea
                    value={replyData.message}
                    onChange={(e) => setReplyData({message: e.target.value})}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-24 sm:h-32 resize-none text-sm"
                    placeholder="Enter your reply"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowReplyModal(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto"
                    onClick={handleReply}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
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