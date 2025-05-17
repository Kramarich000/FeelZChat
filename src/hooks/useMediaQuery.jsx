import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  const getInitialMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getInitialMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
    } else if (mq.addListener) {
      mq.addListener(handler);
    }

    setMatches(mq.matches);

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else if (mq.removeListener) {
        mq.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
