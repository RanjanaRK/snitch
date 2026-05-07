export type Product = {
  id: string;
  title: string;
  description: string;
  seller: string;
  price: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProdcutResponse = {
  message: string;
  success: boolean;
  product: Product;
};
