import { College, CollegeFilters, Review, User } from "@/types";
import { MOCK_COLLEGES } from "./data";

const IS_SERVER = typeof window === "undefined";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "mock";

// Helper to interact with local storage database
function getLocalColleges(): College[] {
  if (IS_SERVER) return MOCK_COLLEGES;
  
  const stored = localStorage.getItem("colleges_data");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Overwrite if length is different or if the old broken images are found
      const hasBrokenImages = stored.includes("photo-1523050854058-8df90110c9f1") || stored.includes("photo-1548625361-155deee223d0");
      if (parsed.length === MOCK_COLLEGES.length && !hasBrokenImages) {
        return parsed;
      }
    } catch (e) {
      // Fallback to overwrite
    }
  }
  
  localStorage.setItem("colleges_data", JSON.stringify(MOCK_COLLEGES));
  return MOCK_COLLEGES;
}

function saveLocalColleges(colleges: College[]) {
  if (!IS_SERVER) {
    localStorage.setItem("colleges_data", JSON.stringify(colleges));
  }
}

// Simulated network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  getColleges: async (filters: Partial<CollegeFilters>): Promise<{ colleges: College[]; total: number; pagesCount: number }> => {
    await delay(600); // realistic network delay

    if (API_URL !== "mock") {
      // Connect with actual backend API if configured
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.set("search", filters.search);
      if (filters.minFees) queryParams.set("minFees", String(filters.minFees));
      if (filters.maxFees) queryParams.set("maxFees", String(filters.maxFees));
      if (filters.minRating) queryParams.set("minRating", String(filters.minRating));
      if (filters.sortBy) queryParams.set("sortBy", filters.sortBy);
      if (filters.page) queryParams.set("page", String(filters.page));
      if (filters.limit) queryParams.set("limit", String(filters.limit));
      if (filters.location?.length) queryParams.set("location", filters.location.join(","));
      if (filters.type?.length) queryParams.set("type", filters.type.join(","));

      const res = await fetch(`${API_URL}/colleges?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch colleges");
      return res.json();
    }

    // Mock Implementation
    let colleges = [...getLocalColleges()];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      colleges = colleges.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.location.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      colleges = colleges.filter((c) =>
        filters.location!.some((loc) => c.location.toLowerCase().includes(loc.toLowerCase()))
      );
    }

    // Type filter
    if (filters.type && filters.type.length > 0) {
      colleges = colleges.filter((c) => filters.type!.includes(c.type));
    }

    // Fees filter
    if (filters.minFees !== undefined) {
      colleges = colleges.filter((c) => c.feesPerYear >= filters.minFees!);
    }
    if (filters.maxFees !== undefined) {
      colleges = colleges.filter((c) => c.feesPerYear <= filters.maxFees!);
    }

    // Rating filter
    if (filters.minRating !== undefined) {
      colleges = colleges.filter((c) => c.rating >= filters.minRating!);
    }

    // Sorting
    const sortBy = filters.sortBy || "rank";
    if (sortBy === "rank") {
      colleges.sort((a, b) => a.rank - b.rank);
    } else if (sortBy === "fees_asc") {
      colleges.sort((a, b) => a.feesPerYear - b.feesPerYear);
    } else if (sortBy === "fees_desc") {
      colleges.sort((a, b) => b.feesPerYear - a.feesPerYear);
    } else if (sortBy === "rating") {
      colleges.sort((a, b) => b.rating - a.rating);
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 6;
    const total = colleges.length;
    const pagesCount = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedColleges = colleges.slice(offset, offset + limit);

    return {
      colleges: paginatedColleges,
      total,
      pagesCount,
    };
  },

  getCollegeById: async (id: string): Promise<College> => {
    await delay(400);

    if (API_URL !== "mock") {
      const res = await fetch(`${API_URL}/colleges/${id}`);
      if (!res.ok) throw new Error("College not found");
      return res.json();
    }

    const colleges = getLocalColleges();
    const college = colleges.find((c) => c.id === id);
    if (!college) throw new Error("College not found");
    return college;
  },

  addReview: async (collegeId: string, review: Omit<Review, "id" | "date">): Promise<Review> => {
    await delay(500);

    const newReview: Review = {
      id: "rev_" + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split("T")[0],
      ...review,
    };

    if (API_URL !== "mock") {
      const res = await fetch(`${API_URL}/colleges/${collegeId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      return res.json();
    }

    const colleges = getLocalColleges();
    const index = colleges.findIndex((c) => c.id === collegeId);
    if (index === -1) throw new Error("College not found");

    const college = colleges[index];
    const updatedReviews = [newReview, ...college.reviews];
    const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Number((totalRating / updatedReviews.length).toFixed(1));

    colleges[index] = {
      ...college,
      reviews: updatedReviews,
      reviewsCount: updatedReviews.length,
      rating: avgRating,
    };

    saveLocalColleges(colleges);
    return newReview;
  },

  getLocations: async (): Promise<string[]> => {
    await delay(200);
    const colleges = getLocalColleges();
    // Extract unique cities/states from location strings
    const locations = colleges.map((c) => c.location);
    return Array.from(new Set(locations));
  },
};
