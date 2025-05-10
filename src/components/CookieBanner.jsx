import PrefetchLink from "@components/PrefetchLink";
import { SafeMotion } from "@components/SafeMotion";
import { loadAnalytics } from "@services/loadAnalytics";
import useLocalStorage from "@hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cookieBannerBg from "@assets/images/cookieBannerBg.svg";
import { FaCookieBite } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Modal from "react-modal";
import CustomCheckbox from "@components/CustomCheckbox";
import translate from "@utils/translate";

Modal.setAppElement("#root");

export default function CookieBanner() {
  const [consent, setConsent] = useLocalStorage("cookieAccepted", null);
  const [isOpen, setIsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useLocalStorage(
    "analyticsEnabled",
    false,
  );
  useEffect(() => {
    if (consent === true && analyticsEnabled === true) {
      loadAnalytics();
    }
  }, [consent, analyticsEnabled]);
  useEffect(() => {
    if (consent === false) {
      setAnalyticsEnabled(false);
    }
  }, [consent]);
  const handleAcceptCookies = () => setConsent(true);
  const handleDeclineCookies = () => setConsent(false);
  const handleShowModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleToggleAnalytics = ({ checked }) => {
    setAnalyticsEnabled(checked);
  };
  return (
    <AnimatePresence mode="sync">
      {consent === null && (
        <div
          key="cookie-banner"
          className="fixed w-full inset-x-0 bottom-0 flex justify-center px-4 z-52 lg:z-40"
          role="dialog"
          aria-modal="true"
        >
          <SafeMotion
            className="overflow-hidden flex text-sm sm:text-base max-w-[1280px] flex-col justify-center border-b-8 border-primary items-center bg-white m-0 mb-2 sm:m-4 p-2 sm:p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={{
              opacity: 0,
              transform: "translateY(100px)",
              transition: { delay: 0, duration: 0.5 },
            }}
            transition={{
              duration: 0.5,
              delay: 0,
            }}
          >
            <p className="text-center text-[12px] sm:text-[14px]">
              {translate("key_use_cookie")}
              <FaCookieBite size={20} className="inline mr-1 text-primary" />
              {translate("key_use_cookie_text")}{" "}
              <PrefetchLink
                className="text-primary hover:underline"
                to="/privacy"
              >
                {translate("Privacy Policy")},
              </PrefetchLink>
            </p>
            {/* <CookieBannerBg className="absolute right-[-20px] bottom-[-20px] w-18 sm:w-20 " />
              <CookieBannerBg className="absolute right-[40px] bottom-[-30px] w-18 sm:w-20 " /> */}
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
                className="flex items-center justify-center w-[140px] h-[40px] order-1 xs:order-0 m-2 !text-primary hover:!text-white !border-2 !border-primary transition rounded-xl px-4 py-2"
                onClick={handleDeclineCookies}
              >
                {translate("ket_decline_btn")}
              </button>
              <button
                className="flex items-center justify-center w-[140px] h-[40px] order-0 xs:order-0 bg-primary m-2 transition rounded-xl px-4 py-2 z-4"
                onClick={handleAcceptCookies}
              >
                {translate("ket_accept_btn")}
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
      )}{" "}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Настройки конфиденциальности"
        className="flex justify-center items-center"
      >
        <SafeMotion
          className="relative bg-white max-w-[600px] sm:mx-auto border-b-8 overflow-hidden border-primary m-4 p-2 sm:p-6 rounded-2xl z-9999 shadow-lg"
          initial={{ transform: "translateY(-300px)", opacity: 0 }}
          animate={{ transform: "translateY(300px)", opacity: 1 }}
          exit={{
            transform: "translateY(-300px)",
            opacity: 0,
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.2 }}
        >
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
          <h2>{translate("key_privacy_settings")}</h2>
          <p>{translate("key_choose_type_of_data")}</p>
          <div className="mt-4 mr-auto">
            <label className="flex justify-start items-start">
              <CustomCheckbox
                disabled={true}
                checkedCookie={true}
                className="mr-2"
              />
              <span>{translate("key_mandatory_cookies")}</span>
            </label>
          </div>
          <div className="mt-4 mr-auto">
            <label className="flex">
              <CustomCheckbox
                disabled={false}
                checkedCookie={analyticsEnabled}
                onChange={handleToggleAnalytics}
                className="mr-2"
              />
              <span>{translate("key_consent_to_analytics")}</span>
            </label>
          </div>
          <button
            onClick={handleCloseModal}
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
          >
            {translate("key_save")}
          </button>
        </SafeMotion>
      </Modal>
    </AnimatePresence>
  );
}
