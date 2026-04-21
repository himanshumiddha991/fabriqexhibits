import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    setGallery: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setGalleryLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setGallery, setGalleryLoading } = gallerySlice.actions;
export default gallerySlice.reducer;
