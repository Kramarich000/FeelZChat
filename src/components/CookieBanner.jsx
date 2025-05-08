import PrefetchLink from "@components/PrefetchLink";
import { SafeMotion } from "@components/SafeMotion";
import { loadAnalytics } from "@services/loadAnalytics";
import useLocalStorage from "@hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import cookieBannerBg from "@assets/images/cookieBannerBg.svg";
import { FaCookieBite } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function CookieBanner() {
  const [consent, setConsent] = useLocalStorage("cookieAccepted", null);
  const [isOpen, setIsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useLocalStorage(
    "analyticsEnabled",
    false,
  );

  useEffect(() => {
    console.log("consent", typeof consent);
    console.log("analyticsEnabled", typeof analyticsEnabled);
    console.log("consent", consent);
    console.log("analyticsEnabled", analyticsEnabled);
    if (consent === "true" && analyticsEnabled === true) {
      loadAnalytics();
    }
  }, [consent, analyticsEnabled]);

  useEffect(() => {
    if (consent === null || consent === "false") {
      setAnalyticsEnabled(false);
    }
  }, [consent]);
  const handleAcceptCookies = () => {
    setConsent("true");
  };

  const handleDeclineCookies = () => {
    setConsent("false");
  };

  const handleShowModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleToggleAnalytics = (event) => {
    setAnalyticsEnabled(event.target.checked);
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
            className="overflow-hidden relative flex text-sm sm:text-base max-w-[1280px] flex-col justify-center border-b-8 border-primary items-center bg-white m-0 mb-2 sm:m-4 p-2 sm:p-6 rounded-2xl shadow-lg"
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
            <p className="text-center text-[12px] sm:text-[14px]">
              Мы используем файлы cookie{" "}
              <FaCookieBite size={20} className="inline text-primary" /> и
              собираем персональные данные для улучшения сайта и анализа
              трафика. Продолжая использовать сайт, вы соглашаетесь с обработкой
              данных.{" "}
              <PrefetchLink
                className="text-primary hover:underline"
                to="/privacy"
              >
                Политика конфиденциальности
              </PrefetchLink>
            </p>

            <img
              src={cookieBannerBg}
              className="absolute right-[-20px] bottom-[-20px] w-18 sm:w-20 "
              alt=""
            />

            <img
              src={cookieBannerBg}
              className="absolute right-[40px] bottom-[-30px] w-18 sm:w-20 "
              alt=""
            />

            <div className="flex flex-col xs:flex-row mt-3 items-center">
              <button
                className="sm:max-w-[200px] order-1 xs:order-0 m-2 !text-primary hover:!text-white !border-2 !border-primary transition rounded-xl px-4 py-2"
                onClick={handleDeclineCookies}
              >
                Отклонить
              </button>
              <button
                className="sm:max-w-[200px] m-2 bg-primary transition rounded-xl px-4 py-2 z-2"
                onClick={handleAcceptCookies}
              >
                Принять
              </button>
              <button
                className="block order-1 xs:order-[-1] sm:absolute left-2 bottom-2 group hover:!bg-transparent "
                onClick={handleShowModal}
              >
                <IoMdSettings
                  size={40}
                  className="text-primary transition-colors group-hover:!fill-black"
                />
              </button>
            </div>
          </SafeMotion>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Настройки конфиденциальности"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            border: "1px solid #ccc",
            background: "#fff",
            borderRadius: "8px",
          },
        }}
      >
        <h2>Настройки конфиденциальности</h2>
        <p>
          Вы можете выбрать, какие типы сбора данных разрешены для работы на
          сайте.
        </p>
        <div className="mt-4">
          <label>
            <input type="checkbox" checked={true} disabled className="mr-2" />
            <span>Обязательные файлы cookie (необходимы для работы сайта)</span>
          </label>
        </div>
        <div className="mt-4">
          <label>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={handleToggleAnalytics}
              className="mr-2"
            />
            <span>
              Согласие на использование аналитики (Google Analytics, Yandex
              Metrics, Hotjar)
            </span>
          </label>
        </div>
        <button
          onClick={handleCloseModal}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Сохранить
        </button>
      </Modal>
    </AnimatePresence>
  );
}
