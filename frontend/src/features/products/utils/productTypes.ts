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
