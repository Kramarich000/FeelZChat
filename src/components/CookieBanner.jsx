import PrefetchLink from "@components/PrefetchLink";
import { SafeMotion } from "@components/SafeMotion";
import { loadAnalytics } from "@services/loadAnalytics";
import useLocalStorage from "@hooks/useLocalStorage";
import { useEffect } from "react";
import { AnimatePresence, delay } from "framer-motion";

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

  return (
    <AnimatePresence>
      {consent === null && (
        <div
          key="cookie-banner"
          className="fixed w-full inset-x-0 bottom-0 flex justify-center px-4 z-52 lg:z-40"
          role="dialog"
          aria-modal="true"
          on
        >
          <SafeMotion
            className="flex text-sm sm:text-base max-w-[1280px] flex-col justify-center border-b-8 border-primary items-center bg-white m-0 mb-2 sm:m-4 p-2 sm:p-4 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 100,
              transition: { delay: 0, duration: 0.5 },
            }}
            transition={{
              duration: 0.5,
              delay: 2,
            }}
          >
            <p className="text-center">
              Мы используем файлы cookie и собираем персональные данные для
              улучшения сайта и анализа трафика. Продолжая использовать сайт, вы
              соглашаетесь с обработкой данных.{" "}
              <PrefetchLink
                className="text-primary hover:underline"
                to="/privacy"
              >
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
      )}
    </AnimatePresence>
  );
}
