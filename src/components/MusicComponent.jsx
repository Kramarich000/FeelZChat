import { useEffect, useState } from "react";

export default function MusicComponent() {
  const [audio] = useState(new Audio("./music/bg-music.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.loop = true;
    return () => audio.pause(); 
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => console.log("Автовоспроизведение заблокировано"));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-13 right-10 bg-cyan-700 text-white px-4 py-2 rounded-lg"
    >
      {isPlaying ? "⏸ Остановить музыку" : "▶ Включить музыку"}
    </button>
  );
}
