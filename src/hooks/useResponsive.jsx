import useMediaQuery from "@hooks/useMediaQuery";
import { useState, useEffect } from "react";

export function useResponsive() {
  const [hasMounted, setHasMounted] = useState(false);

  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasMounted,
  };
}
