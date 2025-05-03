import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SafeMotion } from '@components/SafeMotion';
const playlists = [
  {
    name: '🔥 Русские Хиты',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXbTxeAdrVG2l',
  },
  {
    name: '🎧 Lo-Fi Chill',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO',
  },
  {
    name: '🎶 Популярное сейчас',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
  },
  {
    name: '🕺 Ретро Вечеринка',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0UrRvztWcAU',
  },
  {
    name: '💻 Coding Focus',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS',
  },
  {
    name: '🌌 Synthwave/Retrowave',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX2TRYkJECvfC',
  },
  {
    name: '🎤 Русский Рэп',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd',
  },
  {
    name: '🧘 Chill Vibes',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6',
  },
  {
    name: '💔 Русская Лирика',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX5Tw2K0oe43O',
  },
  {
    name: '🎸 Альтернатива',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZtZ8vUCzche',
  },
];

const SpotifyPlayer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const playerRef = useRef(null);

  useEffect(() => {
    const savedSrc = localStorage.getItem('selectedPlaylist');
    if (savedSrc) {
      setCurrentSrc(savedSrc);
    } else {
      setCurrentSrc(playlists[0].src);
    }
  }, []);

  useEffect(() => {
    if (currentSrc) {
      localStorage.setItem('selectedPlaylist', currentSrc);
    }
  }, [currentSrc]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        playerRef.current &&
        !playerRef.current.contains(event.target) &&
        !event.target.closest('.spotify-btn')
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePlaylistChange = (src) => {
    setCurrentSrc(src);
  };

  return (
    <div className="fixed z-9998 top-6 right-10">
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="spotify-btn fixed bottom-0 right-5 min-w-[195px] py-[10px] px-[20px] border-r-[10px] cursor-pointer"
      >
        {isVisible ? '♪ Скрыть плеер' : '♪ Показать плеер'}
      </button>

      <motion.div
        ref={playerRef}
        initial={{ visibility: 'hidden', opacity: 0 }}
        animate={{
          visibility: isVisible ? 'visible' : 'hidden',
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 100,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="bg-primary fixed max-w-[500px] bottom-[40px] right-[100px] rounded-4xl pt-[5px] px-0 pb-0"
      >
        <h3 className="text-2xl text-white text-center mb-[2px]">
          Выберите плейлист
        </h3>

        <div className="mb-4">
          {playlists.map((p, index) => (
            <button
              key={index}
              className={`
                m-1 
                p-[6px] 
                border-r-[10px] 
                cursor-pointer 
                w-[95%] 
                ${currentSrc === p.src ? 'bg-[#124f60] font-bold' : 'bg-[#124f60] font-normal'} 
                text-white
              `}
              onClick={() => handlePlaylistChange(p.src)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <iframe
          id="spotifyPlayer"
          src={currentSrc}
          className="rounded-[20px]"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
        />
      </motion.div>
    </div>
  );
};

export default SpotifyPlayer;
