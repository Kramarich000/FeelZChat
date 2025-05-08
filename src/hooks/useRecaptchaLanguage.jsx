import { useEffect } from "react";
import useLocalStorage from "@hooks/useLocalStorage";

const RECAPTCHA_SITE_KEY = "6Le7Zw0rAAAAAHKsGR0i4ohPDQTK51JovR46dhnL";

const useRecaptchaLanguage = () => {
  const [language] = useLocalStorage("language", "ru");

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src*="recaptcha/api.js"]`,
    );

    if (existingScript && existingScript.src.includes(`hl=${language}`)) {
      console.log("Recaptcha script already exists for this language");
      return;
    }

    if (existingScript) {
      console.log("Removing old Recaptcha script");
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}&hl=${language}`;
    script.async = true;
    script.defer = true;

    console.log("Adding Recaptcha script");
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Recaptcha script loaded");
    };

    return () => {
      console.log("Cleaning up Recaptcha script");
      if (window.grecaptcha) {
        try {
          window.grecaptcha.reset();
        } catch (error) {
          console.warn("Error resetting Recaptcha:", error);
        }
      }
      script.remove();
    };
  }, [language]);
};

export default useRecaptchaLanguage;
