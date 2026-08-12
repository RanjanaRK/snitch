import z from "zod";

export const formSchema = z.object({
  occasion: z.string().min(1, "Please select an occasion"),
  budget: z.number(),
  prompt: z.string(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
