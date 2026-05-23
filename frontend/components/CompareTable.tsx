"use client";

import React from "react";
import Link from "next/link";
import { College } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Star, MapPin, ExternalLink, Trash2, ShieldCheck, DollarSign, Award, Percent, Calendar } from "lucide-react";

interface CompareTableProps {
  colleges: College[];
  onRemove: (id: string) => void;
}

export default function CompareTable({ colleges, onRemove }: CompareTableProps) {
  if (colleges.length === 0) {
    return null;
  }

  // Find best value in each category to highlight
  const bestRank = Math.min(...colleges.map((c) => c.rank));
  const bestRating = Math.max(...colleges.map((c) => c.rating));
  const minFees = Math.min(...colleges.map((c) => c.feesPerYear));
  const maxPlacement = Math.max(...colleges.map((c) => c.placementRate));
  const maxPackage = Math.max(...colleges.map((c) => c.avgPackage));

  // Extract all unique amenities across compared colleges
  const allAmenities = Array.from(
    new Set(colleges.reduce<string[]>((acc, c) => [...acc, ...c.amenities], []))
  );

  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {/* Attribute Column header */}
            <th className="p-6 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider min-w-[200px] bg-slate-50/50 dark:bg-slate-900/50">
              Feature Comparison
            </th>
            {colleges.map((college) => (
              <th
                key={college.id}
                className="p-6 min-w-[250px] border-l border-slate-200 dark:border-slate-800 align-top relative group"
              >
                {/* Remove button */}
                <button
                  onClick={() => onRemove(college.id)}
                  className="absolute top-4 right-4 p-1.5 text-slate-450 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg transition"
                  title="Remove from comparison"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="flex flex-col gap-3">
                  <div className="h-14 w-full flex items-center gap-3">
                    <img
                      src={college.logo}
                      alt={college.name}
                      className="h-12 w-12 rounded-xl object-cover border border-slate-150 dark:border-slate-800 bg-white"
                    />
                    <div className="truncate">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                        Rank #{college.rank}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">{college.type}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/colleges/${college.id}`}
                    className="text-base font-bold text-slate-850 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition line-clamp-2"
                  >
                    {college.name}
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{college.location}</span>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm font-medium">
          {/* Rank Row */}
          <tr>
            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/30 dark:bg-slate-900/30">
              National Rank
            </td>
            {colleges.map((c) => {
              const isBest = c.rank === bestRank;
              return (
                <td
                  key={c.id}
                  className={`p-4 border-l border-slate-200 dark:border-slate-800 ${
                    isBest ? "bg-indigo-50/20 dark:bg-indigo-950/10 font-bold" : "text-slate-700 dark:text-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Award className={`h-4 w-4 ${isBest ? "text-indigo-500" : "text-slate-405"}`} />
                    <span>#{c.rank}</span>
                    {isBest && (
                      <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-md font-bold uppercase tracking-wider scale-90">
                        Best
                      </span>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Rating Row */}
          <tr>
            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/30 dark:bg-slate-900/30">
              Rating & Reviews
            </td>
            {colleges.map((c) => {
              const isBest = c.rating === bestRating;
              return (
                <td
                  key={c.id}
                  className={`p-4 border-l border-slate-200 dark:border-slate-800 ${
                    isBest ? "bg-indigo-50/20 dark:bg-indigo-950/10 font-bold" : "text-slate-700 dark:text-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{c.rating} / 5</span>
                    <span className="text-slate-400 text-xs font-normal">({c.reviewsCount} reviews)</span>
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Tuition Fees Row */}
          <tr>
            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/30 dark:bg-slate-900/30">
              Est. Annual Tuition
            </td>
            {colleges.map((c) => {
              const isBest = c.feesPerYear === minFees;
              return (
                <td
                  key={c.id}
                  className={`p-4 border-l border-slate-200 dark:border-slate-800 ${
                    isBest ? "bg-indigo-50/20 dark:bg-indigo-950/10 font-bold" : "text-slate-700 dark:text-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <DollarSign className={`h-4 w-4 ${isBest ? "text-indigo-500" : "text-slate-405"}`} />
                    <span>{formatCurrency(c.feesPerYear)}</span>
                    {isBest && (
                      <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-md font-bold uppercase tracking-wider scale-90">
                        Lowest
                      </span>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Placement Rate Row */}
          <tr>
            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/30 dark:bg-slate-900/30">
              Placement Rate
            </td>
            {colleges.map((c) => {
              const isBest = c.placementRate === maxPlacement;
              return (
                <td
                  key={c.id}
                  className={`p-4 border-l border-slate-200 dark:border-slate-800 ${
                    isBest ? "bg-indigo-50/20 dark:bg-indigo-950/10 font-bold" : "text-slate-700 dark:text-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Percent className={`h-4 w-4 ${isBest ? "text-indigo-500" : "text-slate-405"}`} />
                    <span>{c.placementRate}%</span>
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Average Package Row */}
          <tr>
            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/30 dark:bg-slate-900/30">
              Avg. Placement Package
            </td>
            {colleges.map((c) => {
              const isBest = c.avgPackage === maxPackage;
              return (
                <td
                  key={c.id}
                  className={`p-4 border-l border-slate-200 dark:border-slate-800 ${
                    isBest ? "bg-indigo-50/20 dark:bg-indigo-950/10 font-bold" : "text-slate-700 dark:text-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{formatCurrency(c.avgPackage)} / yr</span>
                    {isBest && (
                      <span className="text-[10px] bg-indigo-650 text-white px-1.5 py-0.2 rounded-md font-bold uppercase tracking-wider scale-90">
                        Highest
                      </span>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Established Year Row */}
          <tr>
            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/30 dark:bg-slate-900/30">
              Established Year
            </td>
            {colleges.map((c) => (
              <td key={c.id} className="p-4 text-slate-700 dark:text-slate-350 border-l border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>{c.established} ({new Date().getFullYear() - c.established} years ago)</span>
                </div>
              </td>
            ))}
          </tr>

          {/* Amenities Comparison */}
          <tr>
            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/30 dark:bg-slate-900/30">
              Amenities
            </td>
            {colleges.map((c) => (
              <td key={c.id} className="p-4 text-slate-700 dark:text-slate-350 border-l border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {c.amenities.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* Link Action Row */}
          <tr>
            <td className="p-6 pl-6 bg-slate-50/30 dark:bg-slate-900/30"></td>
            {colleges.map((c) => (
              <td key={c.id} className="p-6 border-l border-slate-200 dark:border-slate-800">
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/colleges/${c.id}`}
                    className="w-full py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                  >
                    View Campus Profile
                  </Link>
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-center border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-750 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
