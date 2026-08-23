import { Loader, Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useReview from "../hooks/useReview";
import type { Review } from "../utils/types";
import EditReview from "./EditReview";

type ReviewCardProps = {
  review: Review;
  isOwner: boolean;
};

const ReviewCard = ({ review, isOwner }: ReviewCardProps) => {
  const [open, setOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const { handleDeleteReview } = useReview();

  const handleDeleteSubmit = async () => {
    try {
      setDeleteLoading(true);
      const res = await handleDeleteReview(review._id);

      if (res.success) {
        toast.success;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="border border-[#e4e2df] bg-white p-6 transition-all duration-300 hover:border-[#C9A96E]/40 hover:shadow-lg">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f0e8] text-sm font-medium text-[#f1a016]">
              {review.user.fullname?.slice(0, 1).toUpperCase()}
            </div>

            <div>
              <h4 className="font-medium text-[#1b1c1a]">
                {review.user.fullname}
              </h4>

              <p className="mt-1 text-[11px] tracking-[0.15em] text-[#B5ADA3] uppercase">
                Verified Customer
              </p>
            </div>
          </div>

          {isOwner && (
            <div className="flex items-center gap-3">
              <button
                disabled={deleteLoading}
                onClick={() => setOpen(true)}
                className="text-[#7A6E63] transition-colors hover:text-[#C9A96E]"
              >
                {deleteLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Pencil size={16} />
                )}
              </button>

              <button
                onClick={() => handleDeleteSubmit()}
                className="text-[#7A6E63] transition-colors hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Rating */}

        <div className="mb-4 flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < review.rating
                  ? "fill-[#C9A96E] text-[#C9A96E]"
                  : "text-[#d8d2cb]"
              }
            />
          ))}
        </div>

        {/* Review */}

        <p className="text-sm leading-7 text-[#4e4741]">
          {review.reviewComment}
        </p>
        {isOwner && (
          <EditReview open={open} onOpenChange={setOpen} review={review} />
        )}

        {/* Footer */}

        <div className="mt-5 border-t border-[#f1eeea] pt-4">
          <span className="text-[11px] tracking-[0.12em] text-[#B5ADA3] uppercase">
            {new Date(review.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
