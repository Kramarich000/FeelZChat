import { captcha } from "@services/captcha";
import { showToast } from "../utils/toast";

const handleCaptcha = async (token) => {
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
      return null;
    }
  };
  if (!token) {
    showToast.error("Ошибка: капча не пройдена");
    return;
  }

  try {
    const verificationResultV2 = await captcha(token, "v2");

    if (verificationResultV2.success && verificationResultV2.score >= 0.5) {
      console.log(verificationResultV2);
      setCaptchaVerified(true);
      // showToast("Captcha пройдена по v2!", "success");
    } else {
      setCaptchaVerified(false);
      // showToast("Captcha не пройдена по v2, пробуем v3.", "error");

      const tokenV3 = await executeRecaptchaV3();

      if (tokenV3) {
        const verificationResultV3 = await captcha(tokenV3, "v3");

        if (verificationResultV3.success && verificationResultV3.score >= 0.5) {
          setCaptchaVerified(true);
          // showToast("Captcha пройдена по v3!", "success");
        } else {
          setCaptchaVerified(false);
          // showToast("Captcha не пройдена по v3!", "error");
        }
      } else {
        // showToast("Ошибка: не удалось получить токен для v3", "error");
      }
    }
  } catch (error) {
    showToast("Ошибка при верификации капчи!", "error");
    console.error("Captcha verification error:", error);
  }
};

export default handleCaptcha;
