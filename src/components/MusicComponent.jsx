import { useEffect, useState } from 'react';
import translate from '@utils/translate';

export default function MusicComponent() {
  const [audio] = useState(new Audio('./music/bg-music.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.loop = true;
    return () => audio.pause();
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .catch(() => console.log('Автовоспроизведение заблокировано'));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="hidden fixed bottom-13 right-10 bg-primary text-white px-4 py-2 rounded-lg"
    >
      {isPlaying
        ? `${translate('key_stop_music')}`
        : `${translate('key_play_music')}`}
    </button>
  );
}
