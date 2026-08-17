import axios from "axios";
import { env } from "../../shared/utils/env";
import type { AIRecommendResponse, AIRefineResponse } from "../utils/aiTypes";

const aiApiInstance = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/api/ai`,
  withCredentials: true,
});

export const createAiRecommend = async (formdata: FormData) => {
  const response = await aiApiInstance.post<AIRecommendResponse>(
    "/recommend",
    formdata,
  );

  console.log(response.data);
  return response.data;
};

export const refineRecommendation = async (data: any) => {
  const response = await aiApiInstance.post<AIRefineResponse>("/refine", data);
  console.log(response.data);
  return response.data;
};
