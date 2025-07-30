"use client";
import React from "react";
import ConversionPathwayCard from "../../Overview/component/dashboard/components/ConversionPathwayCard";
import UsersCustomerCard from "../../Overview/component/dashboard/components/CustomerUsersCard";
import UsersBrokerCard from "../../Overview/component/dashboard/components/BrokerUsersCard";
import NewListingsCard from "../../Overview/component/dashboard/components/NewListingsCard";
import NewUsersCard from "../../Overview/component/dashboard/components/NewUsersCard";
import VisitorsLocationCard from "../../Overview/component/dashboard/components/VisitorsLocationCard";

export default function AnalyticsPage() {
  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-6">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          📊 Analytics Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Overview of user activity, sales conversions, and listings
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="space-y-6">
          <ConversionPathwayCard />
          <NewUsersCard />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <UsersCustomerCard />
          <UsersBrokerCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <VisitorsLocationCard />
          <NewListingsCard />
        </div>
      </div>
    </div>
    </>
  );
}
