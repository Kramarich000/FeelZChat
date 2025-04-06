import React from "react";
import { motion } from "framer-motion";
import Header from "@components/Header";


export default function Privacy() {
  return (
    <div className="absolute top-0 left-0 min-h-full w-full bg-blue-200 flex flex-col justify-center items-center">
      <Header/>
      <motion.div
        layout
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container p-10 m-10 max-w-[1200px] bg-white rounded-2xl border-b-20 border-cyan-700 border-r-100">
          <h1 className="text-4xl font-bold mb-4">
            Политика конфиденциальности
          </h1>
          <div className="text-lg space-y-4">
            <p>
              Мы ценим вашу конфиденциальность и понимаем, насколько важно
              защищать ваши личные данные. Настоящая Политика конфиденциальности
              объясняет, как мы собираем, используем и защищаем информацию,
              которую вы предоставляете через наш сайт или приложение.
            </p>
            <h2 className="text-2xl font-semibold">1. Сбор данных</h2>
            <p>
              Мы можем собирать персональные данные, такие как имя, электронная
              почта, номер телефона, а также данные о вашем устройстве, браузере
              и предпочтениях в ходе использования нашего сервиса.
            </p>
            <h2 className="text-2xl font-semibold">2. Использование данных</h2>
            <p>
              Собранные данные могут использоваться для улучшения качества
              предоставляемых услуг, обеспечения безопасности сервиса и для
              отправки уведомлений о новых функциях или обновлениях.
            </p>
            <h2 className="text-2xl font-semibold">3. Защита данных</h2>
            <p>
              Мы принимаем меры для защиты ваших данных с помощью современных
              технологий безопасности и следим за их защитой от
              несанкционированного доступа.
            </p>
            <h2 className="text-2xl font-semibold">
              4. Передача данных третьим лицам
            </h2>
            <p>
              Мы не передаем ваши личные данные третьим лицам без вашего
              согласия, за исключением случаев, предусмотренных
              законодательством.
            </p>
            <h2 className="text-2xl font-semibold">
              5. Изменения в политике конфиденциальности
            </h2>
            <p>
              Мы оставляем за собой право изменять эту Политику
              конфиденциальности в любое время. Все изменения будут опубликованы
              на этой странице.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
