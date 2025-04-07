import api from "./axiosInstance";
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
  
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }
  
    const response = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
  
    const { access_token, expires_in } = response.data;
  
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("expires_at", Date.now() + expires_in * 1000);
  
    return access_token;
  };
  