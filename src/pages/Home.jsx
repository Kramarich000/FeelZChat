import { Link } from "react-router-dom";
import Header from "@components/Header";
import { motion } from "framer-motion";
import Footer from "@components/Footer";
import translate from "../utils/translate";

export default function Home() {
  const features = [
    {
      title: translate("key_emotion_analysis"),
      description:
        translate("key_ai_analyzes_text"),
      animated: true,
    },
    {
      title: translate("key_security"),
      description:
        translate("key_messages_protected"),
      animated: true,
    },
    {
      title: translate("key_intuitive_interface"),
      description:
        translate("key_user_friendly"),
      animated: true,
    },
  ];
  return (
    <div className="absolute top-0 left-0 min-h-full w-full flex flex-col justify-center items-center">
      <Header />
      <motion.section
        className="h-screen flex items-center justify-center text-center bg-opacity-40 p-4"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            {translate("key_welcome_to")},
          </h2>
          <p className="text-lg mb-8">
            {translate("key_discover")}
          </p>
          <Link
            to="/register"
            className="bg-cyan-700 hover:bg-black transition-all px-6 py-3 rounded-lg text-white "
          >
            {translate("key_start_chatting")}
          </Link>
        </div>
      </motion.section>
      <section className="w-full py-12 text-center p-4 bg-gray-700">
        <h2 className="text-4xl font-bold mb-4 text-white">{translate("key_features")}</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, id) => {
            const Content = (
              <div className="bg-white p-6 rounded-lg shadow-md text-center h-[150px]">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            );

            return feature.animated ? (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: id * 0.2 }}
              >
                {Content}
              </motion.div>
            ) : (
              <div key={id}>{Content}</div>
            );
          })}
        </div>
      </section>
      <section className="flex justify-center items-center gap-4 w-full py-12 p-4 pb-0 text-center bg-gray-900 text-white">
        <Link
          to="/register"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          {translate("key_sign_in")}{" "}
        </Link>
        <p className="text-2xl ">{translate("key_or")}</p>
        <Link
          to="/login"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          {translate("key_sign_up")}
        </Link>
      </section>
      <Footer />
    </div>
  );
}
