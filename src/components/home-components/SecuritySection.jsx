import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import security from "@data/security"; // ✅ Теперь это security, а не features
import { useRef } from "react";

export default function SecuritySection() {
  const ref = useRef(null);

  return (
    <section className="p-6 items-center gap-5 flex flex-col w-full justify-center bg-gray-900 mx-auto ">
      <h2 className="text-white text-3xl sm:text-4xl font-bold">
        {translate("key_section_security_title")}
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
          Защита данных и конфиденциальность — ключевые приоритеты нашего
          сервиса. Мы применяем комплекс современных технологий шифрования и
          многоуровневых механизмов аутентификации, чтобы гарантировать
          максимальную безопасность вашей информации и предотвратить
          несанкционированный доступ.
        </SafeMotion>
        {security.map((item) => (
          <SafeMotion
            key={item.id}
            initial={{ opacity: 0, transform: "translateY(-50px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            transition={{ delay: 0.1 * item.id, duration: 0.2 * item.id }}
            viewport={{ once: true }}
            className="bg-gray-800 text-white p-4 rounded-lg w-full sm:w-auto min-h-[100px] max-w-full sm:max-w-[400px] sm:min-h-[175px] border-primary border-b-8"
          >
            <h3 className="font-bold text-xl sm:text-2xl mb-2">{item.title}</h3>
            <p className="sm:text-base text-sm">{item.description}</p>
          </SafeMotion>
        ))}
      </div>
    </section>
  );
}
