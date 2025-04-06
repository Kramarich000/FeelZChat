import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";

const faqData = [
  {
    question: "Как зарегистрироваться?",
    answer:
      "На главной странице нажмите «Регистрация», введите номер телефона и придумайте пароль.",
  },
  {
    question: "Забыл пароль — что делать?",
    answer:
      "На странице входа нажмите «Забыли пароль?», введите номер, и мы вышлем код для восстановления.",
  },
  {
    question: "Как изменить номер телефона?",
    answer:
      "В настройках профиля перейдите в раздел «Контактные данные» и нажмите «Изменить номер».",
  },
  {
    question: "Как удалить аккаунт?",
    answer:
      "Напишите в поддержку через /help или на почту support@FeelZChat.app, и мы удалим ваш аккаунт.",
  },
  {
    question: "Мои сообщения не отправляются. Что делать?",
    answer:
      "Проверьте подключение к интернету. Если проблема сохраняется, попробуйте перезайти в приложение.",
  },
];

const handleSubmit = (e) => {
  e.preventDefault();
};


export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="absolute top-0 left-0 min-h-full w-full bg-blue-200 flex flex-col justify-center items-center transition-all">
      <Header />
      <motion.div
        className="max-w-[1200px] mx-auto space-y-8 p-4"
        layout
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-6">Часто задаваемые вопросы</h1>
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b-10 py-4 min-h-auto bg-cyan-700 p-2 text-white rounded-3xl"
              >
                <div
                  className="w-full cursor-pointer text-left font-medium"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {item.question}
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="text-left mt-2 py-1">{item.answer}</div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="">
          <h2 className="text-3xl mb-5">Свяжитесь с нами!</h2>
          <div className="bg-white text-black  border-b-4 rounded-2xl border-cyan-700 p-4">
            <form className="gap-5 grid grid-cols-3 mb-4" onSubmit={handleSubmit}>
              <label>
                <input
                  className="input-styles"
                  type="text"
                  placeholder="Ваше имя"
                />
              </label>
              <label>
                <input
                  className="input-styles"
                  type="email"
                  placeholder="Ваша почта"
                />
              </label>

              <label>
                <Select.Root
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                >
                  <Select.Trigger className="trigger select-styles input-styles p-2.5">
                    <Select.Value
                      className="text-gray-100"
                      placeholder="Тип вопроса?"
                    />
                    <ChevronDownIcon className="w-5 h-5" />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border rounded shadow-lg">
                      <Select.Viewport>
                        <Select.Item
                          value="Technical"
                          className="p-2.5 cursor-pointer hover:bg-cyan-700 hover:text-white"
                        >
                          <Select.ItemText>Технический вопрос</Select.ItemText>
                          <Select.ItemIndicator></Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item
                          value="Account"
                          className="p-2.5 cursor-pointer hover:bg-cyan-700 hover:text-white"
                        >
                          <Select.ItemText>Вопрос по аккаунту</Select.ItemText>
                          <Select.ItemIndicator></Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item
                          value="Bug"
                          className="p-2 cursor-pointer hover:bg-cyan-700 hover:text-white"
                        >
                          <Select.ItemText>Баг</Select.ItemText>
                          <Select.ItemIndicator></Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item
                          value="Other"
                          className="p-2 cursor-pointer hover:bg-cyan-700 hover:text-white"
                        >
                          <Select.ItemText>Другое</Select.ItemText>
                          <Select.ItemIndicator></Select.ItemIndicator>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </label>

              <textarea
                className="input-styles min-h-80 col-span-3 border-1 rounded-2xl p-2 w-full grid-cols-3"
                placeholder='Ваш вопрос, Например: "Хочу удалить аккаунт"'
              />
              <button
                type="submit" 
                className="mx-auto w-[300px] col-span-3 bg-cyan-700 text-white rounded-2xl py-2"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold text-cyan-700 mb-4">
            Наши контакты
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-700">
              <strong className="font-medium">Телефон: </strong>
              <a
                className="text-cyan-700 hover:underline transition-all"
                type="tel"
                href="tel:1234567890"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium">Адрес: </strong>ул. Примерная, д.
              10, офис 301
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium">Часы работы: </strong>Пн-Пт с 9:00
              до 18:00
            </p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
