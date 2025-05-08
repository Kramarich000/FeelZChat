import { useEffect, useMemo, useState } from "react";
import { useSpring, animated } from "react-spring";
import useEmotionGradient from "@hooks/useEmotionGradient";
import useLocalStorage from "@hooks/useLocalStorage";

export default function BgChatGradient({ aggregated, children }) {
  const { gradient: currentGradient, textColor: currentTextColor } =
    useEmotionGradient(aggregated);

  const [storedGradient, setStoredGradient] = useLocalStorage("chatGradient", {
    gradient: "",
    textColor: "#ffffff",
  });
  const [displayedGradient, setDisplayedGradient] = useState(
    storedGradient.gradient,
  );
  const [displayedTextColor, setDisplayedTextColor] = useState(
    storedGradient.textColor,
  );

  const [fadeInStyle, api] = useSpring(() => ({
    opacity: 0,
    config: { tension: 120, friction: 14 },
  }));

  useEffect(() => {
    if (currentGradient && currentGradient !== displayedGradient) {
      setStoredGradient({
        gradient: currentGradient,
        textColor: currentTextColor,
      });

      api.start({ opacity: 1, from: { opacity: 0 } });
      const timer = setTimeout(() => {
        setDisplayedGradient(currentGradient);
        setDisplayedTextColor(currentTextColor);
        api.start({ opacity: 0 });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [
    currentGradient,
    currentTextColor,
    displayedGradient,
    api,
    setStoredGradient,
  ]);

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
      className="bg-chat-gradient-container z-0 absolute w-full h-full"
      style={{ color: displayedTextColor, transition: "color 1.2s ease" }}
    >
      <div
        className="gradient-layer base absolute inset-0 z-0"
        style={{
          ...layerStyle,
          backgroundImage: displayedGradient,
          mixBlendMode: "screen",
        }}
      />
      <animated.div
        className="gradient-layer overlay absolute inset-0 z-1"
        style={{
          ...layerStyle,
          backgroundImage: currentGradient,
          mixBlendMode: "overlay",
          opacity: fadeInStyle.opacity,
        }}
      />
      <div className="relative z-2">{children}</div>
      <style>{`
        @keyframes moveGradient {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }

        @keyframes rotateGradient {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(45deg); }
          100% { filter: hue-rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
