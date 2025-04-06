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
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {isPlaying ? "⏸ Остановить музыку" : "▶ Включить музыку"}
    </button>
  );
}
