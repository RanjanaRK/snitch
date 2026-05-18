import { useDispatch } from "react-redux";
import { addToCart } from "../service/cart.api";

export const useCart = () => {
  const dispatch = useDispatch();
  const handleAddItem = async ({
    productId,
    variantId,
  }: {
    productId: string;
    variantId: string;
  }) => {
    const data = await addToCart({ productId, variantId });

    return data;
  };

  return { handleAddItem };
};
