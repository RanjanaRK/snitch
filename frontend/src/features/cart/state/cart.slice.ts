import { createSlice } from "@reduxjs/toolkit";
import type { CartProduct } from "../utils/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartProduct[],
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
    },
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setCart, addItems } = cartSlice.actions;

export default cartSlice.reducer;
