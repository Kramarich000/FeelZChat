import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import { motion } from 'framer-motion';
import Footer from '@components/Footer';
import translate from '../utils/translate';
import EmtnAnlsys from '@assets/images/emotion-analysis.jpg';
import mainVideo from '@assets/videos/main-bg.mp4';
import ReactPlayer from 'react-player';
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
      description: translate('key_ai_analyzes_the'),
      animated: true,
    },
    {
      title: translate('key_security'),
      description: translate('key_messages_protected'),
      animated: true,
    },
    {
      title: translate('key_intuitive_interface'),
      description: translate('key_user_friendly_interface'),
      animated: true,
    },
  ];
  return (
    <div className="w-full min-h-screen absolute top-0 left-0">
      <Header />
      <video
        src={mainVideo}
        autoPlay
        muted
        loop
        className="z-[-100] absolute top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto object-cover"
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

      <section className="w-full py-12 text-center p-4 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold mb-8">
          {translate('key_see_how_it_works')}
        </h2>

        <div className="max-w-7xl mx-auto gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mx-auto max-w-[1000px]">
            <img
              src={EmtnAnlsys}
              alt="Emotion Analysis"
              className="w-full mb-4 h-[500px] object-cover rounded-lg object-top"
            />
            <iframe
              className="w-full h-[500px]"
              src="https://www.youtube.com/embed/-U8rukzWCNs"
              title="Sentiment Analysis &amp; Emotional Classification with GPT-4"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            >
              {translate('key_video_not_supported')}
            </iframe>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center gap-4 w-full py-12 p-4 pb-0 text-center bg-gray-900 text-white">
        <Link
          to="/register"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          {translate('key_sign_in')}
        </Link>
        <p className="text-2xl">{translate('key_or')}</p>
        <Link
          to="/login"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          {translate('key_sign_up')}
        </Link>
      </section>

      <Footer />
    </div>
  );
}
