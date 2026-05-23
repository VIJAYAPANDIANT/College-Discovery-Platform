"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useCollege, useAddReview } from "@/hooks/useColleges";
import { useSavedStore } from "@/store/savedStore";
import { useCompareStore } from "@/store/compareStore";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { formatCurrency } from "@/lib/utils";
import { DetailSkeleton } from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import {
  Star,
  MapPin,
  Bookmark,
  GitCompare,
  ExternalLink,
  GraduationCap,
  Calendar,
  School,
  TrendingUp,
  Award,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  Send,
  Building,
} from "lucide-react";

interface CollegeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { data: college, isLoading, isError, refetch } = useCollege(id);
  const addReviewMutation = useAddReview();

  const { savedIds, toggleSaved } = useSavedStore();
  const { compareIds, toggleCompare } = useCompareStore();
  const { user, isAuthenticated } = useAuthStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "reviews">("overview");

  // Review Form States
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !college) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorState
          title="Campus profile not found"
          message="We couldn't retrieve information for this college. Please make sure the link is correct or try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const isBookmarked = savedIds.includes(college.id);
  const isComparing = compareIds.includes(college.id);

  const handleBookmarkToggle = () => {
    toggleSaved(college.id);
    addToast(
      isBookmarked
        ? `${college.name} removed from bookmarks`
        : `${college.name} saved to bookmarks`,
      "success"
    );
  };

  const handleCompareToggle = () => {
    const result = toggleCompare(college.id);
    if (result.action === "added") {
      addToast(`${college.name} added to comparison`, "success");
    } else if (result.action === "removed") {
      addToast(`${college.name} removed from comparison`, "info");
    } else if (result.action === "none") {
      addToast("You can compare a maximum of 3 colleges side-by-side", "error");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewComment.trim()) {
      addToast("Please write a comment", "error");
      return;
    }

    const author = isAuthenticated && user ? user.name : reviewerName.trim() || "Anonymous Student";

    try {
      await addReviewMutation.mutateAsync({
        collegeId: college.id,
        review: {
          userName: author,
          rating: reviewRating,
          comment: reviewComment,
        },
      });

      addToast("Review submitted successfully!", "success");
      setReviewComment("");
      setReviewerName("");
      setReviewRating(5);
    } catch (err) {
      addToast("Failed to submit review", "error");
    }
  };

  return (
    <div className="w-full pb-20">
      {/* College Banner Header */}
      <div className="relative h-80 md:h-[450px] w-full overflow-hidden">
        <img
          src={college.bannerImage}
          alt={college.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Banner Content Container */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="space-y-4">
            {/* Breadcrumb / Category info */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-405">
              <span>UniScope Directory</span>
              <ChevronRight className="h-3 w-3 text-slate-500" />
              <span>{college.type} University</span>
            </div>

            <div className="flex items-start gap-4">
              {/* Logo thumbnail */}
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-white flex-shrink-0 flex items-center justify-center">
                <img src={college.logo} alt={college.name} className="h-full w-full object-cover" />
              </div>

              <div>
                <h1 className="text-xl md:text-4xl font-extrabold tracking-tight mb-2 max-w-2xl leading-tight">
                  {college.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-indigo-400" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-indigo-400" />
                    <span>Established {college.established}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{college.rating}</span>
                    <span>({college.reviewsCount ?? college.reviews?.length ?? 0} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Badges */}
          <div className="flex gap-3 text-center self-start md:self-end">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
              <div className="text-xs text-slate-350 font-bold uppercase">Rank</div>
              <div className="text-lg font-extrabold">#{college.rank}</div>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
              <div className="text-xs text-slate-350 font-bold uppercase">Placement</div>
              <div className="text-lg font-extrabold">{college.placementRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Tabs and Detailed Contents */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tab Navigation */}
          <div className="border-b border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto pb-px">
            {[
              { id: "overview", label: "Overview", icon: BookOpen },
              { id: "courses", label: "Courses & Fees", icon: GraduationCap },
              { id: "reviews", label: "Reviews", icon: MessageSquare, badge: college.reviewsCount ?? college.reviews?.length ?? 0 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 -mb-px transition ${
                    isSelected
                      ? "border-indigo-650 text-indigo-655 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-850 text-slate-500">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[300px]">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fade-in">
                {/* Description */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-850 dark:text-white mb-4">About the University</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {college.description}
                  </p>
                </div>

                {/* Campus Amenities Grid */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-850 dark:text-white mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-indigo-500" />
                    <span>Campus Facilities</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {college.amenities.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 text-xs font-bold text-slate-655 dark:text-slate-300"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Courses & Fees Tab */}
            {activeTab === "courses" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        <th className="p-4 pl-6 font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider text-xs">Course / Program</th>
                        <th className="p-4 font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider text-xs">Duration</th>
                        <th className="p-4 pr-6 font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider text-xs text-right">Annual Fees</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-semibold text-slate-700 dark:text-slate-300">
                      {college.courses.map((course, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition">
                          <td className="p-4 pl-6 max-w-sm truncate text-slate-850 dark:text-white font-bold flex items-center gap-2">
                            <GraduationCap className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0" />
                            <span>{course.name}</span>
                          </td>
                          <td className="p-4 font-semibold text-slate-500">{course.duration}</td>
                          <td className="p-4 pr-6 text-right font-bold text-slate-850 dark:text-slate-200">
                            {formatCurrency(course.fees)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-8 animate-fade-in">
                {/* Aggregated Score Box */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <div className="text-center md:border-r border-slate-100 dark:border-slate-850 py-2">
                    <div className="text-4xl md:text-5xl font-extrabold text-slate-850 dark:text-white">
                      {college.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4.5 w-4.5 ${
                            i < Math.floor(college.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-250 dark:text-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">Based on {college.reviewsCount ?? college.reviews?.length ?? 0} reviews</span>
                  </div>

                  {/* Visual Bar Breakdown (Mock) */}
                  <div className="md:col-span-2 space-y-2">
                    {[
                      { stars: 5, pct: "85%" },
                      { stars: 4, pct: "10%" },
                      { stars: 3, pct: "4%" },
                      { stars: 2, pct: "1%" },
                      { stars: 1, pct: "0%" },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                        <span className="w-12 text-right">{row.stars} Stars</span>
                        <div className="flex-grow h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full"
                            style={{ width: row.pct }}
                          />
                        </div>
                        <span className="w-10 text-slate-400">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Review Submission Form */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-850 dark:text-white mb-4 flex items-center gap-1.5">
                    <MessageSquare className="h-4.5 w-4.5 text-indigo-500" />
                    <span>Write a Student Review</span>
                  </h3>
                  
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {/* Star selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-550 dark:text-slate-400">Your Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            type="button"
                            key={val}
                            onClick={() => setReviewRating(val)}
                            className="p-1 hover:scale-110 transition"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                val <= reviewRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300 dark:text-slate-700"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review comment */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comment</label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your authentic experience on campus, classes, facilities, or social atmosphere..."
                        rows={4}
                        className="w-full p-3 bg-slate-50 focus:bg-white dark:bg-slate-950 focus:dark:bg-transparent border border-slate-200 dark:border-slate-850 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl focus:outline-none text-sm text-slate-850 dark:text-white font-medium placeholder-slate-400 transition resize-none"
                      />
                    </div>

                    {/* Reviewer name (if not authenticated) */}
                    {!isAuthenticated && (
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name (Optional)</label>
                        <input
                          type="text"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g., Jane Doe"
                          className="w-full p-3 bg-slate-50 focus:bg-white dark:bg-slate-950 focus:dark:bg-transparent border border-slate-200 dark:border-slate-850 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl focus:outline-none text-sm text-slate-850 dark:text-white font-medium placeholder-slate-400 transition"
                        />
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={addReviewMutation.isPending}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 transition"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{addReviewMutation.isPending ? "Submitting..." : "Submit Review"}</span>
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-850 dark:text-white mb-2">Student Testimonials</h3>
                  {college.reviews.length > 0 ? (
                    college.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-3"
                      >
                        <div className="flex justify-between items-center gap-4">
                          <div>
                            <span className="text-sm font-bold text-slate-850 dark:text-slate-200 block">
                              {rev.userName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-0.5 px-2 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-lg text-xs font-extrabold">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>{rev.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 italic text-slate-400 text-sm">
                      No student reviews yet. Be the first to share your thoughts!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Quick Stats and Sidebar Cards */}
        <div className="space-y-6">
          {/* Quick stats board */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider pb-4 border-b border-slate-100 dark:border-slate-850">
              Campus Overview
            </h3>

            <div className="space-y-4">
              {[
                {
                  label: "Tuition Fees",
                  value: `${formatCurrency(college.feesPerYear)} / year`,
                  icon: School,
                  subText: "Estimated cost of attendance",
                },
                {
                  label: "Placement Rate",
                  value: `${college.placementRate}%`,
                  icon: TrendingUp,
                  subText: `Average starting salary: ${formatCurrency(college.avgPackage)}`,
                },
                {
                  label: "National Rank",
                  value: `#${college.rank} globally`,
                  icon: Award,
                  subText: "Latest academic league standings",
                },
              ].map((row, i) => {
                const Icon = row.icon;
                return (
                  <div key={i} className="flex gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">{row.label}</div>
                      <div className="text-sm font-extrabold text-slate-800 dark:text-white">{row.value}</div>
                      <div className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold">{row.subText}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Action buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
              {/* Save */}
              <button
                onClick={handleBookmarkToggle}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${
                  isBookmarked
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "border-slate-205 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span>{isBookmarked ? "Bookmarked" : "Bookmark Campus"}</span>
              </button>

              {/* Compare */}
              <button
                onClick={handleCompareToggle}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${
                  isComparing
                    ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-600/10"
                    : "border-slate-205 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
                }`}
              >
                <GitCompare className="h-4 w-4" />
                <span>{isComparing ? "Comparing" : "Compare Side-by-Side"}</span>
              </button>

              {/* Visit Official site */}
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-205 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
