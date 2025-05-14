import { useState } from "react";
import { captcha } from "@services/captcha";
import { showToast } from "../utils/toast";

const useCaptchaHandler = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const executeRecaptchaV3 = async () => {
    try {
      const token = await window.grecaptcha.execute(
        "6Le7Zw0rAAAAAHKsGR0i4ohPDQTK51JovR46dhnL",
        { action: "submit" },
      );
      return token;
    } catch (error) {
      console.error("Ошибка при вызове reCAPTCHA v3:", error);
      showToast("Ошибка при вызове reCAPTCHA v3", "error");
      return null;
    }
  };

  const handleCaptcha = async (token) => {
    if (!token) {
      showToast("Ошибка: капча не пройдена", "error");
      return;
    }

    try {
      const verificationResultV2 = await captcha(token, "v2");

      if (verificationResultV2.success && verificationResultV2.score >= 0.5) {
        // console.log("Captcha v2 пройдена:", verificationResultV2);
        setCaptchaVerified(true);
      } else {
        // console.warn("Captcha v2 не пройдена, пробуем v3...");
        const tokenV3 = await executeRecaptchaV3();

        if (tokenV3) {
          const verificationResultV3 = await captcha(tokenV3, "v3");

          if (
            verificationResultV3.success &&
            verificationResultV3.score >= 0.5
          ) {
            setCaptchaVerified(true);
          } else {
            showToast("Captcha не пройдена по v3", "error");
            setCaptchaVerified(false);
          }
        }
      }
    } catch (error) {
      showToast("Ошибка при верификации капчи!", "error");
      console.error("Captcha verification error:", error);
      setCaptchaVerified(false);
    }
  };

  const handleError = () => {
    // showToast(
    //   'Ошибка загрузки reCAPTCHA. Проверьте подключение к интернету.',
    //   'error',
    // );
  };

  return { captchaVerified, handleCaptcha, handleError };
};

export default useCaptchaHandler;
