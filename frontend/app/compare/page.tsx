"use client";

import React from "react";
import Link from "next/link";
import { useCompareStore } from "@/store/compareStore";
import { useToastStore } from "@/store/toastStore";
import { MOCK_COLLEGES } from "@/lib/data";
import CompareTable from "@/components/CompareTable";
import EmptyState from "@/components/EmptyState";
import { GitCompare, ArrowLeft, Trash2 } from "lucide-react";

export default function ComparePage() {
  const { compareIds, removeCollege, clearCompare } = useCompareStore();
  const { addToast } = useToastStore();

  // Get full college objects
  const comparedColleges = MOCK_COLLEGES.filter((c) => compareIds.includes(c.id));

  const handleRemove = (id: string) => {
    // Find name for toast
    const college = MOCK_COLLEGES.find((c) => c.id === id);
    removeCollege(id);
    addToast(`${college?.name || "College"} removed from comparison`, "info");
  };

  const handleClearAll = () => {
    clearCompare();
    addToast("Comparison table cleared", "info");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow flex flex-col">
      {/* Header Back Button */}
      <div className="mb-6">
        <Link
          href="/colleges"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-650 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* Main Title Row */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white flex items-center gap-2.5">
            <GitCompare className="h-7 w-7 text-indigo-500" />
            <span>Compare Campuses</span>
          </h1>
          <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
            Analyze admission requirements, placement records, tuition fees, and campus life side-by-side
          </p>
        </div>

        {comparedColleges.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-50/50 border border-red-200 dark:border-red-950/20 rounded-xl text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Table</span>
          </button>
        )}
      </div>

      {/* Compare Layout Content */}
      <div className="flex-grow flex flex-col">
        {comparedColleges.length === 0 ? (
          <EmptyState
            title="Comparison is Empty"
            description="You haven't selected any colleges to compare. Browse our directory and select up to 3 colleges to compare tuition costs, student reviews, and careers side-by-side."
            actionText="Explore Colleges"
            onAction={() => window.location.href = "/colleges"}
            icon={<GitCompare className="h-8 w-8 text-indigo-500" />}
          />
        ) : (
          <div className="flex-grow space-y-6">
            {/* Summary info card */}
            <div className="p-4 bg-indigo-50/40 border border-indigo-150 rounded-2xl dark:bg-indigo-950/10 dark:border-indigo-900 text-xs font-bold text-indigo-650 dark:text-indigo-400">
              ⚡ Highlight helper enabled: The table automatically marks top-performing metrics (e.g. lowest tuition fees, highest package placements) in rows.
            </div>

            {/* Compare Table */}
            <CompareTable colleges={comparedColleges} onRemove={handleRemove} />
          </div>
        )}
      </div>
    </div>
  );
}
