import { useDispatch } from "react-redux";
import { createProduct, getSellerProducts } from "../services/product.api";
import { setSellerProducts } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  const handleCreateProduct = async (formData: FormData) => {
    const data = await createProduct(formData);
    return data;
  };
  const handleGetSellerProducts = async () => {
    const data = await getSellerProducts();
    dispatch(setSellerProducts(data.products));
    return data;
  };

  return {
    handleCreateProduct,
    handleGetSellerProducts,
  };
};
