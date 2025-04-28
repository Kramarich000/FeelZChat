import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import { motion } from 'framer-motion';
import Footer from '@components/Footer';
import translate from '../utils/translate';

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
    <div className="absolute top-0 left-0 min-h-full w-full flex flex-col justify-center items-center">
      <Header />

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
        className="h-screen flex items-center justify-center text-center bg-opacity-40 p-4"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            {translate('key_welcome_to_feelzchat')},
          </h2>
          <p className="text-lg mb-8">{translate('key_discover_a_new')}</p>
          <Link
            to="/register"
            className="bg-cyan-700 hover:bg-black transition-all px-6 py-3 rounded-lg text-white "
          >
            {translate('key_start_chatting')}
          </Link>
        </div>
      </motion.section>

      <section className="w-full py-12 text-center p-4 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold mb-8">
          {translate('key_see_how_it_works')}
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">
              {translate('key_what_is_emotion_analysis')}
            </h3>
            <p className="text-gray-300 mb-4">
              {translate('key_emotion_analysis_description')}
            </p>
            <img
              src="/path/to/your/image1.jpg"
              alt="Emotion Analysis"
              className="w-full h-48 object-cover rounded-lg"
            />
            <video
              className="mt-4 w-full rounded-lg"
              controls
              poster="/path/to/your/video_thumbnail.jpg"
            >
              <source src="/path/to/your/video.mp4" type="video/mp4" />
              {translate('key_video_not_supported')}
            </video>
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
        <p className="text-2xl ">{translate('key_or')}</p>
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
