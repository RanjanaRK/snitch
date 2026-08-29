import axios from "axios";
import type { LoginFormData, RegisterFormData } from "../utils/zodSchema";
import type { AuthResponse } from "../utils/authTypes";
import { env } from "../../shared/utils/env";

const authApiInstance = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/api/auth`,
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

export const logout = async (): Promise<AuthResponse> => {
  const response = await authApiInstance.post("/logout");
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await authApiInstance.get(`/verify-email?token=${token}`);
  return response.data;
};

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
  withCredentials: true,
});

export const forgotPassword = async (email: string) => {
  const response = await authApi.post("/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await authApi.post(`/reset-password?token=${token}`, {
    password,
  });

  return response.data;
};
