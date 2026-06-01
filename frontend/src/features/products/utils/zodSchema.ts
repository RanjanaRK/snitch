import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3),

  description: z.string().min(10),

  priceAmount: z.number().min(1, "Price is required"),

  priceCurrency: z.string().min(1),

  category: z.string().min(1),
});

export type ProductFormDataType = z.infer<typeof productSchema>;

export type ImageType = { file: File; preview: string };
