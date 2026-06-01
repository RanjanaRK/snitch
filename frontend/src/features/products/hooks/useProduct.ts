import { useDispatch } from "react-redux";
import {
  addProductVariants,
  createProduct,
  getAllProducts,
  getSellerProducts,
  productDetails,
} from "../services/product.api";
import { setProducts, setSellerProducts } from "../state/product.slice";
import type { Variant } from "../utils/productTypes";

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

  const handleGetProducts = async (
    category?: string,
    parentCategory?: string,
  ) => {
    const data = await getAllProducts(category, parentCategory);

    dispatch(setProducts(data.products));

    return data.products;
  };

  const handleGetProductDetails = async (productId: string) => {
    const data = await productDetails(productId);

    // console.log(data);

    return data;
  };

  const handleAddProductVariant = async (
    productId: string,
    newProductVariant: Variant,
  ) => {
    const data = await addProductVariants(productId, newProductVariant);

    return data;
  };

  return {
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetProducts,
    handleGetProductDetails,
    handleAddProductVariant,
  };
};
