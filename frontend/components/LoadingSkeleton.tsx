import React from "react";

export function CardSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden h-[420px] animate-pulse">
      {/* Banner */}
      <div className="h-44 bg-slate-200 dark:bg-slate-800 w-full" />
      
      {/* Body */}
      <div className="p-6 flex-grow flex flex-col gap-4">
        {/* Rating row */}
        <div className="flex justify-between items-center">
          <div className="h-5 bg-slate-200 dark:bg-slate-850 rounded w-16" />
          <div className="h-5 bg-slate-200 dark:bg-slate-850 rounded w-12" />
        </div>
        
        {/* Title */}
        <div className="h-6 bg-slate-200 dark:bg-slate-850 rounded w-3/4" />
        
        {/* Location */}
        <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded w-1/2" />
        
        {/* Stats grid */}
        <div className="h-16 bg-slate-100 dark:bg-slate-900/60 rounded-xl" />
        
        {/* Footer row */}
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-850">
          <div className="h-5 bg-slate-200 dark:bg-slate-850 rounded w-16" />
          <div className="h-5 bg-slate-200 dark:bg-slate-850 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse w-full">
      {/* Full-width banner skeleton */}
      <div className="h-96 bg-slate-200 dark:bg-slate-800 w-full" />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-slate-200 dark:bg-slate-850 rounded-2xl" />
            <div className="space-y-2 flex-grow">
              <div className="h-8 bg-slate-200 dark:bg-slate-850 rounded w-1/2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded w-1/4" />
            </div>
          </div>
          
          <div className="h-40 bg-slate-200 dark:bg-slate-850 rounded-2xl" />
          <div className="h-60 bg-slate-200 dark:bg-slate-850 rounded-2xl" />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="h-80 bg-slate-200 dark:bg-slate-850 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
