import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CollegeFilters, Review } from "@/types";

export function useColleges(filters: Partial<CollegeFilters>) {
  return useQuery({
    queryKey: ["colleges", filters],
    queryFn: () => api.getColleges(filters),
    placeholderData: (previousData) => previousData, // keep previous page data during transitions for smoother loading
  });
}

export function useCollege(id: string) {
  return useQuery({
    queryKey: ["college", id],
    queryFn: () => api.getCollegeById(id),
    enabled: !!id,
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => api.getLocations(),
  });
}

export function useAddReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ collegeId, review }: { collegeId: string; review: Omit<Review, "id" | "date"> }) =>
      api.addReview(collegeId, review),
    onSuccess: (data, variables) => {
      // Invalidate both the list and the detail cache
      queryClient.invalidateQueries({ queryKey: ["college", variables.collegeId] });
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
}
