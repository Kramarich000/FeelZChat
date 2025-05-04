import { toast } from "react-toastify";

export const showToast = (message, type = "success") => {
  const isMobile = window.matchMedia("only screen and (max-width: 639px)").matches;

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
    pauseOnFocusLoss: false,
  });
};
