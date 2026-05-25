import axios from "axios";
import type { WishlistResponse } from "../utils/types";

const likeApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/wishlist",
  withCredentials: true,
});

export const addWishlist = async ({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}): Promise<WishlistResponse> => {
  const response = await likeApiInstance.post(
    `/create/${productId}/${variantId}`,
  );

  return response.data;
};

export const getWishlist = async (): Promise<WishlistResponse> => {
  const response = await likeApiInstance.get("/");

  console.log(response.data);

  return response.data;
};

export const removeWishlist = async ({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}): Promise<WishlistResponse> => {
  const response = await likeApiInstance.patch(
    `/remove/${productId}/${variantId}`,
  );

  return response.data;
};
