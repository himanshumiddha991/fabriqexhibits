import api from "../../utils/api";
import { setGallery, setGalleryLoading } from "../gallerySlice";

const CACHE_KEY = "gallery_cache";
const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

export const loadGalleryWithCache = () => async (dispatch) => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);

    if (cache) {
      const parsed = JSON.parse(cache);

      // ⭐ load immediately
      dispatch(setGallery(parsed.data));

      // ⭐ If cache expired → silent refresh
      if (Date.now() > parsed.expiry) {
        console.log("test", Date.now(), parsed.expiry);
        dispatch(fetchGallerySilent());
      }
      return;
    }

    // ⭐ expired or not found
    dispatch(fetchGallery());
  } catch (err) {
    dispatch(fetchGallery());
  }
};

export const fetchGallery = () => async (dispatch) => {
  try {
    dispatch(setGalleryLoading(true));

    const res = await api.get("/api/gallary/all");

    dispatch(setGallery(res.data.data));

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: res.data.data,
        expiry: Date.now() + CACHE_TIME,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchGallerySilent = () => async (dispatch) => {
  try {
    const res = await api.get("/api/gallary/all");

    dispatch(setGallery(res.data.data));

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: res.data.data,
        expiry: Date.now() + CACHE_TIME,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};
