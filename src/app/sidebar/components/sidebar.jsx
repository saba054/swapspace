"use client";
import React, { useState } from "react";
import Overview from "../../pages/Overview/component/Overview";
import Analytics from "../../pages/Analytics/components/Analytics";
import Reports from "../../pages/Reports/components/Reports";
import Activity from "../../pages/Activity/components/Activity";
import UserManagement from "../../pages/UserManagement/components/UserManagement";
import PropertyManagement from "../../pages/PropertyManagement/components/PropertyManagement";
import Subscription from "../../pages/Subscription/components/Subscription";
import Settings from "../../pages/Settings/components/Settings";
import Messages from "../../pages/Messages/components/Message";
import Notifications from "../../pages/Notifications/components/Notifications";
import Feedback from "../../pages/Feedback/components/Feedback";
import Help from "../../pages/Help/components/Help";
import Agent from "../../pages/UserManagement/components/Agent";
import Customer from "../../pages/UserManagement/components/Customer";
import GeneralReview from "../../pages/Reviews/components/GeneralReview";
import SurveyReviews from "../../pages/Reviews/components/SurveyReviews";
import { 
  BarChart3, 
  TrendingUp, 
  Activity as ActivityIcon, 
  FileText, 
  Users, 
  Star, 
  Home, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Settings as SettingsIcon, 
  MessageCircle, 
  HelpCircle,
  ChevronDown,
  UserCheck,
  UserPlus
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarLayout() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "analytics":
        return <Analytics />;
      case "reports":
        return <Reports />;
      case "activity":
        return <Activity />;
      case "user":
        return <UserManagement />;
      case "property":
        return <PropertyManagement />;
      case "subscription":
        return <Subscription />;
      case "settings":
        return <Settings />;
      case "messages":
        return <Messages />;
      case "notifications":
        return <Notifications />;
      case "feedback":
        return <Feedback />;
      case "help":
        return <Help />;
      case "agent":
        return <Agent />;
      case "customer":
        return <Customer />;
      case "generalreview":
        return <GeneralReview />;
      case "surveyreviews":
        return <SurveyReviews />;
      default:
        return <div className="p-4">Select a section</div>;
    }
  };

  const buttonStyle =
    "flex items-center gap-2 hover:bg-emerald-400 w-full px-4 py-2 rounded-md transition";
  const dropdownItemStyle =
    "block text-left w-full px-4 py-2 hover:bg-gray-100 text-sm";

  return (
    <div className="flex h-screen">
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        {/* Hamburger icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Sidebar overlay for mobile */}
      <div
        className={`
          fixed inset-0 z-40 bg-transparent transition-opacity md:hidden
          ${sidebarOpen ? "block" : "hidden"}
        `}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Sidebar drawer */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md p-4 transition-transform overflow-y-auto max-h-screen
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block
        `}
        style={{ transition: "transform 0.3s" }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden mb-4"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="font-bold text-lg mb-4">General</h2>

        {/* Overview */}
        <button onClick={() => setActiveTab("overview")} className={buttonStyle}>
          <BarChart3 className="w-6 h-6" />
          Overview
        </button>

        {/* Analytics */}
        <button onClick={() => setActiveTab("analytics")} className={buttonStyle}>
          <TrendingUp className="w-6 h-6" />
          Analytics
        </button>

        {/* Activity */}
        <button onClick={() => setActiveTab("activity")} className={buttonStyle}>
          <ActivityIcon className="w-6 h-6" />
          Activity
        </button>

        {/* Reports */}
        <button onClick={() => setActiveTab("reports")} className={buttonStyle}>
          <FileText className="w-6 h-6" />
          Reports
        </button>

        {/* User Management Dropdown */}
        <div className="mt-2">
          <button onClick={() => setIsOpen(!isOpen)} className={buttonStyle}>
            <Users className="w-6 h-6" />
            User Management
            <ChevronDown
              className={`w-4 h-4 ml-auto transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <div className="ml-4 mt-1">
              <button onClick={() => setActiveTab("agent")} className={dropdownItemStyle}>
                <UserCheck className="w-4 h-4 inline mr-2" />
                Agent
              </button>
              <button onClick={() => setActiveTab("customer")} className={dropdownItemStyle}>
                <UserPlus className="w-4 h-4 inline mr-2" />
                Customer
              </button>
            </div>
          )}
        </div>

        {/* Reviews Dropdown */}
        <div className="mt-2">
          <button onClick={() => setIsOpen1(!isOpen1)} className={buttonStyle}>
            <Star className="w-6 h-6" />
            Reviews
            <ChevronDown
              className={`w-4 h-4 ml-auto transition-transform ${
                isOpen1 ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen1 && (
            <div className="ml-4 mt-1">
              <button onClick={() => setActiveTab("generalreview")} className={dropdownItemStyle}>
                <Star className="w-4 h-4 inline mr-2" />
                General Review
              </button>
              <button onClick={() => setActiveTab("surveyreviews")} className={dropdownItemStyle}>
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Survey Reviews
              </button>
            </div>
          )}
        </div>

        {/* Other Buttons */}
        <button onClick={() => setActiveTab("property")} className={buttonStyle}>
          <Home className="w-6 h-6" />
          Property Management
        </button>

        <button onClick={() => setActiveTab("subscription")} className={buttonStyle}>
          <CreditCard className="w-6 h-6" />
          Subscription
        </button>

        <button onClick={() => setActiveTab("messages")} className={buttonStyle}>
          <MessageSquare className="w-6 h-6" />
          Messages
        </button>

        <button onClick={() => setActiveTab("notifications")} className={buttonStyle}>
          <Bell className="w-6 h-6" />
          Notifications
        </button>

        <button onClick={() => setActiveTab("settings")} className={buttonStyle}>
          <SettingsIcon className="w-6 h-6" />
          Settings
        </button>

        <h2 className="font-bold text-lg mt-4 mb-2">Support</h2>

        <button onClick={() => setActiveTab("feedback")} className={buttonStyle}>
          <MessageCircle className="w-6 h-6" />
          Feedback
        </button>

        <button onClick={() => setActiveTab("help")} className={buttonStyle}>
          <HelpCircle className="w-6 h-6" />
          Help
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
