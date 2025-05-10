import { useEffect } from "react";

export const useLockBodyScroll = (lock = true) => {
  const isMobile = window.innerWidth < 640;
  console.log(isMobile);
  useEffect(() => {
    if (lock && !isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lock]);
};
