"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, MoreVertical, Star, Phone, Mail, MapPin, TrendingUp, Users, Home, Award } from "lucide-react";

const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    rating: 4.8,
    properties: 24,
    clients: 156,
    status: "active",
    joinDate: "2023-01-15",
    specializations: ["Residential", "Luxury"],
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    rating: 4.9,
    properties: 31,
    clients: 203,
    status: "active",
    joinDate: "2022-08-22",
    specializations: ["Commercial", "Investment"],
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 345-6789",
    location: "Miami, FL",
    rating: 4.7,
    properties: 18,
    clients: 89,
    status: "inactive",
    joinDate: "2023-03-10",
    specializations: ["Beachfront", "Condos"],
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    rating: 4.6,
    properties: 27,
    clients: 134,
    status: "active",
    joinDate: "2022-11-05",
    specializations: ["Urban", "Suburban"],
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    phone: "+1 (555) 567-8901",
    location: "San Francisco, CA",
    rating: 4.9,
    properties: 35,
    clients: 187,
    status: "active",
    joinDate: "2022-06-18",
    specializations: ["Tech", "Luxury"],
    avatar: "https://randomuser.me/api/portraits/women/5.jpg"
  }
];

export default function AgentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    specializations: []
  });

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: agents.length,
    active: agents.filter(a => a.status === "active").length,
    inactive: agents.filter(a => a.status === "inactive").length,
    avgRating: (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1)
  };

  const handleAddAgent = () => {
    if (!agentForm.name || !agentForm.email || !agentForm.phone || !agentForm.location) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Agent added successfully!");
    setShowAddAgent(false);
    setAgentForm({ name: "", email: "", phone: "", location: "", specializations: [] });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Agent Management</h2>
          <p className="text-gray-600">Manage your real estate agents and their performance</p>
        </div>
        <Button 
          className="bg-teal-600 text-white hover:bg-teal-700"
          onClick={() => setShowAddAgent(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive Agents</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <Award className="h-8 w-8 text-red-600" />
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
            placeholder="Search agents by name, email, or location..."
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {agent.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {agent.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {agent.location}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= agent.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({agent.rating})</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Home className="h-4 w-4" />
                    Properties
                  </div>
                  <p className="font-semibold text-lg">{agent.properties}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    Clients
                  </div>
                  <p className="font-semibold text-lg">{agent.clients}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-teal-600 text-white hover:bg-teal-700">
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Agent Modal */}
      {showAddAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Agent</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddAgent(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={agentForm.name}
                    onChange={(e) => setAgentForm({...agentForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Agent name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={agentForm.email}
                    onChange={(e) => setAgentForm({...agentForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="agent@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={agentForm.phone}
                    onChange={(e) => setAgentForm({...agentForm, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={agentForm.location}
                    onChange={(e) => setAgentForm({...agentForm, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="City, State"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddAgent(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700"
                    onClick={handleAddAgent}
                  >
                    Add Agent
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