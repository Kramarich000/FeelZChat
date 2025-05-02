import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import { motion } from 'framer-motion';
import Footer from '@components/Footer';
import { useInView } from 'framer-motion';
import translate from '@utils/translate';
import EmtnAnlsysJPG from '@assets/images/emotion-analysis.jpg';
import EmtnAnlsysWEBP from '@assets/images/emotion-analysis.webp';
// import mainVideo from '@assets/videos/main-bg.mp4';
// import { opacity } from '@cloudinary/url-gen/actions/adjust';
import VideoFrame from '@components/VideoFrame';
// import BgGradient from '@components/BgGradient';
// import { ItemIndicator } from '@radix-ui/react-select';
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      setIsModalOpen(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: translate('key_emotion_analysis'),
      id: 1,
      description: translate('key_ai_analyzes_the'),
      animated: true,
    },
    {
      title: translate('key_security'),
      id: 2,
      description: translate('key_messages_protected'),
      animated: true,
    },
    {
      title: translate('key_intuitive_interface'),
      id: 3,
      description: translate('key_user_friendly_interface'),
      animated: true,
    },
  ];
  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="home-container w-full mx-auto absolute top-0 left-0">
      <Header />
      {/* <BgGradient> */}
      {/* <motion.video
        src={mainVideo}
        kind="options"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        loading="lazy"
        className="z-[-100] absolute top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[1300px] w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
        onLoadedData={handleVideoLoad}
      /> */}
      {/* </BgGradient> */}

      {isModalOpen && (
        <motion.div
          className="fixed z-9999 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h3 className="text-xl font-bold mb-4">
              {translate('key_new_features')}
            </h3>
            <p className="text-gray-700 mb-6">
              {translate('key_what_has_changed')}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-primary hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
            >
              {translate('key_close')}
            </button>
          </div>
        </motion.div>
      )}

      <motion.section
        className="main-section min-h-screen flex items-center justify-center text-center bg-opacity-40 p-4 backdrop-blur-[2px]"
        layout
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.div
          className="main-description max-w-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.5)] bg-white border-b-8 border-primary mx-auto p-10 rounded-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            {translate('key_welcome_to_feelzchat')},
          </h1>
          <p className="text-lg mb-8">{translate('key_discover_a_new')}</p>
          <Link
            to="/register"
            className="bg-primary hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
          >
            {translate('key_start_chatting')}
          </Link>
        </motion.div>
      </motion.section>

      <section className="p-6 items-center gap-5 flex flex-col w-full justify-center bg-gray-900 mx-auto">
        <motion.h2
          initial={{ opacity: 0, transform: 'translateY(-20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.13 }}
          className="text-white text-4xl font-bold"
        >
          {translate('key_features')}
        </motion.h2>
        <div
          ref={ref}
          className="flex gap-5 flex-wrap items-center justify-center"
        >
          {features.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg min-h-[150px] max-w-[400px] opacity-0 border-primary border-b-8"
              style={{
                animationName: isInView ? 'fade-in-up' : undefined,
                animationDuration: '0.5s',
                animationTimingFunction: 'ease',
                animationFillMode: 'forwards',
                animationDelay: isInView ? `${index * 0.2}s` : '0s',
              }}
            >
              <h3 className="font-bold text-2xl mb-2">{item.title}</h3>
              <p className="text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-12 text-center p-4 bg-gray-900 text-white">
        <motion.h2
          initial={{ opacity: 0, transform: 'translateY(-20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.13 }}
          className="text-4xl font-bold mb-8"
        >
          {translate('key_see_how_it_works')}
        </motion.h2>

        <div className="max-w-7xl mx-auto gap-8">
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(-20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.13 }}
            className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 shadow-md text-center mx-auto max-w-[1000px] border-primary border-b-8"
          >
            <picture className="aspect-w-16 aspect-h-9">
              <source srcSet={EmtnAnlsysWEBP} type="image/webp" />
              <img
                src={EmtnAnlsysJPG}
                alt="Emotion Analysis"
                loading="lazy"
                className="w-full h-full object-cover rounded-lg object-top"
              />
            </picture>

            <VideoFrame />
          </motion.div>
        </div>
      </section>

      <section className="flex justify-center items-center gap-4 w-full pt-12 px-4 text-center bg-gray-900 text-white">
        <motion.p
          initial={{ opacity: 0, transform: 'translateY(10px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            initial={{ opacity: 0, transform: 'translateY(10px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            to="/login"
            className="text-2xl hover:underline text-primary font-bold"
          >
            {translate('key_sign_in')}
          </Link>
        </motion.p>
        <p className="text-2xl">{translate('key_or')}</p>
        <motion.p
          initial={{ opacity: 0, transform: 'translateY(10px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/register"
            className="text-2xl hover:underline text-primary font-bold"
          >
            {translate('key_sign_up')}
          </Link>
        </motion.p>
      </section>

      <Footer />
    </div>
  );
}
