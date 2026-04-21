import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    data: [],
    loading: false,
  },

  reducers: {
    setTestimonial: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },

    setTestimonialLoading: (state, action) => {
      state.loading = action.payload;
    },

    addTestimonial: (state, action) => {
      state.data.unshift(action.payload);
    },

    deleteTestimonial: (state, action) => {
      state.data = state.data.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setTestimonial,
  setTestimonialLoading,
  addTestimonial,
  deleteTestimonial,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
