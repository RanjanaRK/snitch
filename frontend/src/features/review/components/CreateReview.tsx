import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useReview from "../hooks/useReview";
import type { ReviewSchemaType } from "../utils/zodSchema";
import reviewSchema from "../utils/zodSchema";

const CreateReview = ({ productId }: { productId: string }) => {
  const { handleCreateReview } = useReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewComment: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: ReviewSchemaType) => {
    try {
      console.log(data);

      const res = await handleCreateReview({ reviewData: data, productId });

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="border border-[#e4e2df] bg-white p-8 shadow-sm">
        {/* Header */}

        <div className="mb-8">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[#A8874F] uppercase">
            Customer Review
          </p>

          <h2
            className="text-3xl font-light text-[#1b1c1a]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Share Your Experience
          </h2>

          <p className="mt-2 text-sm text-[#7A6E63]">
            Help others discover the perfect piece.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
              placeholder="This linen shirt feels luxurious and fits perfectly for summer..."
              {...register("reviewComment", {
                required: "Review is required",
                minLength: {
                  value: 10,
                  message: "Review must contain at least 10 characters",
                },
              })}
              className="w-full resize-none border border-[#e4e2df] bg-[#fbf9f6] p-4 text-sm text-[#1b1c1a] transition-all outline-none focus:border-[#C9A96E] focus:ring-4 focus:ring-[#C9A96E]/10"
            />

            {errors.reviewComment && (
              <p className="mt-2 text-xs text-red-500">
                {errors.reviewComment.message}
              </p>
            )}
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-13 w-full items-center justify-center bg-[#1b1c1a] text-sm font-medium tracking-[0.15em] text-white uppercase transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
          >
            {isSubmitting ? "Publishing..." : "Publish Review"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReview;
