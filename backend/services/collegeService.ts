import prisma from "@/lib/prisma";
import { CollegeQueryInput, ReviewInput } from "@/validations/collegeValidation";

export const collegeService = {
  getColleges: async (filters: CollegeQueryInput) => {
    const {
      search,
      location,
      type,
      minFees,
      maxFees,
      minRating,
      sortBy,
      page = 1,
      limit = 6,
    } = filters;

    const where: any = {};

    // Search query matches name, location, or description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Location filter (comma-separated list)
    if (location) {
      const locationsList = location.split(",").map((l) => l.trim()).filter(Boolean);
      if (locationsList.length > 0) {
        const locationConditions = locationsList.map((loc) => ({
          location: { contains: loc, mode: "insensitive" as const },
        }));
        
        if (where.OR) {
          // If search OR already exists, merge them with an AND clause
          where.AND = [
            { OR: where.OR },
            { OR: locationConditions }
          ];
          delete where.OR;
        } else {
          where.OR = locationConditions;
        }
      }
    }

    // Type filter (e.g. "Public", "Private")
    if (type) {
      const typesList = type.split(",").map((t) => t.trim()).filter(Boolean);
      if (typesList.length > 0) {
        where.type = { in: typesList };
      }
    }

    // Fees filter
    if (minFees !== undefined || maxFees !== undefined) {
      where.feesPerYear = {};
      if (minFees !== undefined) where.feesPerYear.gte = minFees;
      if (maxFees !== undefined) where.feesPerYear.lte = maxFees;
    }

    // Rating filter
    if (minRating !== undefined) {
      where.rating = { gte: minRating };
    }

    // Sorting order
    let orderBy: any = { rank: "asc" };
    if (sortBy === "fees_asc") {
      orderBy = { feesPerYear: "asc" };
    } else if (sortBy === "fees_desc") {
      orderBy = { feesPerYear: "desc" };
    } else if (sortBy === "rating") {
      orderBy = { rating: "desc" };
    }

    // Pagination bounds
    const skip = (page - 1) * limit;

    // Execute queries in transaction to get count and records together
    const [total, colleges] = await prisma.$transaction([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          courses: true,
        },
      }),
    ]);

    const pagesCount = Math.ceil(total / limit);

    return {
      colleges,
      total,
      pagesCount,
    };
  },

  getCollegeById: async (id: string) => {
    return prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        reviews: {
          orderBy: { id: "desc" }, // newest reviews first
        },
      },
    });
  },

  searchColleges: async (query: string) => {
    if (!query) return [];
    
    return prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 6,
      select: {
        id: true,
        name: true,
        location: true,
        logo: true,
      },
    });
  },

  addReview: async (collegeId: string, input: ReviewInput, userId?: string) => {
    const { userName, rating, comment } = input;

    // Run review insert and average rating update in single database transaction
    return prisma.$transaction(async (tx) => {
      // 1. Create the new review
      const review = await tx.review.create({
        data: {
          userName,
          rating,
          comment,
          date: new Date().toISOString().split("T")[0],
          collegeId,
          userId,
        },
      });

      // 2. Fetch all reviews to recalculate rating
      const reviews = await tx.review.findMany({
        where: { collegeId },
        select: { rating: true },
      });

      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = parseFloat((totalRating / reviews.length).toFixed(1));

      // 3. Update parent College
      await tx.college.update({
        where: { id: collegeId },
        data: {
          rating: avgRating,
          reviewsCount: reviews.length,
        },
      });

      return review;
    });
  },

  getUniqueLocations: async () => {
    const colleges = await prisma.college.findMany({
      select: { location: true },
    });
    return Array.from(new Set(colleges.map((c) => c.location)));
  },
};
