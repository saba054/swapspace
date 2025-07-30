"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Plus, ChevronUp, ChevronDown, User, LogOut } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Samson Mario",
    email: "samson@example.com",
    role: "Admin",
    isExpanded: true
  },
  {
    id: 2,
    name: "Angela Kuda",
    email: "angela@example.com",
    role: "User",
    isExpanded: false
  },
  {
    id: 3,
    name: "Aura Santiago",
    email: "aura@example.com",
    role: "Manager",
    isExpanded: false
  }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userList, setUserList] = useState(users);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accessControl: "All",
    password: "",
    confirmPassword: ""
  });

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      alert("Sign out functionality - Add your sign out logic here");
    }
  };

  const handleSaveProfile = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Profile saved successfully!");
  };

  const handleAddUser = () => {
    const newUser = {
      id: userList.length + 1,
      name: `New User ${userList.length + 1}`,
      email: `user${userList.length + 1}@example.com`,
      role: "User",
      isExpanded: false
    };
    setUserList([...userList, newUser]);
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUserList(userList.filter(user => user.id !== userId));
    }
  };

  const handleChangeControl = (userId) => {
    alert(`Change control functionality for user ${userId} - Add your logic here`);
  };

  const toggleUserExpansion = (userId) => {
    setUserList(userList.map(user => 
      user.id === userId 
        ? { ...user, isExpanded: !user.isExpanded }
        : user
    ));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <Button 
          variant="destructive" 
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="account">
        <TabsList className="border-b border-gray-200 bg-transparent">
          <TabsTrigger value="account" className="data-[state=active]:border-b-2 border-teal-600">
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:border-b-2 border-teal-600">
            Security
          </TabsTrigger>
          <TabsTrigger value="notification" className="data-[state=active]:border-b-2 border-teal-600">
            Notification
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Account Tab Content */}
      {activeTab === "account" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Details Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Edit your profile details, contact info, and preferences easily
              </h3>
              
              {/* Avatar Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <Button variant="outline" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add photo
                </Button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter here"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Access Control</label>
                  <select
                    value={formData.accessControl}
                    onChange={(e) => handleInputChange("accessControl", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="All">All</option>
                    <option value="Limited">Limited</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Create Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Re-enter Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                    </button>
                  </div>
                </div>

                <Button 
                  className="w-full bg-teal-600 text-white hover:bg-teal-700 mt-6"
                  onClick={handleSaveProfile}
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Management Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Quickly onboard users by adding their details and assigning permissions
                </h3>
                <Button 
                  className="bg-teal-600 text-white hover:bg-teal-700"
                  onClick={handleAddUser}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </div>

              <div className="space-y-3">
                {userList.map((user) => (
                  <Card key={user.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-500" />
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <button
                          onClick={() => toggleUserExpansion(user.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {user.isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>

                      {user.isExpanded && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-600">Role: {user.role}</p>
                          <div className="flex gap-2 mt-3">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete user
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleChangeControl(user.id)}
                              className="bg-teal-600 text-white hover:bg-teal-700"
                            >
                              Change control
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Tab Content */}
      {activeTab === "security" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            <p className="text-gray-600">Security settings will be implemented here.</p>
          </CardContent>
        </Card>
      )}

      {/* Notification Tab Content */}
      {activeTab === "notification" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            <p className="text-gray-600">Notification settings will be implemented here.</p>
          </CardContent>
        </Card>
      )}

      {/* Language Preference Section */}
      {activeTab === "account" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Select from multiple languages for a more inclusive platform
            </h3>
            <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">Select language preference</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ar">Arabic</option>
            </select>
          </CardContent>
        </Card>
      )}
    </div>
  );
}