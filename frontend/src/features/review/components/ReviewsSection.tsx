import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import useReview from "../hooks/useReview";
import type { Review } from "../utils/types";
import ReviewCard from "./ReviewCard";
import ReviewSkeleton from "./ReviewSkeloton";
import { Link } from "react-router";

type ReviewsSectionProps = {
  productId: string;
  showAll?: boolean;
};

const ReviewsSection = ({
  productId,
  showAll = false,
}: ReviewsSectionProps) => {
  const reviews = useSelector((state: RootState) => state.review.reviews);
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.review.loading);
  const reviewStats = useSelector(
    (state: RootState) => state.review.reviewStats,
  );

  console.log({ reviews, user, reviewStats });

  const { handleGetReviews } = useReview();

  useEffect(() => {
    handleGetReviews(productId);
  }, [productId]);

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

        <div className="mb-10 border-y border-[#e4dfd7] py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Average */}
            <div className="md:w-1/3">
              <div className="text-5xl font-light text-[#1b1c1a]">
                {reviewStats.averageRating}
              </div>

              <div className="mt-2 text-[#A8874F]">
                {"★".repeat(Math.round(reviewStats.averageRating))}
              </div>

              <p className="mt-2 text-sm text-[#6e6258]">
                Based on {reviewStats.reviewCount} reviews
              </p>
            </div>

            {/* Breakdown */}
            <div className="flex-1 space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const item = reviewStats.breakdown.find(
                  (item) => item._id === rating,
                );

                const count = item?.count ?? 0;

                const percentage =
                  reviewStats.reviewCount > 0
                    ? (count / reviewStats.reviewCount) * 100
                    : 0;

                return (
                  <div key={rating} className="flex items-center gap-3 text-sm">
                    <span className="w-10">{rating} ★</span>

                    <div className="h-2 flex-1 bg-[#eeeae4]">
                      <div
                        className="h-full bg-[#A8874F]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="w-8 text-right text-[#6e6258]">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {(showAll ? reviews : reviews.slice(0, 3)).map((review: Review) => (
            <ReviewCard
              key={review._id}
              review={review}
              isOwner={user?._id === review.user._id}
            />
          ))}

          {!showAll && reviews.length > 3 && (
            <Link
              to={`/product/${productId}/reviews`}
              className="mt-5 inline-block text-sm font-semibold underline hover:text-[#A8874F]"
            >
              Read more reviews
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewsSection;
