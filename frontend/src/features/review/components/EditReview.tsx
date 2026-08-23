import { zodResolver } from "@hookform/resolvers/zod";
import type { ReviewSchemaType } from "../utils/zodSchema";
import reviewSchema from "../utils/zodSchema";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Star } from "lucide-react";
import useReview from "../hooks/useReview";
import { toast } from "sonner";
import { useEffect } from "react";

type EditReviewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: {
    _id: string;
    rating: number;
    reviewComment: string;
  };
};

const EditReview = ({ open, onOpenChange, review }: EditReviewProps) => {
  const { handleUpdateReview } = useReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: review.rating,
      reviewComment: review.reviewComment,
    },
  });

  const rating = watch("rating");

  useEffect(() => {
    reset({
      rating: review.rating,
      reviewComment: review.reviewComment,
    });
  }, [review, reset]);

  const handleSubmitReview = async (data: ReviewSchemaType) => {
    try {
      const res = await handleUpdateReview({
        reviewId: review._id,
        reviewData: data,
      });

      if (res.success) {
        toast.success(res.message);
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update review");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-[#e4e2df] bg-[#fbf9f6] sm:max-w-xl">
          <DialogHeader>
            <DialogTitle
              className="text-3xl font-light text-[#1b1c1a]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Edit Review
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleSubmitReview)}
            className="space-y-6"
          >
            {/* Rating */}

            <div>
              <label className="mb-3 block text-[10px] tracking-[0.18em] text-[#7A6E63] uppercase">
                Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setValue("rating", star, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <Star
                      size={24}
                      className={
                        star <= rating
                          ? "fill-[#C9A96E] text-[#C9A96E]"
                          : "text-[#d8d2cb]"
                      }
                    />
                  </button>
                ))}
              </div>

              {errors.rating && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Review */}

            <div>
              <label className="mb-3 block text-[10px] tracking-[0.18em] text-[#7A6E63] uppercase">
                Your Review
              </label>

              <textarea
                rows={5}
                {...register("reviewComment")}
                className="w-full resize-none border border-[#e4e2df] bg-white p-4 text-sm outline-none focus:border-[#C9A96E] focus:ring-4 focus:ring-[#C9A96E]/10"
              />

              {errors.reviewComment && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.reviewComment.message}
                </p>
              )}
            </div>

            {/* Actions */}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-12 flex-1 border border-[#e4e2df] text-sm uppercase transition hover:bg-[#f4f1ec]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 flex-1 bg-[#1b1c1a] text-sm text-white uppercase transition hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditReview;
