import { useDispatch } from "react-redux";
import { createReview, getReviews } from "../service/review.api";
import { addReview, setLoading, setReviews } from "../state/review.slice";
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

  return { handleCreateReview, handleGetReviews };
};

export default useReview;
