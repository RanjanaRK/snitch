import type { Product } from "../../products/utils/productTypes";

export interface WishlistProduct {
  _id: string;
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
