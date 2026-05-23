"use client";

import React from "react";
import Link from "next/link";
import { useSavedStore } from "@/store/savedStore";
import { useToastStore } from "@/store/toastStore";
import { MOCK_COLLEGES } from "@/lib/data";
import CollegeCard from "@/components/CollegeCard";
import EmptyState from "@/components/EmptyState";
import { Bookmark, ArrowLeft, Trash2 } from "lucide-react";

export default function SavedPage() {
  const { savedIds, clearSaved } = useSavedStore();
  const { addToast } = useToastStore();

  // Get full college details
  const bookmarkedColleges = MOCK_COLLEGES.filter((c) => savedIds.includes(c.id));

  const handleClearAll = () => {
    clearSaved();
    addToast("All bookmarks cleared successfully", "info");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow flex flex-col">
      {/* Header Back Link */}
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
            <Bookmark className="h-7 w-7 text-indigo-500 fill-indigo-500/10" />
            <span>Saved Campuses</span>
          </h1>
          <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
            Keep track of your favorite colleges, tuition costs, and admissions reviews in one place
          </p>
        </div>

        {bookmarkedColleges.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-50/50 border border-red-200 dark:border-red-950/20 rounded-xl text-xs font-bold text-red-600 hover:text-white hover:bg-red-650 hover:border-red-650 transition"
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove All Bookmarks</span>
          </button>
        )}
      </div>

      {/* Saved Colleges Content */}
      <div className="flex-grow flex flex-col">
        {bookmarkedColleges.length === 0 ? (
          <EmptyState
            title="No Saved Colleges"
            description="Your bookmarks are currently empty. Explore our extensive directory of universities and click the bookmark icon on any card to save it here for quick access later."
            actionText="Find Campuses"
            onAction={() => window.location.href = "/colleges"}
            icon={<Bookmark className="h-8 w-8 text-indigo-500" />}
          />
        ) : (
          <div className="space-y-6 flex-grow">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              You have pinned <span className="font-extrabold text-slate-800 dark:text-white">{bookmarkedColleges.length}</span>{" "}
              {bookmarkedColleges.length === 1 ? "university" : "universities"} to your shortlist.
            </div>

            {/* Grid list of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookmarkedColleges.map((college) => (
                <div key={college.id}>
                  <CollegeCard college={college} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
