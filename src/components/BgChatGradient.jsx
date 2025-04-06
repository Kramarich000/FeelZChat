import React from "react";
import useEmotionGradient from "../hooks/useEmotionGradient";

export default function BgChatGradient({ aggregated, children }) {
  const gradient = useEmotionGradient(aggregated);  

  return (
    <div className="bg-chat-gradient-container"
      style={{
        backgroundImage: gradient,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
}
