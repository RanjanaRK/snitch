import type { UserType } from "../../auth/utils/authTypes";

export interface ReviewUser {
  _id: string;
  fullname?: string;
  email?: string;
  avatar?: string;
}

export interface Review {
  _id: string;
  user: UserType;
  product: string;

  rating: number;
  reviewComment: string;

  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  reviews: Review[];
}
export interface ReviewCreateResponse {
  success: boolean;
  message: string;
  review: Review;
}

export interface DeleteReviewResponse {
  success: boolean;
  message: string;
}

export interface ReviewSummary {
  _id: string;
  product: string;
  summary: string;
  pros: string[];
  cons: string[];
  generatedFromReviewCount: number;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewSummaryResponse {
  success: boolean;
  message: string;
  summary: ReviewSummary;
}

export interface RegenerateReviewSummaryResponse {
  success: boolean;
  message: string;
  savedSummary: ReviewSummary;
}
