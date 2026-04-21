import api from "../../utils/api";
import { setTestimonial, setTestimonialLoading } from "../testimonialSlice";

const CACHE_KEY = "testimonial_cache";
// const CACHE_TIME = 1000 * 60 * 10; // 10 minutes
const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

// ⭐ Main Loader
export const loadTestimonialWithCache = () => async (dispatch) => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);

    if (cache) {
      const parsed = JSON.parse(cache);

      // ⭐ Load instantly from cache
      dispatch(setTestimonial(parsed.data));

      // ⭐ If cache expired → silent refresh
      if (Date.now() > parsed.expiry) {
        dispatch(fetchTestimonialSilent());
        return;
      }
      return;
    }

    // ⭐ If no cache or expired
    dispatch(fetchTestimonial());
  } catch (err) {
    dispatch(fetchTestimonial());
  }
};

// ⭐ Normal Fetch (shows loader)
export const fetchTestimonial = () => async (dispatch) => {
  try {
    dispatch(setTestimonialLoading(true));

    const res = await api.get("/api/testimonial");

    dispatch(setTestimonial(res.data.data));

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: res.data.data,
        expiry: Date.now() + CACHE_TIME,
      }),
    );
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setTestimonialLoading(false));
  }
};

// ⭐ Silent Fetch (no loader)
export const fetchTestimonialSilent = () => async (dispatch) => {
  try {
    const res = await api.get("/api/testimonial");

    dispatch(setTestimonial(res.data.data));

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
