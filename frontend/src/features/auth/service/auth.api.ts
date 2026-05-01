import axios from "axios";
import type { RegisterFormData } from "../utils/zodSchema";
import type { AuthResponse } from "../utils/authTypes";

const authApiInstance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

export const registeruser = async (
  userData: RegisterFormData,
): Promise<AuthResponse> => {
  const response = await authApiInstance.post<AuthResponse>(
    "/register",
    userData,
  );

  return response.data;
};
