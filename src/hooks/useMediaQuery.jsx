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
    } else {
      console.warn(
        "MediaQueryList.addEventListener is not supported in this browser. Media query changes won't be detected.",
      );
      setMatches(mq.matches);
      return;
    }

    setMatches(mq.matches);

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      }
    };
  }, [query]);

  return matches;
}
