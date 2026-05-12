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
  const response = await authApiInstance.post("/register", userData);

  // console.log(response.data);
  return response.data;
};

export const loginUser = async (
  userData: LoginFormData,
): Promise<AuthResponse> => {
  const response = await authApiInstance.post("/login", userData);

  // console.log(response.data);
  return response.data;
};

export const getMe = async (): Promise<AuthResponse> => {
  const repsonse = await authApiInstance.get<AuthResponse>("/me");

  // console.log(repsonse);

  return repsonse.data;
};
