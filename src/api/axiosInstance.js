import axios from "axios";

const api = axios.create({
  baseURL: "https://signalforge.onrender.com/api/v1",
});

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };  

api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("access_token");
    const expiresAt = Number(localStorage.getItem("expires_at"));
  
    if (Date.now() >= expiresAt) {
      try {
        const refreshToken = getCookie("refresh_token"); 
        if (refreshToken) {
          const response = await api.post("/auth/refresh", {
            refresh_token: refreshToken,
          });
          token = response.data.access_token;
          localStorage.setItem("access_token", token);
          localStorage.setItem("expires_at", Date.now() + response.data.expires_in * 1000);
        } else {
          throw new Error("Refresh token is missing");
        }
      } catch (e) {
        console.error("Failed to refresh token", e);
        localStorage.clear();
        // window.location.href = "/login";
        return Promise.reject(e);
      }
    }
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });

export default api;
