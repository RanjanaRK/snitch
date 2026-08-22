import { useDispatch } from "react-redux";
import { createReview, getReview } from "../service/review.api";
import type { ReviewSchemaType } from "../utils/zodSchema";
import { setReview } from "../state/review.slice";

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

    dispatch(setReview(response.review));
    return response;
  };

  const handleGetReview = async (productId: string) => {
    const response = await getReview(productId);
    dispatch(setReview(response.review));
    return response;
  };

  return { handleCreateReview, handleGetReview };
};

export default useReview;
