import { useDispatch } from "react-redux";
import {
  addToCart,
  createCartOrder,
  decreamentCartItemQauntity,
  getCart,
  increamentCartItemQuantity,
  removeCartItem,
  verifyCartOrder,
} from "../service/cart.api";
import {
  decreamentCartItem,
  increamentCartItem,
  setCart,
} from "../state/cart.slice";

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

  const handleDecreamentCartItem = async ({
    productId,
    variantId,
  }: {
    productId: string;
    variantId: string;
  }) => {
    const data = await decreamentCartItemQauntity({ productId, variantId });

    console.log(data);

    dispatch(decreamentCartItem({ productId, variantId }));
    return data;
  };

  const handleRemoveCartItem = async ({
    productId,
    variantId,
  }: {
    productId: string;
    variantId: string;
  }) => {
    const data = await removeCartItem({ productId, variantId });

    return data;
  };

  const handleCreateCartOrder = async () => {
    const data = await createCartOrder();

    console.log(data);

    return data.order;
  };

  const handleVerifyCartOrder = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const data = await verifyCartOrder({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    console.log(data);

    return data.success;
  };

  return {
    handleAddItem,
    handleGetCartItem,
    handleIncreamentCartItem,
    handleDecreamentCartItem,
    handleRemoveCartItem,
    handleCreateCartOrder,
    handleVerifyCartOrder,
  };
};
