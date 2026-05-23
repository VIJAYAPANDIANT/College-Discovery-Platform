"use client";

import React, { useEffect, useState } from "react";
import { CollegeFilters } from "@/types";
import { useLocations } from "@/hooks/useColleges";
import { SlidersHorizontal, MapPin, DollarSign, Star, School, X, RotateCcw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface FilterPanelProps {
  filters: CollegeFilters;
  onFilterChange: (newFilters: Partial<CollegeFilters>) => void;
  onReset: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  isOpen = false,
  onClose,
}: FilterPanelProps) {
  const { data: locations = [] } = useLocations();
  const [localMaxFees, setLocalMaxFees] = useState(filters.maxFees);

  // Synchronize local state with prop updates
  useEffect(() => {
    setLocalMaxFees(filters.maxFees);
  }, [filters.maxFees]);

  const handleLocationToggle = (location: string) => {
    const isChecked = filters.location.includes(location);
    const newLocation = isChecked
      ? filters.location.filter((loc) => loc !== location)
      : [...filters.location, location];
    onFilterChange({ location: newLocation, page: 1 });
  };

  const handleTypeToggle = (type: "Public" | "Private") => {
    const isChecked = filters.type.includes(type);
    const newType = isChecked
      ? filters.type.filter((t) => t !== type)
      : [...filters.type, type];
    onFilterChange({ type: newType, page: 1 });
  };

  const handleFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalMaxFees(val);
  };

  const handleFeesMouseUpOrTouchEnd = () => {
    onFilterChange({ maxFees: localMaxFees, page: 1 });
  };

  const handleRatingSelect = (rating: number) => {
    onFilterChange({ minRating: rating === filters.minRating ? 0 : rating, page: 1 });
  };

  const content = (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* College Type */}
      <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <School className="h-3.5 w-3.5" />
          <span>Institution Type</span>
        </h4>
        <div className="space-y-2">
          {(["Public", "Private"] as const).map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-650 dark:text-slate-350 select-none">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => handleTypeToggle(type)}
                className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 transition cursor-pointer"
              />
              <span>{type} University</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fees Range Slider */}
      <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5" />
          <span>Annual Tuition Fees</span>
        </h4>
        <div className="space-y-2">
          <input
            type="range"
            min={30000}
            max={80000}
            step={1000}
            value={localMaxFees}
            onChange={handleFeesChange}
            onMouseUp={handleFeesMouseUpOrTouchEnd}
            onTouchEnd={handleFeesMouseUpOrTouchEnd}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
          />
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>{formatCurrency(30000)}</span>
            <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
              Up to {formatCurrency(localMaxFees)}
            </span>
            <span>{formatCurrency(80000)}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5" />
          <span>Minimum Rating</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {[4.9, 4.8, 4.7, 4.6].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                onClick={() => handleRatingSelect(rating)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-355"
                }`}
              >
                <Star className={`h-3 w-3 ${isSelected ? "fill-white" : "fill-amber-400 text-amber-400"}`} />
                <span>{rating}+</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Locations */}
      <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>Campus Location</span>
        </h4>
        <div className="max-h-56 overflow-y-auto space-y-2 pr-2">
          {locations.length > 0 ? (
            locations.map((loc) => (
              <label key={loc} className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-650 dark:text-slate-355 select-none">
                <input
                  type="checkbox"
                  checked={filters.location.includes(loc)}
                  onChange={() => handleLocationToggle(loc)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 transition cursor-pointer"
                />
                <span className="truncate">{loc}</span>
              </label>
            ))
          ) : (
            <span className="text-xs text-slate-450 italic">No locations found</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Panel */}
      <div className="hidden lg:block w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24 self-start h-auto">
        {content}
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        />
        {/* Drawer Body */}
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-slate-900 border-t border-slate-250 dark:border-slate-800 rounded-t-3xl p-6 overflow-y-auto shadow-2xl transition-transform duration-300 transform ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full transition"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mt-2">{content}</div>
        </div>
      </div>
    </>
  );
}
