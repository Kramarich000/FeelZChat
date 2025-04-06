import { Link } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Home() {
  const features = [
    {
      title: "Анализ эмоций",
      description:
        "ИИ анализирует текст и предоставляет точную информацию о настроении и эмоциях собеседника.",
      animated: true,
    },
    {
      title: "Безопасность",
      description:
        "Ваши сообщения защищены с использованием современных технологий шифрования.",
      animated: true,
    },
    {
      title: "Интуитивно понятный интерфейс",
      description:
        "Удобный и понятный интерфейс для общения без лишних настроек.",
      animated: true,
    },
  ];
  return (
    <div className="absolute top-0 left-0 min-h-full w-full flex flex-col justify-center items-center">
      <Header />
      <motion.section
        className="h-screen flex items-center justify-center text-center bg-opacity-40"
        layout
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Добро пожаловать в FeelZChat
          </h2>
          <p className="text-lg mb-8">
            Откройте для себя новый способ общения с друзьями и коллегами, где
            каждый разговор может быть проанализирован с использованием ИИ для
            определения эмоций и тональности.
          </p>
          <Link
            to="/register"
            className="bg-cyan-700 hover:bg-black transition-all px-6 py-3 rounded-lg text-white "
          >
            Начать общение
          </Link>
        </div>
      </motion.section>
      <section className="w-full py-12 text-center bg-gray-700">
        <h2 className="text-4xl font-bold mb-4 text-white">Особенности</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, id) => {
            const Content = (
              <div className="bg-white p-6 rounded-lg shadow-md text-center max-h-[150px]">
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
      <section className="flex justify-center items-center gap-4 w-full py-12 pb-0 text-center bg-gray-900 text-white">
        <Link
          to="/register"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          Войдите{" "}
        </Link>
        <p className="text-2xl ">или</p>
        <Link
          to="/login"
          className="text-2xl hover:underline text-cyan-700 font-bold"
        >
          зарегистрируйтесь
        </Link>
      </section>
      <Footer />
    </div>
  );
}
