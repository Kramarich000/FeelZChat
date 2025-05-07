import PrefetchLink from "@components/PrefetchLink";
import { SafeMotion } from "@components/SafeMotion";
import { loadAnalytics } from "@services/loadAnalytics";
import useLocalStorage from "@hooks/useLocalStorage";
import { useEffect } from "react";

export default function CookieBanner() {
  const [consent, setConsent] = useLocalStorage("cookieAccepted", null);

  useEffect(() => {
    if (consent === "true") {
      loadAnalytics();
    }
  }, [consent]);

  const handleAcceptCookies = () => {
    setConsent("true");
  };

  const handleDeclineCookies = () => {
    setConsent("false");
  };

  if (consent !== null) return null;

  return (
    <div
      className="fixed w-full inset-x-0 bottom-0 flex justify-center px-4 z-52"
      role="dialog"
      aria-modal="true"
    >
      <SafeMotion
        className="flex text-sm sm:text-base max-w-[1280px] flex-col justify-center border-b-8 border-primary items-center bg-white m-0 mb-2 sm:m-4 p-2 sm:p-4 rounded-2xl shadow-lg"
        initial={{ opacity: 0, transform: "translateY(100px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p className="text-center">
          Мы используем файлы cookie для улучшения работы сайта и анализа
          трафика. Продолжая использовать сайт, вы соглашаетесь на использование
          cookie.{" "}
          <PrefetchLink className="text-primary hover:underline" to="/privacy">
            Политика конфиденциальности
          </PrefetchLink>
        </p>
        <div className="flex mt-3">
          <button
            className="sm:w-[200px] m-2 !text-primary !border-2 !border-primary transition rounded-xl px-4 py-2"
            onClick={handleDeclineCookies}
          >
            Отклонить
          </button>
          <button
            className="sm:w-[200px] m-2 bg-primary hover:brightness-110 transition rounded-xl px-4 py-2"
            onClick={handleAcceptCookies}
          >
            Принять
          </button>
        </div>
      </SafeMotion>
    </div>
  );
}
