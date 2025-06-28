import React, { useEffect, useState } from "react";
import { fetchBorrowerPipeline, Borrower } from "../api/api";
import { Card } from "./Card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

type BorrowerPipelineProps = {
  onSelectBorrower: (borrowerId: string) => void;
  activeBorrowerId: string | null;
};

export function BorrowerPipeline({
  onSelectBorrower,
  activeBorrowerId,
}: BorrowerPipelineProps) {
  const [pipeline, setPipeline] = useState<{
    new: Borrower[];
    in_review: Borrower[];
    approved: Borrower[];
  }>({ new: [], in_review: [], approved: [] });

  useEffect(() => {
    fetchBorrowerPipeline().then(setPipeline);
  }, []);

  const renderBorrowers = (borrowers: Borrower[]) =>
    borrowers.map((b) => (
      <div
        key={b.id}
        onClick={() => onSelectBorrower(b.id)}
        className={`cursor-pointer px-4 py-3 rounded-md transition-colors border mb-2 ${
          activeBorrowerId === b.id
            ? "bg-blue-100 border-blue-300"
            : "hover:bg-gray-50 border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold text-gray-800">{b.name}</div>
            <div className="text-sm text-gray-500">{b.loan_type}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-green-700">
              ${b.amount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 uppercase">{b.status}</div>
          </div>
        </div>
      </div>
    ));

  return (
    <Card>
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-gray-100 rounded-lg p-1 mb-4">
          <TabsTrigger
            value="new"
            className="data-[state=active]:bg-white data-[state=active]:shadow text-sm font-medium"
          >
            New
          </TabsTrigger>
          <TabsTrigger
            value="in_review"
            className="data-[state=active]:bg-white data-[state=active]:shadow text-sm font-medium"
          >
            In Review
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-white data-[state=active]:shadow text-sm font-medium"
          >
            Approved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          {pipeline.new.length ? (
            renderBorrowers(pipeline.new)
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No new borrowers
            </div>
          )}
        </TabsContent>

        <TabsContent value="in_review">
          {pipeline.in_review.length ? (
            renderBorrowers(pipeline.in_review)
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No borrowers under review
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          {pipeline.approved.length ? (
            renderBorrowers(pipeline.approved)
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No approved borrowers
            </div>
          )}
        </TabsContent>

        {/* Optional Section */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
            F-Sanitised Active
          </h3>
          {/* Add ShadCN RadioGroup here if needed */}
          <div className="text-sm text-gray-400 italic">
            (This section is reserved for future enhancements.)
          </div>
        </div>
      </Tabs>
    </Card>
  );
}
