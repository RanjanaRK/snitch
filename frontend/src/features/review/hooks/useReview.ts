import { useDispatch } from "react-redux";
import {
  createReview,
  deleteReview,
  getReviews,
  getReviewSummary,
  regenerateReviewSummary,
  updateReview,
} from "../service/review.api";
import {
  addReview,
  removeReview,
  setLoading,
  setReviews,
  updateReviewState,
} from "../state/review.slice";
import type { ReviewSchemaType } from "../utils/zodSchema";

const useReview = () => {
  const dispatch = useDispatch();

  const handleCreateReview = async ({
    reviewData,
    productId,
  }: {
    reviewData: ReviewSchemaType;
    productId: string;
  }) => {
    const response = await createReview({ reviewData, productId });

    dispatch(addReview(response.review));
    return response;
  };

  const handleGetReviews = async (productId: string) => {
    try {
      dispatch(setLoading(true));

      const response = await getReviews(productId);

      dispatch(setReviews(response.reviews));

      return response;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const response = await deleteReview(reviewId);
    dispatch(removeReview(reviewId));
    return response;
  };

  const handleUpdateReview = async ({
    reviewData,
    reviewId,
  }: {
    reviewData: ReviewSchemaType;
    reviewId: string;
  }) => {
    const response = await updateReview({ reviewData, reviewId });

    dispatch(updateReviewState(response.review));
    return response;
  };

  const handleGetReviewSummary = async (productId: string) => {
    const response = await getReviewSummary(productId);

    return response;
  };

  const handleRegenerateReviewSummary = async (productId: string) => {
    const response = await regenerateReviewSummary(productId);

    return response;
  };

  return {
    handleCreateReview,
    handleGetReviews,
    handleDeleteReview,
    handleUpdateReview,
    handleGetReviewSummary,
    handleRegenerateReviewSummary,
  };
};

export default useReview;
