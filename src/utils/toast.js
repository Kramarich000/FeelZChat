import { toast } from "react-toastify";
import MobileDetect from "mobile-detect";

export const showToast = (message, type = "success") => {
  const md = new MobileDetect(window.navigator.userAgent);
  const isMobile = md.mobile();

  if (isMobile) return;

  toast(message, {
    type,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: false,
  });
};
