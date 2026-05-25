import { useDispatch } from "react-redux";
import { addWishlist, getWishlist, removeWishlist } from "../service/like.api";
import { setWishlistItem } from "../state/wishlist.slice";

export const useWishlist = () => {
  const dispatch = useDispatch();

  const handleAddWishlist = async ({
    productId,
    variantId,
  }: {
    productId: string;
    variantId: string;
  }) => {
    const data = await addWishlist({ productId, variantId });

    dispatch(setWishlistItem(data.wishlist));
    return data;
  };

  const handleGetWishlist = async () => {
    const data = await getWishlist();

    console.log(data, "wishllliiiiissstt");

    dispatch(setWishlistItem(data.wishlist));

    return data;
  };

  const handleRemoveWishlist = async ({
    productId,
    variantId,
  }: {
    productId: string;
    variantId: string;
  }) => {
    const data = await removeWishlist({
      productId,
      variantId,
    });

    dispatch(setWishlistItem(data.wishlist));

    return data;
  };

  return { handleAddWishlist, handleGetWishlist, handleRemoveWishlist };
};
