import { GoogleGenAI } from "@google/genai";
import env from "../config/env.js";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

interface AnalyzeFashionImageParams {
  imageBuffer: Buffer;
  mimeType: string;
  prompt?: string;
  occasion?: string;
  budget?: number;
  categories: {
    id: string;
    name: string;
  }[];
}

export const analyzeFashionImage = async ({
  imageBuffer,
  mimeType,
  prompt,
  occasion,
  budget,
  categories,
}: AnalyzeFashionImageParams) => {
  const imageBase64 = imageBuffer.toString("base64");

  const categoryPrompt = categories
    .map((category) => `- ID: ${category.id}, Name: ${category.name}`)
    .join("\n");

  const promptText = `
You are an AI fashion assistant for an ecommerce store.

Your job is to analyze the user's uploaded clothing image and understand
what kind of fashion recommendation the user is asking for.

USER REQUEST:
${prompt || "Not provided"}

OCCASION:
${occasion || "Not provided"}

BUDGET:
${budget ? `₹${budget}` : "Not provided"}

AVAILABLE PRODUCT CATEGORIES FROM OUR DATABASE:
${categoryPrompt}

IMPORTANT INSTRUCTIONS:

1. Analyze the uploaded image to understand the current garment,
   its colors, style, and other useful fashion characteristics.

2. The uploaded garment is NOT necessarily what the user wants to buy.

3. Do NOT automatically recommend the same category as the uploaded garment.

4. Carefully follow the user's request.

5. If the user asks what bottomwear goes with the uploaded top,
   recommend suitable bottomwear categories.

6. If the user asks for a complete outfit, recommend categories
   appropriate for the occasion.

7. If the user asks for something different from the uploaded garment,
   recommend a different suitable category.

8. You MUST select recommended categories ONLY from the database
   categories provided above.

9. NEVER invent, rename, or modify a category.

10. Return the exact database category IDs in "categoryIds".

CATEGORY SELECTION RULES:

1. "categoryIds" MUST contain only leaf/product categories.

2. NEVER return a parent category, gender category, or grouping category
   such as "Men", "Women", "Kids", "Clothing", or similar.

3. A category is valid only if it represents an actual product type
   that can be used to search products in the catalog.

4. For bottomwear requests, prefer specific bottomwear categories such as:
   Jeans, Trousers, Shorts, Skirts, Joggers, or Pants,
   but ONLY if those exact categories exist in the provided database.

5. For topwear requests, prefer specific categories such as:
   T-Shirts, Shirts, Tops, Sweaters, Hoodies, etc.,
   but ONLY if those exact categories exist in the provided database.

6. If the user asks for "what type of bottom goes with this",
   categoryIds MUST contain bottomwear categories, not the category
   of the uploaded top.

7. If the user asks for multiple possible types, return all suitable
   matching category IDs, up to a maximum of 3.

8. Never choose a category merely because it is the parent of a suitable
   category.

9. If no suitable category exists in the provided database, return:
   "categoryIds": []

10. NEVER invent a category ID.

11. You may return multiple category IDs if multiple categories
    are suitable.

12. Consider the occasion, user's request, budget, colors, formality,
    and style when deciding the recommendation.

13. The maximum budget must be respected.

14. Do not recommend a specific product or product name.

15. Do not assume that the uploaded garment's category is the
    recommended category.

16. "detected.category" describes the uploaded garment.
    "recommendation.categoryIds" describes what should be searched
    in the ecommerce catalog.

17. Return ONLY valid JSON.
18. Do NOT use markdown.
19. Do NOT wrap the JSON in \`\`\`json.
20. Do not add any text before or after the JSON.

RETURN EXACTLY THIS STRUCTURE:

{
  "detected": {
    "category": "",
    "colors": [],
    "garmentStyle": "",
    "bottom": ""
  },
  "recommendation": {
    "itemType": "",
    "categoryIds": [],
    "formality": "",
    "preferredColors": [],
    "occasion": "",
    "maxBudget": 0,
    "keywords": [],
    "reason": ""
  }
}

FIELD RULES:

detected.category:
The category of the garment visible in the uploaded image.

detected.colors:
Main visible colors of the uploaded garment.

detected.garmentStyle:
Describe the visible garment style.

detected.bottom:
If a bottom garment is visible, describe it. Otherwise use "".

recommendation.itemType:
Describe what type of fashion item the user needs,
such as "bottomwear", "topwear", "dress", "complete outfit",
or "ethnic wear".

recommendation.categoryIds:
Array containing ONLY IDs from the provided database categories.

recommendation.formality:
Examples: "casual", "smart casual", "formal", "festive".

recommendation.preferredColors:
Colors that would work well for the recommendation.

recommendation.occasion:
The occasion based primarily on the user's request.

recommendation.maxBudget:
The user's maximum budget as a number.

recommendation.keywords:
Useful characteristics for finding suitable products,
such as "straight fit", "denim", "cotton", "minimal",
"high waist", or "formal".

recommendation.reason:
Briefly explain why this recommendation fits the user's
request, occasion, and uploaded garment.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",

    contents: [
      {
        role: "user",
        parts: [
          {
            text: promptText,
          },
          {
            inlineData: {
              mimeType,
              data: imageBase64,
            },
          },
        ],
      },
    ],
  });
  return response.text;
};
