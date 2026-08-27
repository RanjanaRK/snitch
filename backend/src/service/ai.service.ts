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

// Analyze fashion image
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
You are an AI fashion recommendation assistant for an ecommerce store.

Your job is to analyze the uploaded fashion image AND understand the
user's request.

The uploaded image is reference information only.

Do NOT assume that the user wants the same clothing category shown
in the uploaded image.

==================================================
USER REQUEST
==================================================

${prompt || "Not provided"}

==================================================
OCCASION
==================================================

${occasion || "Not provided"}

==================================================
BUDGET
==================================================

${budget ? `₹${budget}` : "Not provided"}

==================================================
AVAILABLE PRODUCT CATEGORIES
==================================================

You MUST select products only from these categories:

${categoryPrompt}

==================================================
VERY IMPORTANT RECOMMENDATION RULES
==================================================

1. Understand exactly what the USER is asking for.

2. The uploaded image is only a reference for:
   - current clothing
   - colors
   - style
   - overall fashion preference
   - possible styling direction

3. NEVER automatically recommend the same category as the
   uploaded image.

4. The uploaded garment category and the recommended category
   are completely separate concepts.

5. The user's request has higher priority than the uploaded
   garment category.

6. If the user asks:

   "What bottom goes with this?"

   Then recommend bottomwear categories.

7. If the user asks:

   "What top goes with this skirt?"

   Then recommend topwear categories.

8. If the user asks:

   "Suggest me a dress that suits me"

   Then recommend a suitable dress category if a dress category
   exists in the database.

9. If the user asks:

   "Suggest an outfit for a wedding"

   Recommend categories suitable for a wedding based on the
   available database categories.

10. If the user asks:

   "Suggest an outfit for an interview"

   Recommend formal categories suitable for an interview.

11. If the user asks for something completely different from
    the uploaded clothing, recommend the requested clothing type.

12. Do NOT recommend a category merely because it appears in
    the uploaded image.

==================================================
CATEGORY RULES
==================================================

13. "categoryIds" MUST contain ONLY category IDs from the
    AVAILABLE PRODUCT CATEGORIES list.

14. NEVER invent a category ID.

15. NEVER invent a category name.

16. NEVER modify a category ID.

17. NEVER return parent/gender/group categories such as:

    Men
    Women
    Kids
    Clothing
    Fashion
    Men's Wear
    Women's Wear

    unless that category itself is an actual searchable
    product category.

18. Prefer leaf/product categories.

19. If the user asks for bottomwear, select categories such as:

    Jeans
    Trousers
    Pants
    Shorts
    Skirts
    Joggers

    BUT ONLY if those categories exist in the database.

20. If the user asks for topwear, select categories such as:

    T-Shirts
    Shirts
    Tops
    Sweaters
    Hoodies

    BUT ONLY if those categories exist in the database.

21. If the user asks for a dress, select a dress category
    ONLY if it exists in the database.

22. If the user asks for ethnic wear, select appropriate
    ethnic product categories ONLY if they exist.

23. If multiple categories are genuinely suitable, return
    a maximum of 3 category IDs.

24. If no suitable category exists in the database:

    "categoryIds": []

==================================================
USER REQUEST PRIORITY
==================================================

Use this priority order:

1. Explicit user request
2. Occasion
3. Required clothing type
4. Style/formality
5. Uploaded clothing characteristics
6. Colors
7. Budget

For example:

Uploaded image:
T-shirt

User request:
"Suggest me a dress that suits me"

DO NOT return:

categoryIds for T-shirts

Instead, look for a Dress category in the database.

Another example:

Uploaded image:
Skirt

User request:
"What type of top goes with this?"

DO NOT return:

categoryIds for Skirts

Instead, return suitable Top/Shirt/T-shirt category IDs.

Another example:

Uploaded image:
Pink T-shirt

User request:
"What bottom goes with this?"

Return suitable bottomwear category IDs.

==================================================
IMAGE ANALYSIS
==================================================

Analyze the uploaded image and return:

detected.category
- The actual garment visible in the image.

detected.colors
- Main visible colors.

detected.garmentStyle
- Style of the visible garment.

detected.bottom
- Visible bottom garment, if any.
- Otherwise "".

IMPORTANT:

The detected information describes the uploaded image.

The recommendation information describes what the USER
should search for.

Do NOT confuse these two.

==================================================
RECOMMENDATION
==================================================

recommendation.itemType should describe what the user needs.

Examples:

"bottomwear"
"topwear"
"dress"
"complete outfit"
"ethnic wear"
"outerwear"

recommendation.categoryIds:
- Exact MongoDB category IDs.
- Maximum 3.
- Only IDs supplied in AVAILABLE PRODUCT CATEGORIES.

recommendation.formality examples:

"casual"
"smart casual"
"formal"
"festive"

recommendation.preferredColors:
- Colors that work well for the requested recommendation.
- Consider the uploaded outfit when useful.

recommendation.keywords:
- Search/styling characteristics.
- Examples:
  "straight fit"
  "high waist"
  "denim"
  "cotton"
  "minimal"
  "solid"
  "floral"
  "oversized"
  "fitted"

recommendation.reason:
- Briefly explain why the recommendation fits the user's
  request, occasion, and image.

==================================================
BUDGET
==================================================

The user's maximum budget is:

${budget || 0}

Never recommend products above this budget.

Return the exact budget number in:

recommendation.maxBudget

==================================================
REFINE SUGGESTIONS
==================================================

Generate 4 short follow-up refinement suggestions.

Rules:
- Must be based on the detected outfit and recommendation.
- Each suggestion should be a natural user request.
- Maximum 5 words.
- Suggestions should help narrow or improve results.

Generate suggestions that are DIFFERENT based on the detected outfit.

Examples:

If recommendation contains jeans:
- "Only wide leg styles"
- "More relaxed fit"
- "Dark wash denim"

If recommendation contains skirts:
- "More feminine options"
- "Midi length only"

If recommendation is formal:
- "More professional look"
- "Darker colors"

Avoid generic suggestions when possible.

==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.

DO NOT use markdown.

DO NOT use \`\`\`json.

DO NOT add explanations outside the JSON.

Return exactly this structure:

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
  },
  "refineSuggestions": [
  "",
  "",
  "",
  ""
  ]
}
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

// Refine recommendation
export const refineRecommendation = async ({
  recommendation,
  detected,
  userPrompt,
  categories,
}: {
  recommendation: any;
  userPrompt: string;
  detected: any;
  categories: any;
}) => {
  const prompt = `
You are an expert fashion stylist.

Detected Outfit:
${JSON.stringify(detected, null, 2)}

Current Recommendation:
${JSON.stringify(recommendation, null, 2)}

Available Product Categories:
${JSON.stringify(categories, null, 2)}

User Refinement Request:
"${userPrompt}"

TASK:
Modify the recommendation according to the user's request.

IMPORTANT CATEGORY RULES:
- categoryIds MUST contain the actual MongoDB category IDs from "Available Product Categories".
- NEVER use numbers such as 1, 2, 3 for categoryIds.
- NEVER invent category IDs.
- If you change categoryIds, use the exact "id" value provided in Available Product Categories.
- categoryIds must be an array of strings.
- If the existing category is still appropriate, keep its existing valid MongoDB ID.

OTHER RULES:
- Keep EXACTLY the same JSON structure.
- Do not add extra fields.
- Update categoryIds, preferredColors, keywords, occasion, formality and reason if needed.
- Keep maxBudget unchanged.
- Return only valid JSON.
- Do not wrap response in markdown.

Example refinements:

"show only denim options"
→ keywords should focus on denim.

"suggest something for college"
→ occasion becomes college.

"make it more feminine"
→ update keywords, colors and reason accordingly.

"suitable for winter"
→ update keywords and recommendation accordingly.

Return JSON only.
`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return result.text;
};

// CALCULATE PRODUCT SCORE
export const calculateProductScore = (product: any, recommendation: any) => {
  let score = 0;

  const normalize = (value: string) =>
    value?.toLowerCase().trim().replace(/[-_]/g, " ").replace(/\s+/g, " ");

  // CATEGORY
  const productCategoryId = product.category?._id?.toString();

  if (
    recommendation.categoryIds?.some((id: string) => id === productCategoryId)
  ) {
    score += 30;
  }

  // STYLE
  const productStyle = normalize(product.style);
  const recommendedStyle = normalize(recommendation.formality);

  if (productStyle && recommendedStyle && productStyle === recommendedStyle) {
    score += 15;
  }

  // OCCASION
  const productOccasions = (product.occasions || []).map((occasion: string) =>
    normalize(occasion),
  );

  const recommendedOccasion = normalize(recommendation.occasion);

  if (productOccasions.includes(recommendedOccasion)) {
    score += 15;
  }

  // COLOR
  const productColors = [
    product.color,
    ...(product.variants || []).map(
      (variant: any) => variant.attributes?.color,
    ),
  ]
    .filter(Boolean)
    .flatMap((color: string) =>
      color
        .toLowerCase()
        .split(",")
        .map((c) => normalize(c)),
    );

  const preferredColors = (recommendation.preferredColors || []).map(
    (color: string) => normalize(color),
  );

  let colorScore = 0;

  for (const preferred of preferredColors) {
    const matched = productColors.some((productColor: string) => {
      return (
        productColor === preferred ||
        productColor.includes(preferred) ||
        preferred.includes(productColor)
      );
    });

    if (matched) {
      colorScore += 5;
    }
  }

  score += Math.min(colorScore, 20);

  // KEYWORDS
  const productKeywords = (product.keywords || []).map((keyword: string) =>
    normalize(keyword),
  );

  const aiKeywords = (recommendation.keywords || []).map((keyword: string) =>
    normalize(keyword),
  );

  let keywordScore = 0;

  for (const aiKeyword of aiKeywords) {
    const matched = productKeywords.some((productKeyword: string) => {
      return (
        productKeyword === aiKeyword ||
        productKeyword.includes(aiKeyword) ||
        aiKeyword.includes(productKeyword)
      );
    });

    if (matched) {
      keywordScore += 4;
    }
  }

  score += Math.min(keywordScore, 20);

  return score;
};

// Rank products
export const rankProducts = (products: any[], recommendation: any) => {
  return products
    .map((product) => ({
      product,
      score: calculateProductScore(product, recommendation),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

// AI REVIEW SUMMARIZATION
export const generateReviewSummary = async ({
  product,
  reviews,
}: {
  product: any;
  reviews: any[];
}) => {
  const reviewText = reviews
    .map(
      (review) => `Rating: ${review.rating}/5\nReview: ${review.reviewComment}`,
    )
    .join("\n\n");

  const prompt = `
You are an AI ecommerce review analyst.

Analyze the customer reviews for this product.

PRODUCT:
${product.title}

REVIEWS:
${reviewText}

Return ONLY valid JSON:

{
  "summary": "",
  "positivePoints": [],
  "negativePoints": [],
  "fit": "",
  "quality": "",
  "valueForMoney": "",
  "recommendation": ""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return response.text;
};
