import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
export default function VideoFrame() {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!loaded) {
        setFailed(true);
      }
    }, 60000);

    return () => clearTimeout(timerRef.current);
  }, [loaded]);

  return (
    <motion.div
      className="w-full h-[650px] relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {failed ? (
        <div className="w-full h-full flex items-center justify-center bg-black text-center">
          <p className="text-primary text-4xl font-bold w-[700px]">
            Видео недоступно. Проверьте подключение к интернету или попробуйте
            позже.
          </p>
        </div>
      ) : (
        <motion.iframe
          sandbox="allow-scripts allow-same-origin allow-presentation"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          // transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full h-[650px]"
          src="https://www.youtube.com/embed/-U8rukzWCNs"
          title="Видео"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => {
            clearTimeout(timerRef.current);
            setLoaded(true);
          }}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      )}
      {!loaded && !failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black animate-pulse">
          <span className="text-primary text-4xl font-bold">
            Загрузка видео...
          </span>
        </div>
      )}
    </motion.div>
  );
}
