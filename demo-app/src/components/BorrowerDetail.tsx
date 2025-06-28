import React, { useEffect, useState } from "react";
import {
  fetchBorrowerDetail,
  BorrowerDetail as BorrowerDetailType,
} from "../api/api";
import { Card } from "./Card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type BorrowerDetailProps = {
  borrowerId: string | null;
};

export function BorrowerDetail({ borrowerId }: BorrowerDetailProps) {
  const [borrower, setBorrower] = useState<BorrowerDetailType | null>(null);

  useEffect(() => {
    if (borrowerId) {
      fetchBorrowerDetail(borrowerId).then(setBorrower);
    }
  }, [borrowerId]);

  if (!borrower) {
    return (
      <Card>
        <div className="text-gray-500 text-center py-6">
          Select a borrower to see details
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{borrower.name}</h2>
        <p className="text-gray-600 text-sm mt-1">
          {borrower.email} | {borrower.phone}
        </p>
        <p className="text-lg font-bold text-green-700 mt-2">
          ${borrower.loan_amount.toLocaleString()}
        </p>
        <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full">
          {borrower.status}
        </span>
      </div>

      {/* AI Explainability */}
      <Accordion type="single" collapsible>
        <AccordionItem value="ai-flags">
          <AccordionTrigger className="text-base font-medium">
            🧠 AI Explainability
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-1 text-red-600 text-sm">
              {borrower.ai_flags.map((flag, idx) => (
                <li key={idx}>⚠️ {flag}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => console.log("Request Documents clicked")}
              >
                Request Documents
              </Button>
              <Button
                variant="outline"
                onClick={() => console.log("Send to Valuer clicked")}
              >
                Send to Valuer
              </Button>
              <Button
                variant="default"
                onClick={() => console.log("Approve clicked")}
              >
                Approve
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Loan Summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
        <div>
          <strong className="block text-gray-500">Employment</strong>
          {borrower.employment}
        </div>
        <div>
          <strong className="block text-gray-500">Existing Loan</strong>
          ${borrower.existing_loan.toLocaleString()}
        </div>
        <div>
          <strong className="block text-gray-500">Credit Score</strong>
          {borrower.credit_score}
        </div>
        <div>
          <strong className="block text-gray-500">Source of Funds</strong>
          {borrower.source_of_funds}
        </div>
      </div>

      {/* Risk Signal & Escalation */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex justify-between items-center">
        <div className="flex items-center text-yellow-800 font-medium gap-2">
          ⚠️ <span>{borrower.risk_signal}</span>
        </div>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
          onClick={() => console.log("Escalate to Credit Committee clicked")}
          disabled={!borrower.risk_signal}
        >
          Escalate to Credit Committee
        </button>
      </div>
    </Card>
  );
}
