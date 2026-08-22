import z from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),

  reviewComment: z
    .string()
    .trim()
    .min(10, "Review must contain at least 10 characters")
    .max(500, "Review is too long"),
});

export default reviewSchema;

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
