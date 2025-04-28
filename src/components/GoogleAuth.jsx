import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import translate from "@utils/translate";
const GoogleAuth = () => {
  const login = useGoogleLogin({
    flow: "auth-code",
    scope:
      "openid email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          "https://your-server.com/api/auth/google",
          {
            token: tokenResponse.access_token,
          },
        );

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
      type="button"
      className="flex items-center justify-center text-center col-span-2 w-full bg-cyan-700 text-black py-2 rounded shadow border hover:bg-gray-100"
    >
      <FaGoogle className="text-left mr-auto" />
      <p className="mr-auto">{translate("key_sign_in_with")}</p>
    </button>
  );
};

export default GoogleAuth;
