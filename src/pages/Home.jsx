import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import { motion } from 'framer-motion';
import Footer from '@components/Footer';
import translate from '@utils/translate';
import EmtnAnlsys from '@assets/images/emotion-analysis.jpg';
import mainVideo from '@assets/videos/main-bg.mp4';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import VideoFrame from '@components/VideoFrame';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      setIsModalOpen(true);
      localStorage.setItem('hasVisited', 'true');
    }
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
  const [isLoaded, setIsLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="w-full mx-auto min-h-screen absolute top-0 left-0">
      <Header />
      <motion.video
        src={mainVideo}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        loading="lazy"
        className="z-[-100] absolute top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
        onLoadedData={handleVideoLoad}
      />
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
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
              className="bg-cyan-700 hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
            >
              {translate('key_close')}
            </button>
          </div>
        </motion.div>
      )}

      <motion.section
        className="main-section min-h-screen flex items-center justify-center text-center bg-opacity-40 p-4 backdrop-blur-[2px]"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <div className="max-w-3xl mx-auto p-4 rounded-4xl">
          <h2 className="text-4xl font-bold mb-4">
            {translate('key_welcome_to_feelzchat')},
          </h2>
          <p className="text-lg mb-8">{translate('key_discover_a_new')}</p>
          <Link
            to="/register"
            className="bg-cyan-700 hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
          >
            {translate('key_start_chatting')}
          </Link>
        </div>
      </motion.section>

      <section className="pt-6 items-center gap-5 flex flex-col justify-center bg-gray-900 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.13 }}
          className="text-white text-4xl font-bold"
        >
          {translate('key_features')}
        </motion.h2>
        <div className="flex gap-5 flex-wrap items-center justify-center">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              className={`bg-white feature-item p-4 rounded-lg h-[120px] max-w-[400px]`}
              initial={{ opacity: 0, y: 20 * index }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.33 }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full py-12 text-center p-4 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold mb-8">
          {translate('key_see_how_it_works')}
        </h2>

        <div className="max-w-7xl mx-auto gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mx-auto max-w-[1000px]">
            <img
              src={EmtnAnlsys}
              alt="Emotion Analysis"
              loading="lazy"
              className="w-full mb-4 h-[500px] object-cover rounded-lg object-top"
            />
            <VideoFrame />
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center gap-4 w-full py-12 p-4 pb-0 text-center bg-gray-900 text-white">
        <Link
          to="/login"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          {translate('key_sign_in')}
        </Link>
        <p className="text-2xl">{translate('key_or')}</p>
        <Link
          to="/register"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          {translate('key_sign_up')}
        </Link>
      </section>

      <Footer />
    </div>
  );
}
