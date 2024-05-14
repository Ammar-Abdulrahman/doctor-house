import axios from "axios";
import i18next from "i18next";

const axiosInstance = axios.create({
  baseURL: "https://doctor-store.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
    "Accept":"*/*",
    'Cache-Control': 'no-cache',
    'ngrok-skip-browser-warning' : 'true',
    'Accept-language':`${i18next.language}`
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
