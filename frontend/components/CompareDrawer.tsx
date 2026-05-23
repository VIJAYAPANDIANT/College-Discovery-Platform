"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompareStore } from "@/store/compareStore";
import { useToastStore } from "@/store/toastStore";
import { MOCK_COLLEGES } from "@/lib/data";
import { GitCompare, X, Trash2, ArrowRight } from "lucide-react";

export default function CompareDrawer() {
  const pathname = usePathname();
  const { compareIds, removeCollege, clearCompare } = useCompareStore();
  const { addToast } = useToastStore();

  // Don't show drawer if on compare page itself or no colleges are selected
  if (pathname === "/compare" || compareIds.length === 0) {
    return null;
  }

  // Get full college info for compared IDs
  const comparedColleges = MOCK_COLLEGES.filter((c) => compareIds.includes(c.id));

  const handleRemove = (id: string, name: string) => {
    removeCollege(id);
    addToast(`${name} removed from comparison`, "info");
  };

  const handleClearAll = () => {
    clearCompare();
    addToast("Comparison tray cleared", "info");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md transition-all duration-300 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Summary Info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <GitCompare className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-250">
              Comparing Colleges
            </h4>
            <p className="text-xs text-slate-500">
              Select up to 3 colleges to compare side-by-side
            </p>
          </div>
        </div>

        {/* Center: Selected Cards list */}
        <div className="flex flex-wrap items-center gap-3 justify-center">
          {comparedColleges.map((college) => (
            <div
              key={college.id}
              className="flex items-center gap-2 py-1.5 pl-2 pr-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xs transition hover:border-slate-350 dark:hover:border-slate-700 group relative"
            >
              <div className="h-6 w-6 rounded bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img src={college.logo} alt={college.name} className="h-full w-full object-cover" />
              </div>
              <span className="text-xs font-bold text-slate-750 dark:text-slate-300 truncate max-w-[120px]">
                {college.name}
              </span>
              <button
                onClick={() => handleRemove(college.id, college.name)}
                className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-850 text-slate-400 hover:text-red-500 rounded transition"
                aria-label={`Remove ${college.name} from comparison`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          {/* Slot Placeholders */}
          {Array.from({ length: 3 - comparedColleges.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="hidden sm:flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-[10px] font-bold text-slate-400 tracking-wide select-none"
            >
              + Add College
            </div>
          ))}
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
          
          <Link
            href="/compare"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition group"
          >
            <span>Compare Now</span>
            <span className="bg-indigo-750 px-1.5 py-0.5 rounded text-[10px] text-white">
              {comparedColleges.length}
            </span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
