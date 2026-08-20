import axios from "axios";
import { env } from "../../shared/utils/env";
import type { AllOrderResponse, SingleOrderResponse } from "../utils/types";

const orderApiInstance = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/api/orders`,
  withCredentials: true,
});

export const getAllOrders = async () => {
  const response = await orderApiInstance.get<AllOrderResponse>("/all");
  return response.data;
};

export const getSingleOrder = async (orderId: string) => {
  const response = await orderApiInstance.get<SingleOrderResponse>(
    `/${orderId}`,
  );
  return response.data;
};
