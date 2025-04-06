import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuth = () => {
  const handleLogin = async (response) => {
    if (response.credential) {
      try {
        const res = await axios.post(
          "https://your-server.com/api/auth/google",
          {
            token: response.credential,
          }
        );

        if (res.status === 200) {
          console.log("Google login successful");
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error during Google login", error);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full">
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => console.log("Login Failed")}
          width="100%" 
        />
      </div>
    </div>
  );
};

export default GoogleAuth;
