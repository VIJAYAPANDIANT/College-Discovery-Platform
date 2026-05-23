"use client";

import React from "react";
import Link from "next/link";
import { College } from "@/types";
import { useSavedStore } from "@/store/savedStore";
import { useCompareStore } from "@/store/compareStore";
import { useToastStore } from "@/store/toastStore";
import { formatCurrency } from "@/lib/utils";
import { Star, MapPin, GraduationCap, Calendar, DollarSign, ArrowRight, Bookmark } from "lucide-react";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { savedIds, toggleSaved } = useSavedStore();
  const { compareIds, toggleCompare } = useCompareStore();
  const { addToast } = useToastStore();

  const isBookmarked = savedIds.includes(college.id);
  const isComparing = compareIds.includes(college.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(college.id);
    addToast(
      isBookmarked
        ? `${college.name} removed from bookmarks`
        : `${college.name} saved to bookmarks`,
      "success"
    );
  };

  const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const result = toggleCompare(college.id);
    if (result.action === "added") {
      addToast(`${college.name} added to comparison`, "success");
    } else if (result.action === "removed") {
      addToast(`${college.name} removed from comparison`, "info");
    } else if (result.action === "none") {
      addToast("You can compare a maximum of 3 colleges side-by-side", "error");
    }
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover-card-effect h-full">
      {/* Banner / Card Header */}
      <div className="relative h-44 w-full overflow-hidden">
        {/* Banner image with zoom on hover */}
        <img
          src={college.bannerImage}
          alt={college.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Rank Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
          Rank #{college.rank}
        </div>

        {/* Save/Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition ${
            isBookmarked
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-white/80 hover:bg-white text-slate-700 dark:bg-slate-950/80 dark:hover:bg-slate-950 dark:text-slate-300"
          }`}
          aria-label={isBookmarked ? "Unsave college" : "Save college"}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
        </button>

        {/* Floating Logo */}
        <div className="absolute -bottom-6 left-6 h-12 w-12 rounded-xl border-2 border-white dark:border-slate-900 overflow-hidden bg-white shadow-md flex items-center justify-center">
          <img src={college.logo} alt={college.name} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* College Info Body */}
      <div className="flex-grow p-6 pt-8 flex flex-col">
        {/* Type & Rating Row */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
          <span className="px-2 py-0.5 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-850">
            {college.type}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-slate-700 dark:text-slate-300 font-bold">{college.rating}</span>
            <span>({college.reviewsCount ?? college.reviews?.length ?? 0})</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/colleges/${college.id}`} className="group/title block mb-2">
          <h3 className="text-base font-bold text-slate-850 dark:text-white line-clamp-1 group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-400 transition">
            {college.name}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <span>{college.location}</span>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl mb-4 border border-slate-100 dark:border-slate-850 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-400 dark:text-slate-500 font-medium">Est. Tuition</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {formatCurrency(college.feesPerYear)}/yr
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-400 dark:text-slate-500 font-medium">Avg Placement</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {college.placementRate}% ({formatCurrency(college.avgPackage)})
            </span>
          </div>
        </div>

        {/* Actions Row (Compare & View) */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-4">
          {/* Compare Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isComparing}
              onChange={handleCompareChange}
              className="h-4.5 w-4.5 rounded border-slate-350 text-indigo-600 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 transition cursor-pointer"
            />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Compare</span>
          </label>

          {/* View Details Link */}
          <Link
            href={`/colleges/${college.id}`}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-750 dark:text-indigo-400 dark:hover:text-indigo-350 transition group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
