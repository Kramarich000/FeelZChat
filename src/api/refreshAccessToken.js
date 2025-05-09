import api from "./axiosInstance";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
};

export const refreshAccessToken = async () => {
  const refreshToken = getCookie("refresh_token");

  if (!refreshToken) {
    throw new Error("Refresh token not found in cookies");
  }

  const response = await api.post("/auth/refresh", {
    refresh_token: refreshToken,
  });

  const { access_token, expires_in } = response.data;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("expires_at", Date.now() + expires_in * 1000);

  return access_token;
};
