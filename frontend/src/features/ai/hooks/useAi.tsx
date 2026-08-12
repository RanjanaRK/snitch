import { createAiRecommend } from "../services/ai.api";

const useAi = () => {
  const createAiFashionRecommend = async (data: any) => {
    const response = await createAiRecommend(data);

    console.log(response);

    return response;
  };

  return { createAiFashionRecommend };
};

export default useAi;
