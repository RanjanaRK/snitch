import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProduct: [],
  },
  reducers: {
    setSellerProduct: (state, action) => {
      state.sellerProduct = action.payload;
    },
  },
});

export default productSlice.reducer;
