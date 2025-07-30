"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, MoreVertical, BarChart3, Users, CheckCircle, Clock, TrendingUp, PieChart } from "lucide-react";

const surveys = [
  {
    id: 1,
    title: "Customer Satisfaction Survey",
    description: "General feedback about our platform and services",
    status: "active",
    responses: 245,
    completionRate: 78,
    avgRating: 4.2,
    questions: 12,
    createdDate: "2024-05-01",
    endDate: "2024-06-01",
    category: "satisfaction"
  },
  {
    id: 2,
    title: "Property Search Experience",
    description: "How users find and interact with property listings",
    status: "completed",
    responses: 189,
    completionRate: 85,
    avgRating: 4.5,
    questions: 8,
    createdDate: "2024-04-15",
    endDate: "2024-05-15",
    category: "experience"
  },
  {
    id: 3,
    title: "Agent Performance Review",
    description: "Feedback about agent responsiveness and professionalism",
    status: "active",
    responses: 156,
    completionRate: 72,
    avgRating: 4.1,
    questions: 15,
    createdDate: "2024-05-10",
    endDate: "2024-06-10",
    category: "performance"
  },
  {
    id: 4,
    title: "Website Usability Study",
    description: "User experience and interface feedback",
    status: "draft",
    responses: 0,
    completionRate: 0,
    avgRating: 0,
    questions: 10,
    createdDate: "2024-05-20",
    endDate: "2024-06-20",
    category: "usability"
  },
  {
    id: 5,
    title: "Mobile App Feedback",
    description: "Mobile application user experience and features",
    status: "completed",
    responses: 203,
    completionRate: 91,
    avgRating: 4.3,
    questions: 6,
    createdDate: "2024-03-01",
    endDate: "2024-04-01",
    category: "mobile"
  }
];

const surveyResponses = [
  {
    id: 1,
    surveyId: 1,
    user: "John Smith",
    email: "john.smith@example.com",
    rating: 5,
    feedback: "Excellent platform, very user-friendly and responsive.",
    date: "2024-05-27",
    status: "completed",
    timeSpent: "8 min"
  },
  {
    id: 2,
    surveyId: 1,
    user: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    rating: 4,
    feedback: "Good experience overall, some features could be improved.",
    date: "2024-05-26",
    status: "completed",
    timeSpent: "12 min"
  },
  {
    id: 3,
    surveyId: 2,
    user: "Mike Wilson",
    email: "mike.wilson@example.com",
    rating: 3,
    feedback: "Property search works but could be faster.",
    date: "2024-05-25",
    status: "completed",
    timeSpent: "15 min"
  }
];

export default function SurveyReviewsPage() {
  const [activeTab, setActiveTab] = useState("surveys");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateSurvey, setShowCreateSurvey] = useState(false);
  const [surveyForm, setSurveyForm] = useState({
    title: "",
    description: "",
    category: "satisfaction",
    questions: 10
  });

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = 
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || survey.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalSurveys: surveys.length,
    activeSurveys: surveys.filter(s => s.status === "active").length,
    completedSurveys: surveys.filter(s => s.status === "completed").length,
    totalResponses: surveys.reduce((sum, s) => sum + s.responses, 0),
    avgCompletionRate: Math.round(surveys.reduce((sum, s) => sum + s.completionRate, 0) / surveys.length)
  };

  const handleCreateSurvey = () => {
    if (!surveyForm.title || !surveyForm.description) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Survey created successfully!");
    setShowCreateSurvey(false);
    setSurveyForm({ title: "", description: "", category: "satisfaction", questions: 10 });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Survey Reviews</h2>
          <p className="text-gray-600">Create and manage customer surveys and feedback</p>
        </div>
        <Button 
          className="bg-teal-600 text-white hover:bg-teal-700"
          onClick={() => setShowCreateSurvey(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Survey
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Surveys</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSurveys}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Surveys</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeSurveys}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completedSurveys}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Responses</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalResponses}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgCompletionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "surveys" ? "default" : "outline"}
            onClick={() => setActiveTab("surveys")}
            className={activeTab === "surveys" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
          >
            Surveys
          </Button>
          <Button
            variant={activeTab === "responses" ? "default" : "outline"}
            onClick={() => setActiveTab("responses")}
            className={activeTab === "responses" ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
          >
            Responses
          </Button>
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search surveys..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Surveys Tab */}
      {activeTab === "surveys" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurveys.map((survey) => (
            <Card key={survey.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{survey.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
                      {survey.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{survey.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Responses</div>
                    <p className="font-semibold text-lg">{survey.responses}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Completion</div>
                    <p className="font-semibold text-lg">{survey.completionRate}%</p>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Rating</div>
                    <p className="font-semibold text-lg">{survey.avgRating}/5</p>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Questions</div>
                    <p className="font-semibold text-lg">{survey.questions}</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mb-4">
                  <div>Created: {survey.createdDate}</div>
                  <div>Ends: {survey.endDate}</div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-teal-600 text-white hover:bg-teal-700">
                    View Results
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Responses Tab */}
      {activeTab === "responses" && (
        <div className="space-y-4">
          {surveyResponses.map((response) => (
            <Card key={response.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{response.user}</h3>
                    <p className="text-sm text-gray-600">{response.email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{response.date}</div>
                    <div className="text-sm text-gray-500">{response.timeSpent}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${star <= response.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({response.rating}/5)</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{response.feedback}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    response.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {response.status}
                  </span>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Survey Modal */}
      {showCreateSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Create New Survey</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateSurvey(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Survey Title</label>
                  <input
                    type="text"
                    value={surveyForm.title}
                    onChange={(e) => setSurveyForm({...surveyForm, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter survey title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={surveyForm.description}
                    onChange={(e) => setSurveyForm({...surveyForm, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-24 resize-none"
                    placeholder="Describe the purpose of this survey"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={surveyForm.category}
                      onChange={(e) => setSurveyForm({...surveyForm, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="satisfaction">Customer Satisfaction</option>
                      <option value="experience">User Experience</option>
                      <option value="performance">Performance</option>
                      <option value="usability">Usability</option>
                      <option value="mobile">Mobile App</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Questions</label>
                    <input
                      type="number"
                      value={surveyForm.questions}
                      onChange={(e) => setSurveyForm({...surveyForm, questions: parseInt(e.target.value)})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateSurvey(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700"
                    onClick={handleCreateSurvey}
                  >
                    Create Survey
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