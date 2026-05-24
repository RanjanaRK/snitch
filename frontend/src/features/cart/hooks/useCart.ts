import { useDispatch } from "react-redux";
import {
  addToCart,
  getCart,
  increamentCartItemQuantity,
} from "../service/cart.api";
import { increamentCartItem, setCart } from "../state/cart.slice";

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
    console.log(data);
    dispatch(setCart(data.cart));
    console.log(setCart(data.cart));

    return data;
  };

  const handleIncreamentCartItem = async ({
    productId,
    variantId,
  }: {
    productId: string;
    variantId: string;
  }) => {
    const data = await increamentCartItemQuantity({ productId, variantId });

    dispatch(increamentCartItem({ productId, variantId }));
    return data;
  };

  return { handleAddItem, handleGetCartItem, handleIncreamentCartItem };
};
