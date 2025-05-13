import { useEffect, useState } from "react";

export const useLockBodyScroll = (lock = true) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      return;
    }

    // Для плавности используем transition для overflow
    document.body.style.transition = "overflow 0.3s ease"; // Плавный переход для overflow

    const timeout = setTimeout(() => {
      // Если `lock` — блокируем скролл на десктопе
      if (lock) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    }, 10); // Небольшая задержка перед изменением, чтобы предотвратить дергание

    return () => {
      clearTimeout(timeout);
      document.body.style.transition = ""; // Убираем transition, когда хук размонтируется
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [lock, isMobile]);
};
