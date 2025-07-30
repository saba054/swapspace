import React, { useEffect } from "react";
import WebsiteAnalyticsCard from "./dashboard/components/WebsiteAnalyticsCard";
import ConversionRateCard from "./dashboard/components/ConversionRateCard";
import DownloadsCard from "./dashboard/components/DownloadsCard";
import ConversionPathwayCard from "./dashboard/components/ConversionPathwayCard";
import VisitorsLocationCard from "./dashboard/components/VisitorsLocationCard";
import BrokerUsersCard from "./dashboard/components/BrokerUsersCard";
import NewListingsCard from "./dashboard/components/NewListingsCard";
import CustomerUsersCard from "./dashboard/components/CustomerUsersCard";
import NewUsersCard from "./dashboard/components/NewUsersCard";

export default function OverviewPage() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      className="p-4 grid gap-4 bg-white rounded-xl shadow-md min-h-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-auto"
    >
      <div className="gap-1 mb-4 flex flex-col h-full">
        <div className="h-full"><ConversionRateCard /></div>
        <div className="h-full"><DownloadsCard /></div>
      </div>
      <WebsiteAnalyticsCard />
      <ConversionPathwayCard />
      <VisitorsLocationCard />
      <BrokerUsersCard />
      <NewListingsCard />
      <CustomerUsersCard />
      <NewUsersCard />
    </div>
  );
}
