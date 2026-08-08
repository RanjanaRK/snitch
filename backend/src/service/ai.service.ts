import { GoogleGenAI } from "@google/genai";
import env from "../config/env.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const analyzeFashionImage = async ({
  imageUrl,
  prompt,
  occasion,
  budget,
}: {
  imageUrl: string;
  prompt?: string;
  occasion?: string;
  budget?: number;
}) => {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: [
      {
        role: "user",

        content: `You are an AI Fashion Stylist.  
                 Analyze this image.

            imageUrl: ${imageUrl},     
         
         `,
      },
    ],
  });
  console.log(interaction.output_text);
};
