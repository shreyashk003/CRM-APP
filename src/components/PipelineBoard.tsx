"use client";

import React from "react";

const STAGES = ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

export default function PipelineBoard({ deals }: { deals: any[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar">
      {STAGES.map((stage) => {
        // Match deals to stages (handling case sensitivity)
        const stageDeals = deals.filter(
          (d) => d.stage?.toLowerCase() === stage.toLowerCase()
        );
        
        return (
          <div key={stage} className="flex-shrink-0 w-72 bg-gray-50/50 rounded-xl p-3 border border-gray-100">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">{stage}</h3>
              <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                {stageDeals.length}
              </span>
            </div>

            <div className="space-y-3">
              {stageDeals.map((deal) => (
                <div key={deal._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-colors cursor-pointer group">
                  <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                    {deal.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      ${deal.value?.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {deal.companyId?.name || "No Company"}
                    </span>
                  </div>
                </div>
              ))}
              
              {stageDeals.length === 0 && (
                <div className="py-10 text-center border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-400 italic">No deals</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}