import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../utils/types";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [] as Category[],
    // selectedCategory: string || null,
  },
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    // setSelectedCategory: (state, action) => {
    //   state.selectedCategory = action.payload;
    // },
    clearCategories: (state) => {
      state.categories = [];
    },
  },
});

export const { setCategories, clearCategories } = categorySlice.actions;

export default categorySlice.reducer;
