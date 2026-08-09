import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3),

  description: z.string().min(10),

  priceAmount: z.number().min(1, "Price is required"),

  priceCurrency: z.string().min(1),

  category: z.string().min(1),

  style: z.string().min(1, "Style is required"),

  occasions: z.array(z.string()).min(1, "Select at least one occasion"),

  keywords: z.string(),

  color: z.string(),

  images: z.any(),
});

export type ProductFormDataType = z.infer<typeof productSchema>;

export type ImageType = { file: File; preview: string };
