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
  variants: Variant[];
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

export interface VariantImage {
  url: string;
  file?: File;
  previewUrl?: string;
}

export interface Variant {
  _id: string;
  stock: number;

  attributes: Record<string, string>;

  images: {
    url: string;
  }[];

  price: {
    amount: number;
    currency: string;
  };
}

export interface Price {
  amount: number;
  currency: string;
}
