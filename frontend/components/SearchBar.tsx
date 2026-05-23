"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, GraduationCap, X, ChevronRight } from "lucide-react";
import { MOCK_COLLEGES } from "@/lib/data";
import { College } from "@/types";

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  onSearchChange?: (val: string) => void;
}

export default function SearchBar({
  placeholder = "Search by college name, city, course...",
  initialValue = "",
  onSearchChange,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    colleges: College[];
    locations: string[];
  }>({ colleges: [], locations: [] });

  const containerRef = useRef<HTMLDivElement>(null);

  // Update query when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions({ colleges: [], locations: [] });
      return;
    }

    const searchLower = query.toLowerCase();

    // Filter colleges matching name or description
    const matchedColleges = MOCK_COLLEGES.filter(
      (c) =>
        c.name.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower)
    ).slice(0, 4);

    // Filter unique locations matching search
    const allLocations = Array.from(new Set(MOCK_COLLEGES.map((c) => c.location)));
    const matchedLocations = allLocations
      .filter((loc) => loc.toLowerCase().includes(searchLower))
      .slice(0, 3);

    setSuggestions({
      colleges: matchedColleges,
      locations: matchedLocations,
    });
  }, [query]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setShowSuggestions(false);
    
    if (onSearchChange) {
      onSearchChange(query);
    } else {
      const searchParams = new URLSearchParams();
      if (query.trim()) {
        searchParams.set("search", query.trim());
      }
      router.push(`/colleges?${searchParams.toString()}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    if (onSearchChange) onSearchChange("");
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-30">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center bg-white dark:bg-slate-900 border-2 border-slate-200 focus-within:border-indigo-500 dark:border-slate-800 dark:focus-within:border-indigo-500 rounded-2xl shadow-lg shadow-slate-100 dark:shadow-none transition duration-200 overflow-hidden">
          <Search className="absolute left-4 text-slate-400 h-5 w-5 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 text-slate-800 dark:text-slate-100 placeholder-slate-400 bg-transparent focus:outline-none text-base font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full transition"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Autocomplete Suggestions Panel */}
      {showSuggestions && (query.trim() !== "") && (suggestions.colleges.length > 0 || suggestions.locations.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden max-h-[400px] overflow-y-auto backdrop-blur-lg">
          {/* Location suggestions */}
          {suggestions.locations.length > 0 && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-850">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-3 tracking-wider">Locations</span>
              <div className="mt-1 space-y-0.5">
                {suggestions.locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setQuery(loc);
                      setShowSuggestions(false);
                      if (onSearchChange) {
                        onSearchChange(loc);
                      } else {
                        router.push(`/colleges?location=${encodeURIComponent(loc)}`);
                      }
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left transition font-medium"
                  >
                    <MapPin className="h-4 w-4 text-indigo-500" />
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* College suggestions */}
          {suggestions.colleges.length > 0 && (
            <div className="p-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-3 tracking-wider">Colleges</span>
              <div className="mt-1 space-y-0.5">
                {suggestions.colleges.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => {
                      setShowSuggestions(false);
                      router.push(`/colleges/${college.id}`);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left transition"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <GraduationCap className="h-4 w-4 text-violet-500 flex-shrink-0" />
                      <span className="font-medium truncate">{college.name}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0">({college.location})</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
