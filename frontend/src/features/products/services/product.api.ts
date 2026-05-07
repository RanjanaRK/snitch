import axios from "axios";
import type { ProdcutResponse } from "../utils/productTypes";

const productApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/products",
  withCredentials: true,
});

export const createProduct = async (
  formData: FormData,
): Promise<ProdcutResponse> => {
  const response = await productApiInstance.post("/", formData);

  return response.data;
};

export const getSellerProducts = async (): Promise<ProdcutResponse[]> => {
  const res = await productApiInstance.get("/seller");

  return res.data;
};
