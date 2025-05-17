import { SafeMotion } from "@components/SafeMotion";
import { steps } from "@data/steps";

export default function HowStartSection() {
  return (
    <section className="w-full py-4 sm:py-12 text-center p-4  bg-gray-900 text-white">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-4xl mb-10">Как начать общение?</h2>
        <SafeMotion
          as="p"
          initial={{ opacity: 0, transform: "translateY(75px) " }}
          whileInView={{ opacity: 1, transform: "translateY(0) " }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 text-[15px] sm:text-lg 
         text-white max-w-[1240px] bg-gray-800 p-4 rounded-lg"
        >
          Начало работы с нашим мессенджером занимает минимум времени и усилий.
          Регистрация, добавление контактов и создание чатов интуитивно понятны.
          Возможность использовать сервис с любого устройства обеспечивает
          гибкость и доступность общения в любой ситуации.
        </SafeMotion>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
          {steps.map(({ title, content, id, icon }) => (
            <SafeMotion
              key={id}
              className="bg-gray-800 rounded-4xl p-5"
              as="li"
              initial={{ opacity: 0, transform: "translateY(75px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.1 * id, delay: 0.1 * id }}
            >
              <span>{icon}</span>
              <h3 className="flex gap-2 mb-2 items-center justify-center">
                {title}
              </h3>
              <p className="text-sm sm:text-[16px]">{content}</p>
            </SafeMotion>
          ))}
        </ul>
      </div>
    </section>
  );
}
