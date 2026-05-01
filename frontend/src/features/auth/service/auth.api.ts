import axios from "axios";
import type { RegisterFormData } from "../utils/zodSchema";

const authApiInstance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

export const registeruser = async (userData: RegisterFormData) => {
  const response = await authApiInstance.post("/register", userData);

  return response.data;
};
