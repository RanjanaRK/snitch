import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../products/utils/productTypes";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as Product[],
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
