"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, MoreVertical, Star, User, Calendar, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const reviews = [
  {
    id: 1,
    user: "John Smith",
    email: "john.smith@example.com",
    rating: 5,
    title: "Excellent Service",
    review: "The platform is incredibly user-friendly and the customer service is outstanding. I found my dream home within weeks of using this service. Highly recommended!",
    date: "2024-05-27",
    status: "approved",
    helpful: 12,
    notHelpful: 2,
    category: "general",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    user: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    rating: 4,
    title: "Great Experience",
    review: "Overall a great experience. The property listings are accurate and the search filters work well. Would use again.",
    date: "2024-05-26",
    status: "approved",
    helpful: 8,
    notHelpful: 1,
    category: "general",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    user: "Mike Wilson",
    email: "mike.wilson@example.com",
    rating: 2,
    title: "Needs Improvement",
    review: "The website is slow and some property information was outdated. Customer service was helpful but the platform needs work.",
    date: "2024-05-25",
    status: "pending",
    helpful: 3,
    notHelpful: 5,
    category: "general",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    user: "Lisa Chen",
    email: "lisa.chen@example.com",
    rating: 5,
    title: "Amazing Platform",
    review: "This is by far the best real estate platform I've used. The virtual tours are fantastic and the agents are very responsive.",
    date: "2024-05-24",
    status: "approved",
    helpful: 15,
    notHelpful: 0,
    category: "general",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    user: "David Brown",
    email: "david.brown@example.com",
    rating: 3,
    title: "Average Experience",
    review: "The platform is okay but could be better. Some features are confusing and the mobile app needs improvement.",
    date: "2024-05-23",
    status: "rejected",
    helpful: 2,
    notHelpful: 3,
    category: "general",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  }
];

export default function GeneralReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    title: "",
    review: "",
    rating: 0
  });

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.review.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === "approved").length,
    pending: reviews.filter(r => r.status === "pending").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
    avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  };

  const handleAddReview = () => {
    if (!reviewForm.name || !reviewForm.email || !reviewForm.title || !reviewForm.review || reviewForm.rating === 0) {
      alert("Please fill in all fields and provide a rating");
      return;
    }
    alert("Review submitted successfully!");
    setShowAddReview(false);
    setReviewForm({ name: "", email: "", title: "", review: "", rating: 0 });
  };

  const handleStatusUpdate = (reviewId, newStatus) => {
    alert(`Review status updated to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">General Reviews</h2>
          <p className="text-gray-600">Manage and moderate customer reviews</p>
        </div>
        <Button 
          className="bg-teal-600 text-white hover:bg-teal-700"
          onClick={() => setShowAddReview(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Review
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <ThumbsDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600 fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search reviews by user, title, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{review.user}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({review.rating}/5)</span>
                </div>
              </div>
              
              <h4 className="font-medium text-lg mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.review}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {review.helpful}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4" />
                    {review.notHelpful}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {review.status === "pending" && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={() => handleStatusUpdate(review.id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusUpdate(review.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredReviews.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No reviews found for this filter.
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Review</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddReview(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                        className="text-2xl transition"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= reviewForm.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {reviewForm.rating > 0 ? `${reviewForm.rating}/5 stars` : "Click to rate"}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Review title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Review</label>
                  <textarea
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({...reviewForm, review: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
                    placeholder="Share your experience..."
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddReview(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700"
                    onClick={handleAddReview}
                  >
                    Submit Review
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