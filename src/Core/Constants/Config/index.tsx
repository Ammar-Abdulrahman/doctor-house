import axios from "axios";
import i18next from "i18next";
import store from "Core/store";
import { baseURL } from "@Constants/Shared";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Cache-Control": "no-cache",
    "ngrok-skip-browser-warning": "true",
    "Accept-language": `${i18next.language}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
