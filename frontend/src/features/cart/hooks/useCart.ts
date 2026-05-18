import { useDispatch } from "react-redux";
import { addToCart, getCart } from "../service/cart.api";
import { setCart } from "../state/cart.slice";

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
  const handleGetCartItem = async () => {
    const data = await getCart();

    dispatch(setCart(data.cart));

    return data;
  };

  return { handleAddItem, handleGetCartItem };
};
