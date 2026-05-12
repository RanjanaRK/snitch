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
