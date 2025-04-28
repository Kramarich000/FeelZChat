import React, { useEffect, useMemo } from "react";
import { useSpring, animated } from "react-spring";

import useEmotionGradient from "@hooks/useEmotionGradient";
import useLocalStorage from "@hooks/useLocalStorage";

export default function BgChatGradient({ aggregated, children }) {
  const currentGradient = useEmotionGradient(aggregated);
  const [displayedGradient, setDisplayedGradient] = useLocalStorage(
    "prevGradient",
    currentGradient,
  );

  const [fadeInStyle, api] = useSpring(() => ({
    opacity: 0,
    config: { tension: 120, friction: 14 },
  }));

  useEffect(() => {
    if (currentGradient && currentGradient !== displayedGradient) {
      api.start({
        opacity: 1,
        from: { opacity: 0 },
      });

      const timer = setTimeout(() => {
        setDisplayedGradient(currentGradient);
        api.start({ opacity: 0 });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [currentGradient, displayedGradient, api, setDisplayedGradient]);

  const layerStyle = useMemo(
    () => ({
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "300% 300%",
      filter: "blur(20px)",
      transition: "filter 1.2s ease, background-image 1.2s ease",
      animation:
        "moveGradient 8s ease-in-out infinite, rotateGradient 12s ease-in-out infinite",
    }),
    [],
  );

  return (
    <div
      className="bg-chat-gradient-container z-0"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <div
        className="gradient-layer base"
        style={{
          ...layerStyle,
          backgroundImage: displayedGradient,
          mixBlendMode: "screen",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />
      <animated.div
        className="gradient-layer overlay"
        style={{
          ...layerStyle,
          backgroundImage: currentGradient,
          mixBlendMode: "overlay",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: fadeInStyle.opacity,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      <style>{`
        @keyframes moveGradient {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }

        @keyframes rotateGradient {
          0% { background-position: 0% 0%; filter: hue-rotate(0deg); }
          50% { background-position: 100% 100%; filter: hue-rotate(45deg); }
          100% { background-position: 0% 0%; filter: hue-rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
