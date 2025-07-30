
import React, { useState } from "react";
import Agent from './Agent'
import Customer from './Customer'

export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Sidebar */}
      <div
        className={`
          fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden
          ${sidebarOpen ? "block" : "hidden"}
        `}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md p-4 transition-transform
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
        {/* ...sidebar content... */}
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}