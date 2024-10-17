import axios from "axios";
import i18next from "i18next";

const axiosInstance = axios.create({
  baseURL: "https://doctor-store.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    Accept: "*/*",
    "Cache-Control": "no-cache",
    "ngrok-skip-browser-warning": "true",
    "Accept-language": `${i18next.language}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
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
