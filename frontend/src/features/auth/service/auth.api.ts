import axios from "axios";
import type { LoginFormData, RegisterFormData } from "../utils/zodSchema";
import type { AuthResponse } from "../utils/authTypes";

const authApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const registerUser = async (
  userData: RegisterFormData,
): Promise<AuthResponse> => {
  //   try {
  const response = await authApiInstance.post("/register", userData);

  console.log(response.data);
  return response.data;
  //   } catch (error: any) {
  //     console.error(error.response?.data);
  //     console.error("Error registering user:", error);
  //     throw error;
  //   }
};

export const loginUser = async (
  userData: LoginFormData,
): Promise<AuthResponse> => {
  //   try {
  const response = await authApiInstance.post("/login", userData);

  console.log(response.data);
  return response.data;
  //   } catch (error: any) {
  //     console.error(error.response?.data);
  //     console.error("Error logging in user:", error);
  //     throw error;
  //   }
};
