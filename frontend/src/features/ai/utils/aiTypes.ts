import type { Product } from "../../products/utils/productTypes";

export interface Detected {
  category: string;
  colors: string[];
  garmentStyle: string;
  bottom: string;
}

export interface Recommendation {
  itemType: string;
  categoryIds: string[];
  formality: string;
  preferredColors: string[];
  occasion: string;
  maxBudget: number;
  keywords: string[];
  reason: string;
}

export interface ScoredProduct {
  product: Product;
  score: number;
}

export interface AIRecommendResponse {
  success: boolean;
  message: string;

  recommendation: Recommendation;
  detected: Detected;
  products: ScoredProduct;
}
