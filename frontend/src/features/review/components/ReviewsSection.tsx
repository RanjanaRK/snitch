import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import useReview from "../hooks/useReview";
import type { Review } from "../utils/types";
import ReviewCard from "./ReviewCard";
import ReviewSkeleton from "./ReviewSkeloton";

const ReviewsSection = ({ productId }: { productId: string }) => {
  const reviews = useSelector((state: RootState) => state.review.reviews);
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.review.loading);

  const { handleGetReviews } = useReview();

  useEffect(() => {
    handleGetReviews(productId);
  }, []);

  if (loading) {
    return (
      <>
        <ReviewSkeleton />
        <ReviewSkeleton />
        <ReviewSkeleton />
      </>
    );
  }

  return (
    <>
      <div className="mt-16">
        <div className="mb-10">
          <p className="mb-2 text-[10px] tracking-[0.25em] text-[#A8874F] uppercase">
            Customer Reviews
          </p>

          <h2
            className="text-4xl font-light text-[#1b1c1a]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            What Our Customers Say
          </h2>
        </div>

        <div className="space-y-6">
          {reviews.map((review: Review) => {
            return (
              <>
                <ReviewCard
                  key={review._id}
                  review={review}
                  isOwner={user?._id === review.user._id}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ReviewsSection;
