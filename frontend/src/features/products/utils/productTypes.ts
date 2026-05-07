type Price = {
  amount: number;
  currency: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  seller: string;
  price: Price;
  images: string[];
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
