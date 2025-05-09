import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import useLocalStorage from "@hooks/useLocalStorage";

const playlists = [
  {
    name: "Русские Хиты",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DXbTxeAdrVG2l",
  },
  {
    name: "Lo-Fi Chill",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO",
  },
  {
    name: "Популярное сейчас",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
  {
    name: "Ретро Вечеринка",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0UrRvztWcAU",
  },
  {
    name: "Coding Focus",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS",
  },
  {
    name: "Synthwave/Retrowave",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX2TRYkJECvfC",
  },
  {
    name: "Русский Рэп",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd",
  },
];

const SpotifyPlayer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false);
  const [iframeHidden, setIframeHidden] = useState(false);
  const [currentSrc, setCurrentSrc] = useLocalStorage(
    "selectedPlaylist",
    playlists[0]?.src ?? "",
  );
  const hideTimeoutRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      clearTimeout(hideTimeoutRef.current);
      setShouldRenderIframe(true);
      setIframeHidden(false);
    } else {
      setIframeHidden(true);
      hideTimeoutRef.current = setTimeout(() => {
        setShouldRenderIframe(false);
      }, 300);
    }

    return () => clearTimeout(hideTimeoutRef.current);
  }, [isVisible]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        playerRef.current &&
        !playerRef.current.contains(event.target) &&
        !event.target.closest(".spotify-btn")
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlaylistChange = (src) => {
    setCurrentSrc(src);
    setIsIframeLoaded(false);
  };

  return (
    <div className="sm:fixed z-51 sm:top-6 sm:right-10">
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="spotify-btn relative z-9998 top-[18em] sm:[top:unset] !text-[14px] sm:!text-base !p-[4px] sm:!p-2 sm:fixed bottom-2 sm:bottom-4 sm:right-[63px] min-w-[195px] cursor-pointer"
      >
        <span className="sm:hidden flex items-center justify-center">
          {isVisible ? <IoCloseOutline size={21} /> : "♪"}
        </span>
        <span className="hidden sm:block">
          {isVisible ? "♪ Скрыть плеер" : "♪ Показать плеер"}
        </span>
      </button>

      <motion.div
        ref={playerRef}
        initial={{ visibility: "hidden", opacity: 0 }}
        animate={{
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
          transform: `translateX(${isVisible ? 0 : 100}px)`,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="bg-primary overflow-auto z-9999 max-h-[512px] m-[10px] fixed max-w-[500px] bottom-[40px] sm:bottom-[60px] right-0 sm:right-[100px] rounded-tl-[20px] rounded-bl-[20px] pt-[10px] px-0 pb-0"
      >
        <div className="spotify-container">
          <button
            onClick={() => setIsVisible((prev) => !prev)}
            className="absolute !p-0 top-[5px] right-[20px] cursor-pointer"
          >
            <IoCloseOutline size={35} />
          </button>
          {!isIframeLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <span className="text-primary text-2xl sm:text-4xl font-bold">
                Загрузка плеера...
              </span>
            </div>
          ) : (
            <>
              <h3 className="text-base sm:text-2xl text-white text-center mb-[2px]">
                Выберите плейлист
              </h3>
              <div className="mb-4">
                {playlists.map((p, index) => (
                  <button
                    key={index}
                    className={`
                  playlist-btn
                  m-1 
                  text-[14px]
                  sm:text-[16px]
                  p-0
                  sm:h-[40px]
                  border-r-[10px] 
                  cursor-pointer 
                  w-[95%] 
                  ${currentSrc === p.src ? "bg-[#0c333f] font-bold" : "bg-[#134f5f77] font-normal"} 
                  text-white
                `}
                    onClick={() => handlePlaylistChange(p.src)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </>
          )}
          {shouldRenderIframe && (
            <iframe
              id="spotifyPlayer"
              src={currentSrc}
              className={`
                  rounded-[20px] 
                  border-0 
                  overflow-hidden 
                  transition-all 
                  duration-300 
                  ease-in-out 
                  ${iframeHidden ? "opacity-0 scale-95" : "opacity-100 scale-100"}
                `}
              width="492"
              height="500"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
              onLoad={() => setIsIframeLoaded(true)}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SpotifyPlayer;
