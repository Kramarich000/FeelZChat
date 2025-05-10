import { useState, useEffect, useRef } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import translate from "@utils/translate";
// import mainVideo from '@assets/videos/main-bg.mp4';
// import { opacity } from '@cloudinary/url-gen/actions/adjust';
import VideoFrame from "@components/VideoFrame";
// import BgGradient from '@components/BgGradient';
// import { ItemIndicator } from '@radix-ui/react-select';
import { SafeMotion } from "@components/SafeMotion";
import PrefetchLink from "@components/PrefetchLink";
import useLocalStorage from "@hooks/useLocalStorage";
import LazyLoad from "react-lazyload";
import emotionAnalysisJPG from "@assets/images/emotion-analysis.jpg";
import emotionAnalysisWEBP from "@assets/images/emotion-analysis.webp";

const features = [
  {
    title: translate("key_emotion_analysis"),
    id: 1,
    description: translate("key_ai_analyzes_the"),
    animated: true,
  },
  {
    title: translate("key_security"),
    id: 2,
    description: translate("key_messages_protected"),
    animated: true,
  },
  {
    title: translate("key_intuitive_interface"),
    id: 3,
    description: translate("key_user_friendly_interface"),
    animated: true,
  },
];
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasVisited, setHasVisited] = useLocalStorage();
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsModalOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const ref = useRef(null);

  return (
    <div className="relative w-full mx-auto">
      <div className="fixed inset-x-0 top-0 bottom-0 min-h-screen -z-10 mobile-bg sm:home-container" />
      <Header />
      <div className="main-section min-h-screen flex items-center justify-center text-center bg-opacity-40 p-4">
        <SafeMotion
          className="main-description max-w-3xl sm:shadow-[0px_6px_24px_rgba(0,0,0,0.5)] bg-white border-b-8 border-primary mx-auto p-10 rounded-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">
            {translate("key_welcome_to_feelzchat")}
          </h1>
          <p className="text-sm sm:text-lg mb-8">
            {translate("key_discover_a_new")}
          </p>
          <PrefetchLink
            to="/register"
            className="bg-primary hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
          >
            {translate("key_start_chatting")}
          </PrefetchLink>
        </SafeMotion>
      </div>

      {/* {isModalOpen && (
      <AnimatePresence>
        <SafeMotion
          className="fixed z-50 inset-0 p-4 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white p-8 rounded-lg sm:shadow-lg max-w-lg w-full text-center">
            <h3 className="text-xl font-bold mb-4">
              {translate("key_new_features")}
            </h3>
            <p className="text-gray-700 mb-6">
              {translate("key_what_has_changed")}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-primary hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
            >
              {translate("key_close")}
            </button>
          </div>
        </SafeMotion>
        </AnimatePresence>
      )} */}

      <section className="p-6 items-center gap-5 flex flex-col w-full justify-center bg-gray-900 mx-auto">
        <h2 className="text-white text-3xl sm:text-4xl font-bold">
          {translate("key_features")}
        </h2>
        <div
          ref={ref}
          className="flex gap-5 flex-wrap items-center justify-center"
        >
          {features.map((item) => (
            <SafeMotion
              key={item.id}
              initial={{ opacity: 0, transform: "translateY(50px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              transition={{ delay: 0.1 * item.id, duration: 0.2 * item.id }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-lg min-h-[150px] max-w-[400px]  border-primary border-b-8"
            >
              <h3 className="font-bold text-xl sm:text-2xl mb-2">
                {item.title}
              </h3>
              <p className="sm:text-base text-sm">{item.description}</p>
            </SafeMotion>
          ))}
        </div>
      </section>

      <section className="w-full py-4 sm:py-12 text-center p-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto gap-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            {translate("key_see_how_it_works")}
          </h2>
          <SafeMotion
            initial={{ opacity: 0, transform: "translateY(-20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.13 }}
            className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 sm:shadow-md text-center mx-auto max-w-[1000px] border-primary border-b-8"
          >
            <LazyLoad height={400} offset={100} once>
              <picture className="aspect-w-16 aspect-h-9">
                <source srcSet={emotionAnalysisWEBP} type="image/webp" />
                <img
                  src={emotionAnalysisJPG}
                  alt="Emotion Analysis"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg object-top"
                />
              </picture>
            </LazyLoad>
            <VideoFrame />
          </SafeMotion>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full pt-4 sm:pt-12 px-4 text-center bg-gray-900 text-white">
        <SafeMotion
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PrefetchLink
            to="/login"
            className="text-2xl hover:underline text-primary font-bold"
          >
            {translate("key_sign_in")}
          </PrefetchLink>
        </SafeMotion>
        <p className="text-2xl">{translate("key_or")}</p>
        <SafeMotion
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PrefetchLink
            to="/register"
            className="text-2xl hover:underline text-primary font-bold"
          >
            {translate("key_sign_up")}
          </PrefetchLink>
        </SafeMotion>
      </section>

      <Footer />
    </div>
  );
}
