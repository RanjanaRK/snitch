import axios from "axios";
import type { CartResponse } from "../utils/types";

const cartApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/cart",
  withCredentials: true,
});

export const addToCart = async ({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}): Promise<CartResponse> => {
  const response = await cartApiInstance.post(
    `/add/${productId}/${variantId}`,
    {
      quantity: 1,
    },
  );

  return response.data;
};

export const getCart = async (): Promise<CartResponse> => {
  const response = await cartApiInstance.get("/");

  console.log(response.data);

  return response.data;
};

export const increamentCartItemQuantity = async ({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}): Promise<CartResponse> => {
  const response = await cartApiInstance.patch(
    `/quantity/increament/${productId}/${variantId}`,
  );

  return response.data;
};

export const decreamentCartItemQauntity = async ({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}): Promise<CartResponse> => {
  const response = await cartApiInstance.patch(
    `/quantity/decreament/${productId}/${variantId}`,
  );
  console.log(response);

  return response.data;
};
