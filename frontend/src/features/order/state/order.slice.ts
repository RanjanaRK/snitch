import { createSlice } from "@reduxjs/toolkit";
import type { Order } from "../utils/types";

interface OrderState {
  orders: Order[];
  order: Order | null;
}

const initialState: OrderState = {
  orders: [],
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const { setOrders, setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
