"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CollegeFilters } from "@/types";
import { useColleges } from "@/hooks/useColleges";
import FilterPanel from "@/components/FilterPanel";
import CollegeCard from "@/components/CollegeCard";
import { GridSkeleton } from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";

function CollegesDirectory() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse initial filters from URL
  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") ? [searchParams.get("location")!] : [];

  const [filters, setFilters] = useState<CollegeFilters>({
    search: initialSearch,
    location: initialLocation,
    type: [],
    minFees: 30000,
    maxFees: 80000,
    minRating: 0,
    sortBy: "rank",
    page: 1,
    limit: 6,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync search query when url changes
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const locationParam = searchParams.get("location");
    
    setFilters((prev) => ({
      ...prev,
      search,
      location: locationParam ? [locationParam] : prev.location,
      page: 1,
    }));
  }, [searchParams]);

  const { data, isLoading, isError, refetch } = useColleges(filters);

  const handleFilterChange = (newFilters: Partial<CollegeFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      location: [],
      type: [],
      minFees: 30000,
      maxFees: 80000,
      minRating: 0,
      sortBy: "rank",
      page: 1,
      limit: 6,
    });
    router.push("/colleges"); // clear URL params
  };

  const handleRemoveChip = (key: keyof CollegeFilters, value: any) => {
    if (key === "location") {
      handleFilterChange({ location: filters.location.filter((l) => l !== value), page: 1 });
    } else if (key === "type") {
      handleFilterChange({ type: filters.type.filter((t) => t !== value), page: 1 });
    } else if (key === "minRating") {
      handleFilterChange({ minRating: 0, page: 1 });
    }
  };

  const activeChipsCount =
    filters.location.length + filters.type.length + (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow flex flex-col">
      {/* Top Banner / Headline */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white">
            Browse Colleges
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover top-tier educational institutions across the globe
          </p>
        </div>

        {/* Sort and Mobile Filters */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm transition hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
            <span>Filters</span>
            {activeChipsCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-650 text-[10px] font-bold text-white">
                {activeChipsCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-600 dark:text-slate-405 shadow-sm">
            <ArrowUpDown className="h-4 w-4 text-indigo-500" />
            <span className="font-bold hidden sm:inline">Sort By:</span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleFilterChange({ sortBy: e.target.value as CollegeFilters["sortBy"], page: 1 })
              }
              className="bg-transparent font-semibold border-none focus:outline-none focus:ring-0 text-slate-850 dark:text-slate-200 cursor-pointer"
            >
              <option value="rank" className="dark:bg-slate-900">National Rank</option>
              <option value="rating" className="dark:bg-slate-900">Highest Rating</option>
              <option value="fees_asc" className="dark:bg-slate-900">Fees: Low to High</option>
              <option value="fees_desc" className="dark:bg-slate-900">Fees: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-8 items-start flex-grow">
        {/* Sidebar Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />

        {/* Listings display grid */}
        <div className="flex flex-col h-full">
          {/* Active Chips Row */}
          {activeChipsCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold mr-1">
                Active Filters:
              </span>
              
              {/* Location Chips */}
              {filters.location.map((loc) => (
                <div
                  key={loc}
                  className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50/70 border border-indigo-150 rounded-lg text-xs font-bold text-indigo-650 dark:bg-indigo-950/20 dark:border-indigo-900 dark:text-indigo-400"
                >
                  <span>{loc}</span>
                  <button
                    onClick={() => handleRemoveChip("location", loc)}
                    className="hover:opacity-70 p-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-950 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Type Chips */}
              {filters.type.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50/70 border border-indigo-150 rounded-lg text-xs font-bold text-indigo-650 dark:bg-indigo-950/20 dark:border-indigo-900 dark:text-indigo-400"
                >
                  <span>{t}</span>
                  <button
                    onClick={() => handleRemoveChip("type", t)}
                    className="hover:opacity-70 p-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-950 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Rating Chip */}
              {filters.minRating > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50/70 border border-indigo-150 rounded-lg text-xs font-bold text-indigo-650 dark:bg-indigo-950/20 dark:border-indigo-900 dark:text-indigo-400">
                  <span>Rating {filters.minRating}+</span>
                  <button
                    onClick={() => handleRemoveChip("minRating", null)}
                    className="hover:opacity-70 p-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-950 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Clear All Link */}
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Search Term Info */}
          {filters.search && (
            <p className="text-sm text-slate-500 mb-6 font-medium">
              Showing results for &ldquo;<span className="font-bold text-slate-805 dark:text-indigo-400">{filters.search}</span>&rdquo;
            </p>
          )}

          {/* Listing Grid */}
          <div className="flex-grow">
            {isLoading ? (
              <GridSkeleton />
            ) : isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : !data || data.colleges.length === 0 ? (
              <EmptyState
                title="No Colleges Found"
                description="We couldn't find any colleges matching your active selection criteria. Try clearing some filters to broaden your search."
                actionText="Reset Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.colleges.map((college) => (
                  <div key={college.id} className="h-full">
                    <CollegeCard college={college} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {data && data.pagesCount > 1 && (
            <div className="mt-12 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
              <button
                onClick={() => handleFilterChange({ page: Math.max(1, filters.page - 1) })}
                disabled={filters.page === 1}
                className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: data.pagesCount }).map((_, i) => {
                  const pNum = i + 1;
                  const isCurrent = pNum === filters.page;
                  return (
                    <button
                      key={pNum}
                      onClick={() => handleFilterChange({ page: pNum })}
                      className={`h-9 w-9 flex items-center justify-center rounded-lg text-xs font-bold transition ${
                        isCurrent
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                          : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>

              {/* Mobile page display info */}
              <span className="sm:hidden text-xs font-bold text-slate-500">
                Page {filters.page} of {data.pagesCount}
              </span>

              <button
                onClick={() =>
                  handleFilterChange({ page: Math.min(data.pagesCount, filters.page + 1) })
                }
                disabled={filters.page === data.pagesCount}
                className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <GridSkeleton count={6} />
      </div>
    }>
      <CollegesDirectory />
    </Suspense>
  );
}
