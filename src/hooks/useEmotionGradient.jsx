import { useMemo } from "react";

const emotionColors = {
  positive: "rgba(0, 200, 83, 0.6)",
  aggressive: "rgba(213, 0, 0, 0.6)",
  anxious: "rgba(255, 145, 0, 0.6)",
  sad: "rgba(41, 98, 255, 0.6)",
  cognitive: "rgba(98, 0, 234, 0.6)",
  neutral: "rgba(176, 190, 197, 0.6)",
};

function getAverageLuminance(colors) {
  const total = colors.reduce((sum, rgba) => {
    const [r, g, b] = rgba
      .match(/rgba?\(([^)]+)\)/)[1]
      .split(",")
      .map((v) => parseFloat(v.trim()));
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return sum + lum;
  }, 0);
  return total / colors.length;
}

export default function useEmotionGradient(aggregated) {
  return useMemo(() => {
    if (!aggregated) return { gradient: "", textColor: "#ffffff" };

    const entries = Object.entries(aggregated).filter(([, v]) => v > 0);
    const weighted = entries.flatMap(([e, v]) => {
      const c = emotionColors[e];
      if (!c) return [];
      const w = Math.round(v * 2);
      return Array(w).fill(c);
    });
    if (!weighted.length) return { gradient: "", textColor: "#ffffff" };

    const shuffled = weighted.sort(() => Math.random() - 0.5);
    const gradient = `linear-gradient(45deg, ${shuffled.join(", ")})`;

    const avgLum = getAverageLuminance(shuffled);
    const textColor = avgLum > 128 ? "#000000" : "#ffffff";

    return { gradient, textColor };
  }, [aggregated]);
}
