import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SafeMotion } from '@components/SafeMotion';
import { FaYoutube } from 'react-icons/fa';

export default function VideoFrame() {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef(null);
  const [loadingStarted, setLoadingStarted] = useState(false);

  const handlePlayClick = () => {
    setLoadingStarted(true);
  };

  // useEffect(() => {
  //   timerRef.current = setTimeout(() => {
  //     if (!loaded) {
  //       setFailed(true);
  //     }
  //   }, 60000);

  //   return () => clearTimeout(timerRef.current);
  // }, [loaded]);

  return (
    <SafeMotion
      className="w-full h-[250px] sm:h-[300px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {failed ? (
        <div className="w-full h-full flex items-center justify-center bg-black text-center">
          <p className="text-primary text-sm sm:text-4xl font-bold w-[700px]">
            Видео недоступно. Проверьте подключение к интернету или попробуйте
            позже.
          </p>
        </div>
      ) : (
        <>
          {!loadingStarted && (
            <div
              className="w-full h-full flex items-center justify-center bg-black "
              onClick={handlePlayClick}
            >
              <div className="flex flex-col items-center cursor-pointer">
                <img
                  src="https://img.youtube.com/vi/-U8rukzWCNs/hqdefault.jpg"
                  alt="Video thumbnail"
                  className="w-full h-[250px] sm:h-[300px] md:h-[500px] object-contain"
                />
                <FaYoutube
                  className="absolute top-[45%] "
                  size={75}
                  color="red"
                />
              </div>
            </div>
          )}
          {loadingStarted && (
            <SafeMotion
              as="iframe"
              src="https://www.youtube.com/embed/-U8rukzWCNs?autoplay=1"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="w-full h-[250px] sm:h-[300px] md:h-[500px]"
              title="Видео"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
              onLoad={() => {
                clearTimeout(timerRef.current);
                setLoaded(true);
              }}
              style={{
                visibility: loaded ? 'visible' : 'hidden',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />
          )}
        </>
      )}

      {!loaded && loadingStarted && !failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black animate-pulse">
          <span className="text-primary text-2xl sm:text-4xl font-bold">
            Загрузка видео...
          </span>
        </div>
      )}
    </SafeMotion>
  );
}
