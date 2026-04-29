import api from "../../utils/api";
import { setGallery, setGalleryLoading } from "../gallerySlice";

const CACHE_KEY = "gallery_cache";
const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

export const loadGalleryWithCache = () => async (dispatch) => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);

    if (cache) {
      const parsed = JSON.parse(cache);
      const now = Date.now();
      const expiry = Number(parsed.expiry);

      // console.log("NOW:", now);
      // console.log("EXPIRY:", expiry);

      // ✅ check expiry FIRST
      if (!isNaN(expiry) && now > expiry) {
        // console.log("EXPIRED → silent refresh");
        dispatch(fetchGallerySilent());
      }

      // ✅ then load cached data
      dispatch(setGallery(parsed.data));

      return;
    }

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
