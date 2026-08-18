import { createAiRecommend, refineRecommendation } from "../services/ai.api";

const useAi = () => {
  const createAiFashionRecommend = async (data: FormData) => {
    const response = await createAiRecommend(data);

    console.log(response);

    return response;
  };

  const createRefineRecommendation = async (data: any) => {
    const response = await refineRecommendation(data);

    console.log(response);

    return response;
  };

  return { createAiFashionRecommend, createRefineRecommendation };
};

export default useAi;
