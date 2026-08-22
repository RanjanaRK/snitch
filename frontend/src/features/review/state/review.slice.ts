import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Review } from "../utils/types";

interface ReviewState {
  reviews: Review[];
  review: Review | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  review: null,
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },

    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },

    updateReview: (state, action: PayloadAction<Review>) => {
      state.reviews = state.reviews.map((review) =>
        review._id === action.payload._id ? action.payload : review,
      );

      if (state.review?._id === action.payload._id) {
        state.review = action.payload;
      }
    },

    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload,
      );

      if (state.review?._id === action.payload) {
        state.review = null;
      }
    },

    setReview: (state, action: PayloadAction<Review>) => {
      state.review = action.payload;
    },

    setReviewLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setReviewError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearReviews: (state) => {
      state.reviews = [];
      state.review = null;
    },
  },
});

export const {
  setReview,
  setReviewLoading,
  setReviewError,
  clearReviews,
  addReview,
  updateReview,
  deleteReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
