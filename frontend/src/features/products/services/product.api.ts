import axios from "axios";
import type { ProductResponse, ProductsResponse } from "../utils/productTypes";

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

export const getAllProducts = async (): Promise<ProductsResponse> => {
  const res = await productApiInstance.get<ProductsResponse>("/");

  console.log(res);

  return res.data;
};

export const productDetails = async (
  productId: string,
): Promise<ProductResponse> => {
  const res = await productApiInstance.get<ProductResponse>(`/${productId}`);

  return res.data;
};

export const productVariants = async (
  productId: string,
  newProductVariant: any,
) => {
  console.log(newProductVariant);

  // const formData = new FormData();

  // newProductVariant.images.forEach((image) => {
  //   formData.append(`images`, image.file);
  // });

  // formData.append("stock", newProductVariant.stock);
  // formData.append("priceAmount", newProductVariant.price);
  // formData.append("attributes", JSON.stringify(newProductVariant.attributes));

  const response = await productApiInstance.post(
    `/${productId}/variants`,
    newProductVariant,
  );

  return response.data;
};
