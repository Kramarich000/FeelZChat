import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import features from "@data/features";
import { useRef } from "react";
import { delay } from "framer-motion";

export default function FeaturesSection() {
  const ref = useRef(null);
  return (
    <section className="p-6 items-center gap-5 flex flex-col w-full justify-center bg-gray-900 mx-auto">
      <h2 className="text-white text-3xl sm:text-4xl font-bold">
        {translate("key_features")}
      </h2>

      <div
        ref={ref}
        className="flex gap-5 flex-wrap items-center justify-center max-w-[1240px]"
      >
        <SafeMotion
          as="p"
          initial={{ opacity: 0, transform: "translateY(75px) " }}
          whileInView={{ opacity: 1, transform: "translateY(0) " }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 text-[15px] sm:text-lg text-white bg-gray-800 p-4 rounded-lg"
        >
          В основе нашего продукта — современные достижения в области
          искусственного интеллекта и безопасности. Мы предлагаем функционал,
          который помогает понять эмоциональный настрой собеседника, гарантирует
          конфиденциальность общения и обеспечивает интуитивно понятный
          интерфейс, минимизирующий технические сложности.
        </SafeMotion>
        {features.map((item) => (
          <SafeMotion
            key={item.id}
            initial={{ opacity: 0, transform: "translateY(50px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            transition={{ delay: 0.1 * item.id, duration: 0.2 * item.id }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-lg w-full sm:w-auto max-w-full sm:max-w-[400px] min-h-[100px] sm:min-h-[150px] border-primary border-b-8"
          >
            <h3 className="font-bold text-xl sm:text-2xl mb-2">{item.title}</h3>
            <p className="sm:text-base text-sm">{item.description}</p>
          </SafeMotion>
        ))}
      </div>
    </section>
  );
}
