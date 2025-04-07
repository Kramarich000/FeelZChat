import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const api = axios.create({
  baseURL: "https://signalforge.onrender.com/api/v1",
});

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("access_token");
  const expiresAt = Number(localStorage.getItem("expires_at"));

  if (Date.now() >= expiresAt) {
    try {
      token = await refreshAccessToken();
    } catch (e) {
      console.error("Failed to refresh token", e);
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(e);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
