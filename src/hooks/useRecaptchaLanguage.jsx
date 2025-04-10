import { useEffect } from "react";
import useLocalStorage from "@hooks/useLocalStorage";
const useRecaptchaLanguage = () => {
  const [language] = useLocalStorage('language', 'ru'); 

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?hl=${language}`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [language]); 
};

export default useRecaptchaLanguage;
