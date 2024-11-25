import axios from "axios";
import { apiKey } from "../Utils/helper";

const axiosInstance = axios.create({
  baseURL: apiKey,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecommerce_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error?.response && error?.response?.status === 401) ||
      error?.response?.status === 403
    ) {
      console.error("Unauthorized, redirecting to login...");
      localStorage.removeItem("ecommerce_token");
    }
    return Promise.reject(error);
  }
);
