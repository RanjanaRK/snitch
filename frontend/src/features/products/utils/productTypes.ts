type Price = {
  amount: number;
  currency: string;
};

type Image = {
  url: string;
  _id: string;
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  seller: string;
  price: Price;
  images: Image[];
  createdAt: string;
  updatedAt: string;
};

export type ProductResponse = {
  message: string;
  success: boolean;
  product: Product;
};

export type ProductsResponse = {
  message: string;
  success: boolean;
  products: Product[];
};

export type Variant = {
  _id: string;
  images: Image[];
  color: string;
  sizes: string[];
  price: Price;
  attributes: string[];
};

export type VariantResponse = {
  message: string;
  success: boolean;
  variant: Variant;
};

export type VariantsResponse = {
  message: string;
  success: boolean;
  variants: Variant[];
};
