import React, { useState } from "react";
import Layout from "../components/Layout";
import { BorrowerPipeline } from "../components/BorrowerPipeline";
import { BorrowerDetail } from "../components/BorrowerDetail";
import { BrokerOverview } from "../components/BrokerOverview";

export default function Dashboard() {
  const [activeBorrowerId, setActiveBorrowerId] = useState<string | null>(null);

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {/* Left Panel */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-full max-h-screen overflow-y-auto">
            <BorrowerPipeline
              activeBorrowerId={activeBorrowerId}
              onSelectBorrower={setActiveBorrowerId}
            />
          </div>

          {/* Middle Panel */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-full max-h-screen overflow-y-auto">
            <BorrowerDetail borrowerId={activeBorrowerId} />
          </div>

          {/* Right Panel */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-full max-h-screen overflow-y-auto">
            <BrokerOverview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
