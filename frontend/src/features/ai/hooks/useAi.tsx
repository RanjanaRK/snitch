import { createAiRecommend } from "../services/ai.api";

const useAi = () => {
  const createAiFashionRecommend = async (data: any) => {
    const response = await createAiRecommend(data);

    console.log(response);

    return response;
  };

  const refineRecommendation = async (data: any) => {};

  return { createAiFashionRecommend, refineRecommendation };
};

export default useAi;
