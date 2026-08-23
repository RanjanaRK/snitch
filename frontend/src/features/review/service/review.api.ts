import axios from "axios";
import type {
  DeleteReviewResponse,
  ReviewCreateResponse,
  ReviewResponse,
} from "../utils/types";
import type { ReviewSchemaType } from "../utils/zodSchema";

const reviewApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
  withCredentials: true,
});

export const createReview = async ({
  reviewData,
  productId,
}: {
  reviewData: ReviewSchemaType;
  productId: string;
}) => {
  const response = await reviewApiInstance.post<ReviewCreateResponse>(
    `/create/${productId}`,
    reviewData,
  );
  return response.data;
};

export const getReviews = async (productId: string) => {
  const response = await reviewApiInstance.get<ReviewResponse>(`/${productId}`);
  return response.data;
};

export const deleteReview = async (reviewId: string) => {
  const response = await reviewApiInstance.delete<DeleteReviewResponse>(
    `/delete/${reviewId}`,
  );
  return response.data;
};

export const updateReview = async ({
  reviewData,
  reviewId,
}: {
  reviewData: ReviewSchemaType;
  reviewId: string;
}) => {
  const response = await reviewApiInstance.patch<ReviewResponse>(
    `/update/${reviewId}`,
    reviewData,
  );
  return response.data;
};
