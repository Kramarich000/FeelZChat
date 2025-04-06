import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("https://your-server.com/api/auth/google", {
          token: tokenResponse.access_token,
        });

        if (res.status === 200) {
          console.log("Google login successful");
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error during Google login", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="w-full bg-white text-black py-2 rounded shadow border hover:bg-gray-100"
    >
      Войти через Google
    </button>
  );
};

export default GoogleAuth;
