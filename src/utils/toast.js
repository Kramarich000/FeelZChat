import { Bounce, Flip, Slide, toast } from "react-toastify";

export const showToast = (message, type = "success") => {
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
