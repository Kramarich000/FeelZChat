import { SafeMotion } from "@components/SafeMotion";
import Modal from "react-modal";
import CustomCheckbox from "@components/CustomCheckbox";
import cookieBannerBg from "@assets/images/cookieBannerBg.svg";
import translate from "@utils/translate";
import { useCookieStore } from "@store/useCookieStore";

Modal.setAppElement("#root");

export default function CookieSettingsModal() {
  const {
    isModalOpen,
    closeModal,
    analyticsEnabled,
    toggleAnalytics,
    setConsent,
  } = useCookieStore();

  const handleSave = () => {
    setConsent(analyticsEnabled);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Privacy Settings"
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
          alt="cookie-banner"
        />
        <img
          src={cookieBannerBg}
          className="absolute right-[40px] bottom-[-30px] w-18 sm:w-20 "
          alt="cookie-banner"
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
              onChange={({ checked }) => toggleAnalytics(checked)}
              className="mr-2"
            />
            <span>{translate("key_consent_to_analytics")}</span>
          </label>
        </div>
        <button
          onClick={() => {
            setConsent(analyticsEnabled);
            closeModal();
          }}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          {translate("key_save")}
        </button>
      </SafeMotion>
    </Modal>
  );
}
