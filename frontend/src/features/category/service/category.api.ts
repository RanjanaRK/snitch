import axios from "axios";
import { env } from "../../shared/utils/env";

const catApiInstance = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/api/categories`,
  withCredentials: true,
});

export const getCategories = async () => {
  const response = await catApiInstance.get("/");

  return response.data;
};

export const getAllSubCategories = async () => {
  const response = await catApiInstance.get("/subcategories");

  return response.data;
};

export const getSubCategories = async (parentId: string) => {
  const res = await catApiInstance.get(`/subcategories/${parentId}`);

  return res.data;
};
