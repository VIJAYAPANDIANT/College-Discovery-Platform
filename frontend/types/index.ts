export interface Review {
  id?: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  name: string;
  duration: string;
  fees: number;
}

export interface College {
  id: string;
  name: string;
  logo: string;
  bannerImage: string;
  location: string;
  rating: number;
  reviewsCount?: number;
  feesPerYear: number;
  type: 'Public' | 'Private';
  established: number;
  placementRate: number; // percentage (e.g. 92)
  avgPackage: number; // annual salary in USD/INR
  description: string;
  courses: Course[];
  reviews: Review[];
  amenities: string[];
  featured?: boolean;
  rank: number;
  website: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CollegeFilters {
  search: string;
  location: string[];
  type: ('Public' | 'Private')[];
  minFees: number;
  maxFees: number;
  minRating: number;
  sortBy: 'rank' | 'fees_asc' | 'fees_desc' | 'rating';
  page: number;
  limit: number;
}
