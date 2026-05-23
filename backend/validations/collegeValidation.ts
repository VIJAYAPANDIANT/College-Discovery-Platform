import { z } from "zod";

export const collegeQuerySchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(), // expected as comma-separated values
  type: z.string().optional(),     // expected as comma-separated values (e.g. "Public,Private")
  minFees: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  maxFees: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  minRating: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  sortBy: z
    .enum(["rank", "fees_asc", "fees_desc", "rating"])
    .default("rank"),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 6)),
});

export const reviewSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(5, "Review comment must be at least 5 characters"),
});

export type CollegeQueryInput = z.infer<typeof collegeQuerySchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
