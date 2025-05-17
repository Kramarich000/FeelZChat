import PrefetchLink from "@components/PrefetchLink";
import { SafeMotion } from "@components/SafeMotion";
import { AnimatePresence, motion } from "framer-motion";
import cookieBannerBg from "@assets/images/cookieBannerBg.svg";
import { FaCookieBite } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import translate from "@utils/translate";
import { useCookieStore } from "@store/useCookieStore";
import CookieSettingsModal from "@components/main-components/CookieSettingsModal";

export default function CookieBanner() {
  const { consent, setConsent, openModal, isModalOpen } = useCookieStore();

  return (
    <AnimatePresence mode="sync">
      {consent === null && (
        <div
          className="fixed w-full inset-x-0 bottom-0 flex justify-center px-4 z-52 lg:z-40"
          role="dialog"
          aria-modal="true"
        >
          <SafeMotion
            className="relative overflow-hidden flex text-sm sm:text-base max-w-[1280px] flex-col justify-center border-b-8 border-primary items-center bg-white m-0 mb-2 sm:m-4 p-2 sm:p-6 rounded-2xl shadow-lg"
            key="cookie-banner"
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={{
              opacity: 0,
              transform: "translateY(100px)",
              transition: { delay: 0, duration: 0.5 },
              pointerEvents: "none",
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
                {translate("key_privacy_policy")}.
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
                onClick={() => setConsent(false)}
              >
                {translate("ket_decline_btn")}
              </button>
              <button
                className="flex items-center justify-center w-[140px] h-[40px] order-0 xs:order-0 bg-primary m-2 transition rounded-xl px-4 py-2 z-4"
                onClick={() => setConsent(true)}
              >
                {translate("ket_accept_btn")}
              </button>
              <button
                className="block order-1 xs:order-[-1] sm:absolute left-2 bottom-2 group hover:!bg-transparent "
                onClick={() => openModal()}
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
      {isModalOpen && <CookieSettingsModal />}
    </AnimatePresence>
  );
}
