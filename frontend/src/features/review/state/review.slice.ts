import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Review } from "../utils/types";

interface ReviewState {
  reviews: Review[];
  review: Review | null;
  loading: boolean;
}

const initialState: ReviewState = {
  reviews: [],
  review: null,
  loading: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },

    setReview: (state, action: PayloadAction<Review>) => {
      state.review = action.payload;
    },

    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },

    removeReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload,
      );
    },

    updateReviewState: (state, action: PayloadAction<Review>) => {
      state.reviews = state.reviews.map((review) =>
        review._id === action.payload._id ? action.payload : review,
      );
    },
  },
});

export const {
  setReviews,
  setLoading,
  setReview,
  addReview,
  removeReview,
  updateReviewState,
} = reviewSlice.actions;

export default reviewSlice.reducer;
