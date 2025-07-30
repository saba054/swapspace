"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Download, ChevronLeft, ChevronRight, Edit, Search, Send, X, Reply, MoreVertical, Star } from "lucide-react";

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
    <div className="p-2 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Message</h2>
          <Button 
            className="bg-teal-600 text-white hover:bg-teal-700"
            onClick={() => setShowComposeModal(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Compose</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Navigation Tabs */}
      <Tabs value={tab} onValueChange={(value) => {
        setTab(value);
        setCurrentPage(1);
      }} defaultValue="inbox">
        <TabsList className="border-b border-gray-200 bg-transparent">
          <TabsTrigger value="inbox" className="data-[state=active]:border-b-2 border-teal-600">
            Inbox
          </TabsTrigger>
          <TabsTrigger value="sent" className="data-[state=active]:border-b-2 border-teal-600">
            Sent
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:border-b-2 border-teal-600">
            Drafts
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Unread Messages & Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs sm:text-sm text-gray-600">Unread Messages {unreadCount}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600">
            {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} of {filteredMessages.length}
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

      {/* Message Table Header & Rows */}
      <div className="overflow-x-auto rounded-lg show-scrollbar overflow-y-auto">
        <div className="min-w-[600px] grid grid-cols-1 md:grid-cols-12 bg-teal-600 text-white font-semibold py-3 px-4 rounded-md text-xs sm:text-sm">
          <div className="col-span-4 md:col-span-4">Sender</div>
          <div className="col-span-6 md:col-span-6">Message</div>
          <div className="col-span-2 md:col-span-2 text-right">Date</div>
        </div>
        {currentMessages.map((message) => (
          <Card key={message.id} className="hover:shadow-md transition-shadow min-w-[600px]">
            <CardContent className="grid grid-cols-1 md:grid-cols-12 items-center py-4 px-4 text-xs sm:text-sm">
              <div className="col-span-4 md:col-span-4 flex items-center space-x-3">
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
              <div className="col-span-6 md:col-span-6 text-gray-600 text-xs sm:text-sm">
                <p className="truncate">{message.message}</p>
              </div>
              <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-2">
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-gray-500">{message.date}</div>
                  <div className="text-xs text-gray-400">{message.time}</div>
                </div>
                <div className="flex gap-1">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentMessages.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No messages found for this filter.
        </div>
      )}

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardContent className="p-6">
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject:</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message:</label>
                  <textarea
                    value={composeData.message}
                    onChange={(e) => setComposeData({...composeData, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
                    placeholder="Enter your message"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowComposeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardContent className="p-6">
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
                    placeholder="Enter your reply"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowReplyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700"
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