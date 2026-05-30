import axios from "axios";
import type {
  ProductResponse,
  ProductsResponse,
  Variant,
} from "../utils/productTypes";

const productApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/products",
  withCredentials: true,
});

export const createProduct = async (
  formData: FormData,
): Promise<ProductResponse> => {
  const response = await productApiInstance.post<ProductResponse>(
    "/",
    formData,
  );

  return response.data;
};

export const getSellerProducts = async (): Promise<ProductsResponse> => {
  const res = await productApiInstance.get<ProductsResponse>("/seller");

  return res.data;
};

export const getAllProducts = async (
  category?: string,
): Promise<ProductsResponse> => {
  const res = await productApiInstance.get<ProductsResponse>("/", {
    params: category,
  });

  console.log(res);

  return res.data;
};

export const productDetails = async (
  productId: string,
): Promise<ProductResponse> => {
  const res = await productApiInstance.get<ProductResponse>(`/${productId}`);

  return res.data;
};

export const addProductVariants = async (
  productId: string,
  newProductVariant: Variant,
) => {
  console.log(newProductVariant);

  const formData = new FormData();

  newProductVariant.images.forEach((image: any) => {
    formData.append(`images`, image.file);
  });

  formData.append("stock", String(newProductVariant.stock));
  formData.append("priceAmount", String(newProductVariant.price));
  formData.append("attributes", JSON.stringify(newProductVariant.attributes));

  const response = await productApiInstance.post(
    `/${productId}/variants`,
    formData,
  );

  return response.data;
};
