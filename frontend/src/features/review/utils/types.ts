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
