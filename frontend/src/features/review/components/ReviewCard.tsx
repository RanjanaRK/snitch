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
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="border-b border-[#e4e2df] bg-white px-2 py-5 transition-all duration-300">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0e8] text-sm font-medium text-[#A8874F]">
              {review.user.fullname?.slice(0, 1).toUpperCase()}
            </div>

            {/* User */}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-[#1b1c1a]">
                  {review.user.fullname}
                </h4>

                <span className="text-[9px] tracking-[0.12em] text-[#A8874F] uppercase">
                  Verified
                </span>
              </div>

              <p className="mt-0.5 text-[10px] text-[#B5ADA3]">
                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* OWNER ACTIONS */}
          {isOwner && (
            <div className="flex items-center gap-3">
              {/* EDIT */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={deleteLoading}
                className="text-[#8c847c] transition-colors hover:text-[#C9A96E] disabled:opacity-40"
                aria-label="Edit review"
              >
                <Pencil size={16} />
              </button>

              {/* DELETE */}
              <button
                type="button"
                onClick={handleDeleteSubmit}
                disabled={deleteLoading}
                className="text-[#8c847c] transition-colors hover:text-red-500 disabled:opacity-50"
                aria-label="Delete review"
              >
                {deleteLoading ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
          )}
        </div>

        {/* RATING */}
        <div className="mt-3 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={15}
              className={
                star <= review.rating
                  ? "fill-[#C9A96E] text-[#C9A96E]"
                  : "text-[#d8d2cb]"
              }
            />
          ))}

          {/* <span className="ml-1.5 text-[11px] text-[#7A6E63]">
            {review.rating}
          </span> */}
        </div>

        {/* REVIEW COMMENT */}
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4e4741]">
          {review.reviewComment}
        </p>

        {/* EDIT DIALOG */}
        {isOwner && (
          <EditReview open={open} onOpenChange={setOpen} review={review} />
        )}
      </div>
    </>
  );
};

export default ReviewCard;
