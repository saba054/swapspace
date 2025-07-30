"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, MoreVertical, Star, Phone, Mail, MapPin, TrendingUp, Users, Calendar, Eye } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    status: "active",
    joinDate: "2023-01-15",
    lastActivity: "2024-05-27",
    propertiesViewed: 12,
    savedProperties: 5,
    inquiries: 8,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    status: "active",
    joinDate: "2022-08-22",
    lastActivity: "2024-05-26",
    propertiesViewed: 18,
    savedProperties: 7,
    inquiries: 12,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 345-6789",
    location: "Miami, FL",
    status: "inactive",
    joinDate: "2023-03-10",
    lastActivity: "2024-04-15",
    propertiesViewed: 6,
    savedProperties: 2,
    inquiries: 3,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    status: "active",
    joinDate: "2022-11-05",
    lastActivity: "2024-05-25",
    propertiesViewed: 25,
    savedProperties: 10,
    inquiries: 15,
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 567-8901",
    location: "San Francisco, CA",
    status: "active",
    joinDate: "2022-06-18",
    lastActivity: "2024-05-27",
    propertiesViewed: 30,
    savedProperties: 12,
    inquiries: 20,
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  }
];

export default function CustomerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    inactive: customers.filter(c => c.status === "inactive").length,
    avgPropertiesViewed: Math.round(customers.reduce((sum, c) => sum + c.propertiesViewed, 0) / customers.length)
  };

  const handleAddCustomer = () => {
    if (!customerForm.name || !customerForm.email || !customerForm.phone || !customerForm.location) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Customer added successfully!");
    setShowAddCustomer(false);
    setCustomerForm({ name: "", email: "", phone: "", location: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Customer Management</h2>
          <p className="text-gray-600">Manage your customer database and interactions</p>
        </div>
        <Button 
          className="bg-teal-600 text-white hover:bg-teal-700"
          onClick={() => setShowAddCustomer(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
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
                <p className="text-sm text-gray-600">Active Customers</p>
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
                <p className="text-sm text-gray-600">Inactive Customers</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Properties Viewed</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgPropertiesViewed}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
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
            placeholder="Search customers by name, email, or location..."
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

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{customer.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {customer.status}
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
                  {customer.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {customer.location}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Eye className="h-4 w-4" />
                    Viewed
                  </div>
                  <p className="font-semibold text-lg">{customer.propertiesViewed}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    Saved
                  </div>
                  <p className="font-semibold text-lg">{customer.savedProperties}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    Inquiries
                  </div>
                  <p className="font-semibold text-lg">{customer.inquiries}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <div>Joined: {customer.joinDate}</div>
                <div>Last Activity: {customer.lastActivity}</div>
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

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Customer</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddCustomer(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Customer name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="customer@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={customerForm.location}
                    onChange={(e) => setCustomerForm({...customerForm, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="City, State"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddCustomer(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700"
                    onClick={handleAddCustomer}
                  >
                    Add Customer
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