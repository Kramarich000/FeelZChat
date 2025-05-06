import { toast } from "react-toastify";
import { useResponsive } from "@hooks/useResponsive";
export const showToast = (message, type = "success") => {
  const { isMobile } = useResponsive();

  // if (isMobile) return;

  toast(message, {
    type,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: false,
    pauseOnFocusLoss: false,
  });
};
