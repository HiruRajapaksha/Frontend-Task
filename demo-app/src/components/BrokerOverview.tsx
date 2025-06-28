import React, { useEffect, useState } from "react";
import {
  fetchBrokerInfo,
  fetchOnboardingWorkflow,
  BrokerInfo,
  OnboardingWorkflow,
} from "../api/api";
import { Card } from "./Card";

export function BrokerOverview() {
  const [broker, setBroker] = useState<BrokerInfo | null>(null);
  const [workflow, setWorkflow] = useState<OnboardingWorkflow | null>(null);

  useEffect(() => {
    fetchBrokerInfo("1").then(setBroker);
    fetchOnboardingWorkflow().then(setWorkflow);
  }, []);

  if (!broker || !workflow)
    return (
      <Card>
        <div className="text-center text-gray-500 py-8">Loading...</div>
      </Card>
    );

  return (
    <Card>
      {/* Broker Name */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{broker.name}</h3>

      {/* Broker Stats */}
      <div className="grid grid-cols-3 gap-6 text-center mb-6">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-extrabold text-blue-600">{broker.deals}</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
            Deals
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-extrabold text-green-600">{broker.approval_rate}</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
            Approval Rate
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-extrabold text-red-600">
            ${broker.pending.toLocaleString()}
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
            Pending
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          className="flex-1 rounded-md border border-blue-600 text-blue-600 px-4 py-2 font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onClick={() => alert("Calling broker...")}
        >
          Call
        </button>
        <button
          type="button"
          className="flex-1 rounded-md border border-green-600 text-green-600 px-4 py-2 font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          onClick={() => alert("Opening email client...")}
        >
          Email
        </button>
        <button
          type="button"
          className="flex-1 rounded-md border border-purple-600 text-purple-600 px-4 py-2 font-semibold hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          onClick={() => alert("Starting chat...")}
        >
          Chat
        </button>
      </div>

      {/* Onboarding Workflow */}
      <h4 className="text-lg font-semibold mb-3 text-gray-800">Onboarding Workflow</h4>
      <ol className="list-decimal list-inside space-y-2 mb-6">
        {workflow.steps.map((step, idx) => (
          <li
            key={idx}
            className="flex items-center text-gray-700 text-sm font-medium"
          >
            <span className="mr-3 font-bold text-blue-500">{idx + 1}.</span> {step}
            {/* You can add completion icons or badges here */}
          </li>
        ))}
      </ol>

      {/* Checkbox Section */}
      <div className="flex items-center space-x-3">
        <input
          id="e-ardsassist"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="e-ardsassist"
          className="text-gray-700 font-semibold select-none cursor-pointer"
        >
          E Ardsassist
        </label>
      </div>
    </Card>
  );
}
