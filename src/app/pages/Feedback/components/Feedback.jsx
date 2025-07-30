"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Send, Filter, Download, CalendarDays, User, Clock, Tag } from "lucide-react";

const feedbackCategories = [
  { id: "general", name: "General", icon: "💬" },
  { id: "bug", name: "Bug Report", icon: "🐛" },
  { id: "feature", name: "Feature Request", icon: "💡" },
  { id: "improvement", name: "Improvement", icon: "⚡" },
  { id: "complaint", name: "Complaint", icon: "😞" },
  { id: "praise", name: "Praise", icon: "👏" }
];

const initialFeedback = [
  {
    id: 1,
    user: "John Smith",
    email: "john@example.com",
    category: "feature",
    rating: 5,
    title: "Great platform, but need mobile app",
    message: "The platform is excellent, but I would love to see a mobile app for easier access on the go. The current mobile web version works well, but a native app would be even better.",
    status: "pending",
    date: "2024-05-27",
    time: "14:30",
    priority: "medium"
  },
  {
    id: 2,
    user: "Sarah Johnson",
    email: "sarah@example.com",
    category: "bug",
    rating: 2,
    title: "Property images not loading",
    message: "I'm experiencing issues with property images not loading properly. This happens on both Chrome and Firefox browsers. Please fix this asap.",
    status: "in-progress",
    date: "2024-05-26",
    time: "16:45",
    priority: "high"
  },
  {
    id: 3,
    user: "Mike Wilson",
    email: "mike@example.com",
    category: "praise",
    rating: 5,
    title: "Excellent customer service",
    message: "The customer service team was incredibly helpful when I had issues with my account. They resolved everything quickly and professionally.",
    status: "resolved",
    date: "2024-05-25",
    time: "11:20",
    priority: "low"
  },
  {
    id: 4,
    user: "Lisa Brown",
    email: "lisa@example.com",
    category: "improvement",
    rating: 4,
    title: "Search functionality could be better",
    message: "The search feature works well, but it would be great to have more advanced filters like price range, property type, and location radius.",
    status: "pending",
    date: "2024-05-24",
    time: "09:15",
    priority: "medium"
  },
  {
    id: 5,
    user: "David Lee",
    email: "david@example.com",
    category: "complaint",
    rating: 1,
    title: "Very slow website performance",
    message: "The website is extremely slow, especially when loading property listings. This is affecting my business as clients get frustrated waiting.",
    status: "in-progress",
    date: "2024-05-23",
    time: "13:40",
    priority: "high"
  }
];

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [feedback, setFeedback] = useState(initialFeedback);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: ""
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = feedbackCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : "💬";
  };

  const getCategoryName = (categoryId) => {
    const category = feedbackCategories.find(cat => cat.id === categoryId);
    return category ? category.name : "General";
  };

  const filteredFeedback = feedback.filter(item => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  const handleSubmitFeedback = () => {
    if (!formData.name || !formData.email || !formData.title || !formData.message || rating === 0) {
      alert("Please fill in all fields and provide a rating");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      user: formData.name,
      email: formData.email,
      category: selectedCategory,
      rating: rating,
      title: formData.title,
      message: formData.message,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      priority: rating <= 2 ? "high" : rating <= 3 ? "medium" : "low"
    };

    setFeedback([newFeedback, ...feedback]);
    setShowSubmitForm(false);
    setFormData({ name: "", email: "", title: "", message: "" });
    setRating(0);
    setSelectedCategory("general");
    alert("Feedback submitted successfully! Thank you for your input.");
  };

  const handleStatusUpdate = (feedbackId, newStatus) => {
    setFeedback(feedback.map(item => 
      item.id === feedbackId ? { ...item, status: newStatus } : item
    ));
  };

  const handleDownload = () => {
    alert("Download functionality - Add your export logic here");
  };

  const stats = {
    total: feedback.length,
    pending: feedback.filter(f => f.status === "pending").length,
    inProgress: feedback.filter(f => f.status === "in-progress").length,
    resolved: feedback.filter(f => f.status === "resolved").length,
    averageRating: (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">Feedback Management</h2>
          <p className="text-sm sm:text-base text-gray-600">Manage and respond to user feedback</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button 
            className="bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto"
            onClick={() => setShowSubmitForm(true)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Submit Feedback</span>
            <span className="sm:hidden">Submit</span>
          </Button>
          <Button variant="outline" onClick={handleDownload} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Feedback</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">In Progress</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <Filter className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Resolved</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <ThumbsUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Avg Rating</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">{stats.averageRating}</p>
              </div>
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
        <TabsList className="border-b border-gray-200 bg-transparent w-full overflow-x-auto">
          <TabsTrigger value="all" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            All Feedback
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            Pending
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="resolved" className="data-[state=active]:border-b-2 border-teal-600 whitespace-nowrap">
            Resolved
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Feedback List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredFeedback.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-xl sm:text-2xl flex-shrink-0">{getCategoryIcon(item.category)}</div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="truncate">{item.user}</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span className="truncate">{item.email}</span>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        <span>{item.date} at {item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${star <= item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-gray-600 ml-1">({item.rating}/5)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3 text-gray-400" />
                  <span className="text-xs sm:text-sm text-gray-600">{getCategoryName(item.category)}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 text-sm sm:text-base">{item.message}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusUpdate(item.id, "in-progress")}
                    disabled={item.status === "in-progress"}
                    className="w-full sm:w-auto"
                  >
                    <span className="hidden sm:inline">Mark In Progress</span>
                    <span className="sm:hidden">In Progress</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusUpdate(item.id, "resolved")}
                    disabled={item.status === "resolved"}
                    className="w-full sm:w-auto"
                  >
                    <span className="hidden sm:inline">Mark Resolved</span>
                    <span className="sm:hidden">Resolved</span>
                  </Button>
                </div>
                
                <Button size="sm" className="bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredFeedback.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No feedback found for this filter.
          </div>
        )}
      </div>

      {/* Submit Feedback Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold">Submit Feedback</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSubmitForm(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {feedbackCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-2 sm:p-3 rounded-lg border-2 text-left transition ${
                          selectedCategory === category.id
                            ? "border-teal-500 bg-teal-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-base sm:text-lg mb-1">{category.icon}</div>
                        <div className="text-xs sm:text-sm font-medium">{category.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl transition"
                      >
                        <Star
                          className={`h-6 w-6 sm:h-8 sm:w-8 ${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs sm:text-sm text-gray-600">
                      {rating > 0 ? `${rating}/5 stars` : "Click to rate"}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    placeholder="Brief description of your feedback"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-24 sm:h-32 resize-none text-sm"
                    placeholder="Please provide detailed feedback..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmitForm(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto"
                    onClick={handleSubmitFeedback}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
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