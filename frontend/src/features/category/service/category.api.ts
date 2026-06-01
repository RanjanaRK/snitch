import axios from "axios";

const catApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/categories",
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
