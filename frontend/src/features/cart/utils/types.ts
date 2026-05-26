import type { UserType } from "../../auth/utils/authTypes";
import type {
  Price,
  Product,
  Variant,
} from "../../products/utils/productTypes";

export interface Cart {
  items: CartProduct[];
  user: UserType;
  totalPrice: number;
  currency: string;
}
export type CartProduct = {
  product: Product;
  variant: Variant;
  quantity: number;
  price: Price;
};

export type CartResponse = {
  success: boolean;
  message: string;
  cart: Cart;
};

export interface QuantityResponse {
  success: boolean;
  message: string;
}
