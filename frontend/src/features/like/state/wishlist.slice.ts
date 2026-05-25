import { createSlice } from "@reduxjs/toolkit";
import type { WishlistProduct } from "../utils/types";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [] as WishlistProduct[],
  },
  reducers: {
    setWishlistItem: (state, action) => {
      state.items = action.payload;
    },

    addWishlistItem: (state, action) => {
      state.items.push(action.payload);
    },

    removeWishlistItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.filter((item) => {
        const currentVariantId =
          typeof item.variant === "string" ? item.variant : item.variant._id;

        return !(
          item.product._id === productId && currentVariantId === variantId
        );
      });
    },
  },
});

export const { setWishlistItem, addWishlistItem, removeWishlistItem } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
