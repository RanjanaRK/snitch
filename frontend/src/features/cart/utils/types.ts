import type {
  Price,
  Product,
  Variant,
} from "../../products/utils/productTypes";

export type CartProduct = {
  product: Product;
  variant: Variant;
  quantity: number;
  price: Price;
};

export type CartResponse = {
  success: boolean;
  message: string;
  cart: CartProduct[];
};
