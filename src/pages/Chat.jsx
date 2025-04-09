import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { IoSend } from "react-icons/io5";
import { motion } from "framer-motion";
import ChatHeader from "@components/ChatHeader";
import BgChatGradient from "@components/BgChatGradient";

export default function Chat() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [chats] = useState([
    { id: 1, title: "чат1" },
    { id: 2, title: "чат2" },
    { id: 3, title: "чат3" },
  ]);
  const [messages, setMessages] = useState([
    {
      author: "Иван",
      text: "Привет запара как дела?",
      type: "sent",
      timestamp: new Date(),
      delivered: true,
      read: true,
    },

    {
      author: "Диван",
      text: "Привет juj как дела?",
      type: "received",
      timestamp: new Date().toLocaleTimeString(),
      delivered: true,
      read: true,
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { author: "Иван", text, type: "sent",  timestamp: new Date().toLocaleTimeString(),
      delivered: true, }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { author: "Запара", text: "Ответ...", type: "received", timestamp: new Date().toLocaleTimeString(),
          delivered: true, },
      ]);
      setLoading(false);
    }, 1000);
  };

  const selectChat = (id) => setActiveChatId(id);

  return (
    <BgChatGradient>
      <ChatHeader />
      <motion.div
        className="flex max-h-[800px] border-1 p-[30px] rounded-4xl"
        layout
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-[300px] bg-transparent p-4 overflow-y-auto border-r border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Чаты</h2>
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`p-3 rounded cursor-pointer hover:bg-gray-800 transition ${
                  chat.id === activeChatId ? "bg-cyan-700" : ""
                }`}
              >
                {chat.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col justify-between bg-transparent relative items-center gap-10">
          <div className="flex-1 glass-container overflow-y-auto min-h-[50vh] bg-transparent rounded transition-all duration-500 min-w-[732px] p-4 m-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[70%] p-3 rounded-xl message shadow ${msg.type} ${
                    msg.type === "sent"
                      ? "self-end text-right"
                      : "self-start text-left"
                  } ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                >
                  <div className="mb-1 text-lg text-left">{msg.author}</div>
                  <div className="flex gap-[14px] text-center">
                    <p className="whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-blue-900 mt-2 justify-end">
                      <span>{msg.timestamp}</span>
                      {msg.type === "sent" && (
                        <span>
                          {msg.read ? (
                            <span className="text-blue-900">✓✓</span>
                          ) : msg.delivered ? (
                            <span>✓✓</span>
                          ) : (
                            <span>✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-[1200px] ml-4 h-[180px] glass-container bg-transparent mx-auto p-4 rounded transition-all duration-500">
            <Formik
              initialValues={{ text: "" }}
              onSubmit={(values, { resetForm }) => {
                sendMessage(values.text);
                resetForm();
              }}
            >
              {({ setFieldValue, values, submitForm }) => (
                <div className="min-w-[700px] border-t-0">
                  <Form className="space-y-4 relative">
                    <Field name="text">
                      {({ field }) => (
                        <textarea
                          {...field}
                          className="w-full h-32 p-4 border chat-textarea rounded resize-none"
                          placeholder="Введите сообщение..."
                          value={values.text}
                          onChange={(e) =>
                            setFieldValue("text", e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              submitForm();
                            }
                          }}
                        />
                      )}
                    </Field>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="message-send-button text-cyan-700 px-4 focus:outline-none outline-none py-2 mx-auto absolute top-[45%] rounded disabled:opacity-50 hover:bg-gray-200 transition-all"
                      >
                        <IoSend size={30} className="text-cyan-700" />
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </motion.div>
    </BgChatGradient>
  );
}
