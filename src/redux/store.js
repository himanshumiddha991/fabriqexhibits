import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import testimonialReducer from "./testimonialSlice";
import galleryReducer from "./gallerySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    testimonials: testimonialReducer,
    gallery: galleryReducer,
  },
});
