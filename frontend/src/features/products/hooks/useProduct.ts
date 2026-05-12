import { useDispatch } from "react-redux";
import {
  createProduct,
  getAllProducts,
  getSellerProducts,
} from "../services/product.api";
import { setProducts, setSellerProducts } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  const handleCreateProduct = async (formData: FormData) => {
    const data = await createProduct(formData);
    return data;
  };
  const handleGetSellerProducts = async () => {
    const data = await getSellerProducts();
    dispatch(setSellerProducts(data.products));
    return data.products;
  };

  const handleGetProducts = async () => {
    const data = await getAllProducts();
    dispatch(setProducts(data.products));
    console.log(data);

    return data.products;
  };

  return {
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetProducts,
  };
};
