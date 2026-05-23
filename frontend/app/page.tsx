"use client";

import React from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CollegeCard from "@/components/CollegeCard";
import { MOCK_COLLEGES } from "@/lib/data";
import { GraduationCap, ArrowRight, Shield, Award, Landmark, Users } from "lucide-react";

export default function HomePage() {
  // Get featured colleges
  const featuredColleges = MOCK_COLLEGES.filter((c) => c.featured).slice(0, 3);

  const categories = [
    { name: "Computer Science", count: "12+ Courses", icon: GraduationCap, href: "/colleges?search=computer" },
    { name: "Engineering", count: "8+ Courses", icon: Landmark, href: "/colleges?search=engineering" },
    { name: "Business (MBA)", count: "4+ Courses", icon: Award, href: "/colleges?search=business" },
    { name: "Physics & Science", count: "6+ Courses", icon: Users, href: "/colleges?search=physics" },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-slate-50 to-transparent dark:from-indigo-950/20 dark:via-slate-950 dark:to-transparent">
        {/* Background Blur Blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100 dark:border-indigo-950 animate-fade-in">
            🎓 Discover & Compare Higher Education
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mb-6 leading-tight">
            Find Your Dream Campus with <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">UniScope</span>
          </h1>
          
          <p className="text-lg text-slate-550 dark:text-slate-405 max-w-2xl mb-10 leading-relaxed font-medium">
            Explore top-tier universities, compare tuition fees side-by-side, check career placements, and read authentic reviews from fellow students.
          </p>

          {/* Integrated Autocomplete Search */}
          <SearchBar />

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm">
            <span className="text-slate-400 dark:text-slate-500 font-semibold">Popular:</span>
            {["MIT", "Stanford", "Harvard", "Oxford"].map((term) => (
              <Link
                key={term}
                href={`/colleges?search=${term}`}
                className="px-3 py-1 bg-white hover:bg-indigo-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-600 dark:text-slate-350 text-xs font-bold transition"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Top-tier Universities", val: "50+" },
              { label: "Verified Reviews", val: "1.2k+" },
              { label: "Avg. Placement Rate", val: "94.5%" },
              { label: "Highest Package", val: "$122k/yr" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-650 to-violet-650 bg-clip-text text-transparent">
                  {stat.val}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white">
              Explore Popular Streams
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Find top programs categorized by educational discipline
            </p>
          </div>
          <Link
            href="/colleges"
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-750 dark:text-indigo-400 dark:hover:text-indigo-350 transition group"
          >
            <span>See All Colleges</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={i}
                href={cat.href}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-900 hover:shadow-lg hover:shadow-indigo-500/5 transition duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">{cat.count}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Colleges Grid */}
      <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white">
                Featured Universities
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Highest ranked universities recommended by UniScope experts
              </p>
            </div>
            <Link
              href="/colleges"
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-750 dark:text-indigo-400 dark:hover:text-indigo-350 transition group"
            >
              <span>View Directory</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredColleges.map((college) => (
              <div key={college.id}>
                <CollegeCard college={college} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why UniScope (Value Prop) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white">
            Why Use UniScope?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            We simplify the complex search for your college path
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Side-by-Side Comparison",
              desc: "Select up to 3 colleges to compare tuition fees, ranking, average placement packages, and campus amenities instantly.",
              icon: Landmark,
            },
            {
              title: "Verified Placements & Fees",
              desc: "Get real data regarding annual tuition structures and verified placement rates so you can evaluate true ROI.",
              icon: Shield,
            },
            {
              title: "Authentic Reviews",
              desc: "Read direct feedback from enrolled alumni and current students to understand campus life, housing, and coursework.",
              icon: Award,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center text-center shadow-sm"
              >
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
