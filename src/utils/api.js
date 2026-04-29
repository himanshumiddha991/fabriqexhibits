import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// REQUEST INTERCEPTOR (attach token)
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR (handle expired token)
api.interceptors.response.use(
  (response) => {
    if (
      response.data?.success === false &&
      response.data?.message === "Invalid or expired token."
    ) {
      store.dispatch(logout());
    }

    return response;
  },
  (error) => {
    if (error.response?.data?.message === "Invalid or expired token.") {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export default api;
