import { createSlice } from "@reduxjs/toolkit";
import type { CartProduct } from "../utils/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartProduct[],
    totalPrice: 0,
    currency: "",
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.currency = action.payload.currency;
    },
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    increamentCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.map((item) => {
        const currentVariantId =
          typeof item.variant === "string" ? item.variant : item.variant._id;

        if (item.product._id === productId && currentVariantId === variantId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });
    },

    decreamentCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.map((item) => {
        const currentVariantId =
          typeof item.variant === "string" ? item.variant : item.variant._id;

        if (item.product._id === productId && currentVariantId === variantId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
  },
});

export const { setCart, addItems, increamentCartItem, decreamentCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
