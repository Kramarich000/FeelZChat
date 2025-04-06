import { useMemo } from "react";

const emotionColors = {
  positive: "rgba(0, 200, 83, 0.6)",      
  aggressive: "rgba(213, 0, 0, 0.6)",     
  anxious: "rgba(255, 145, 0, 0.6)",      
  sad: "rgba(41, 98, 255, 0.6)",          
  cognitive: "rgba(98, 0, 234, 0.6)",     
  neutral: "rgba(176, 190, 197, 0.6)",    
};

export default function useEmotionGradient(aggregated) {
  return useMemo(() => {
    if (!aggregated) return "";

    const entries = Object.entries(aggregated)
      .filter(([, value]) => value > 0);

    if (entries.length === 0) return "";

    const weightedColors = entries.flatMap(([emotion, value]) => {
      const color = emotionColors[emotion];
      if (!color) return []
      const weight = Math.round(value * 2); 
      return Array(weight).fill(color);
    });

    if (weightedColors.length === 0) return "";

    const shuffled = weightedColors.sort(() => Math.random() - 0.5);

    return `linear-gradient(45deg, ${shuffled.join(", ")})`;
  }, [aggregated]);
}
