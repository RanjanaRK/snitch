import { useDispatch } from "react-redux";
import { getCategories, getSubCategories } from "../service/category.api";
import { setCategories } from "../slice/category.slice";

export const useCategory = () => {
  const dispatch = useDispatch();

  const handleGetCategories = async () => {
    const data = await getCategories();

    dispatch(setCategories(data.categories));

    return data.categories;
  };
  const handleGetSubCategories = async (parentId: string) => {
    const data = await getSubCategories(parentId);

    return data.subCategories;
  };
  return {
    handleGetCategories,
    handleGetSubCategories,
  };
};
