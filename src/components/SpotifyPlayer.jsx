import { useState, useEffect, useRef } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <div className="fixed z-9999 top-6 right-10">
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        style={{
          padding: '10px 20px',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        className="spotify-btn fixed bottom-0 right-5"
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
        style={{
          position: 'fixed',
          width: '500px',
          bottom: '40px',
          right: '100px',
          borderRadius: '12px',
          padding: '10px 0 0',
        }}
        className="bg-cyan-700"
      >
        <h3
          className="text-2xl text-white"
          style={{ textAlign: 'center', marginBottom: '2px' }}
        >
          Выберите плейлист
        </h3>

        <div style={{ marginBottom: '15px' }}>
          {playlists.map((p, index) => (
            <button
              key={index}
              onClick={() => handlePlaylistChange(p.src)}
              style={{
                margin: '5px',
                padding: '6px',
                borderRadius: '10px',
                cursor: 'pointer',
                width: '95%',
                backgroundColor: currentSrc === p.src ? '#27235f' : '#06313d',
                fontWeight: currentSrc === p.src ? 'bold' : 'normal',
                color: 'white',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        <iframe
          id="spotifyPlayer"
          src={currentSrc}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: '12px' }}
          title="Spotify Player"
        />
      </motion.div>
    </div>
  );
};

export default SpotifyPlayer;
