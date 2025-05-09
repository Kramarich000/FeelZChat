import MobileDetect from "mobile-detect";
import { toast } from "react-toastify";

const md = new MobileDetect(window.navigator.userAgent);
const isMobileUA = Boolean(md.mobile());

let currentToastId = null;

export const showToast = (message, type = "success") => {
  const isMobile = isMobileUA || window.innerWidth < 640;

  const options = {
    type,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: false,
    pauseOnFocusLoss: false,
  };

  if (isMobile) {
    if (currentToastId && toast.isActive(currentToastId)) {
      toast.update(currentToastId, {
        render: message,
        ...options,
      });
    } else {
      currentToastId = toast(message, options);
    }
  } else {
    toast(message, options);
  }
};
