import type { Product } from "../../products/utils/productTypes";

export interface WishlistProduct {
  product: Product;

  variant:
    | string
    | {
        _id: string;
      };
}

export interface WishlistResponse {
  success: boolean;
  message: string;
  wishlist: WishlistProduct[];
}
