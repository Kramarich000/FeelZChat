import { useState, useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import { IoSend } from "react-icons/io5";
import { motion } from "framer-motion";
import ChatHeader from "@components/ChatHeader";
import BgChatGradient from "@components/BgChatGradient";
import translate from "@utils/translate";
import { useResizablePanel } from "@hooks/useResizablePanel";
import HelpButton from "@components/HelpButton";

export default function Chat() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [chats] = useState([
    { id: 1, title: "чат1", titleKey: "key_chat1" },
    { id: 2, title: "чат2", titleKey: "key_chat2" },
    { id: 3, title: "чат3", titleKey: "key_chat3" },
  ]);
  const formattedTime = `${new Date()
    .getHours()
    .toString()
    .padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`;
  const [messages, setMessages] = useState([
    {
      author: "Иван",
      text: "Привет запара как дела?",
      type: "sent",
      timestamp: formattedTime,
      delivered: true,
      read: true,
    },

    {
      author: "Диван",
      text: "Привет juj как дела?",
      type: "received",
      timestamp: formattedTime,
      delivered: true,
      read: true,
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const showPushNotification = (title, options) => {
    if (Notification.permission === "granted") {
      console.log("Отправка уведомления...");
      new Notification(title, options);
    }
  };

  const sendMessage = (text) => {
    if (!text.trim() || isSendingMessage) return;

    setIsSendingMessage(true);
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        author: "Иван",
        text,
        type: "sent",
        timestamp: formattedTime,
        delivered: true,
      },
    ]);

    setTimeout(() => {
      const reply = {
        author: "Запара",
        text: "Ответ...",
        type: "received",
        timestamp: formattedTime,
        delivered: true,
      };

      setMessages((prev) => [...prev, reply]);
      setLoading(false);

      // if (document.hidden) {
        showPushNotification("Новое сообщение", {
          body: reply.text,
          icon: "/icon.png", 
        });
      // }

      setTimeout(() => {
        setIsSendingMessage(false);
      }, 1000);
    }, 1000);
  };
  
  const selectChat = (id) => setActiveChatId(id);

  const { width: leftPanelWidth, panelRef, onMouseDown } = useResizablePanel();
  const containerWidth = 1200;
  const separatorWidth = 5;
  const rightPanelWidth = containerWidth - leftPanelWidth - separatorWidth;

  const endOfMessagesRef = useRef(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <BgChatGradient>
      <ChatHeader />
      <motion.div
        className="flex min-h-[850px] border-1 p-[30px] rounded-4xl w-[1200px]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex relative w-full max-w-[1200px] mx-auto">
          <div
            className="resizeable-panel scrollbar-chat bg-transparent p-2 mt-[32px] overflow-y-auto max-h-[722px]"
            ref={panelRef}
            style={{ width: `${leftPanelWidth}px`}}
          >
            <h2 className="text-lg font-semibold mb-4">
              {translate("key_chats")}
            </h2>
            <ul className="space-y-2">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                  className={`p-3 rounded cursor-pointer hover:bg-gray-800 transition ${
                    chat.id === activeChatId ? "bg-cyan-700" : ""
                  }`}
                >
                  {chat.titleKey ? translate(chat.titleKey) : chat.title}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="resize-handle top-0 left-0 cursor-ew-resize bg-cyan-700 mt-8 ml-1 mb-8 rounded-3xl"
            onMouseDown={onMouseDown}
            style={{
              width: `${separatorWidth}px`,
            }}
          />

          <div
            className="flex max-h-[788px] flex-col justify-between bg-transparent relative items-center overflow-hidden w-full p-[33px]"
            style={{ width: `${rightPanelWidth}px`,  }} 
          >
            <div
              className="scrollbar-chat flex-1 glass-container overflow-y-auto bg-transparent w-full rounded transition-all duration-500 p-4 m-4"
              style={{
                Maxwidth: `calc(${rightPanelWidth - 50}px)`, 
              }}
            >
              <div className="flex flex-col gap-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[70%] p-3 rounded-xl message shadow text-left ${
                      msg.type
                    } ${msg.type === "sent" ? "self-end" : "self-start"} ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                    style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                  >
                    <div className="mb-1  text-left text-sm">{msg.author}</div>
                    <div className="grid grid-cols-1 text-sm text-left">
                      <p className="whitespace-pre-wrap break-words max-w-[100%]">
                        {msg.text}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-blue-900 justify-end">
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
                <div ref={endOfMessagesRef} />
              </div>
            </div>

            <div className="w-full h-[160px] glass-container bg-transparent p-4 rounded transition-all duration-500">
              <Formik
                initialValues={{ text: "" }}
                onSubmit={(values, { resetForm }) => {
                  sendMessage(values.text);
                  resetForm();
                }}
              >
                {({ setFieldValue, values, submitForm }) => (
                  <div className="w-full border-t-0">
                    <Form className="space-y-4 relative">
                      <Field name="text">
                        {({ field }) => (
                          <textarea
                            {...field}
                            className="scrollbar-hide w-full h-32 p-4 pr-14 border chat-textarea rounded resize-none"
                            placeholder={translate("key_enter_message")}
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
                            disabled={isSendingMessage}
                          />
                        )}
                      </Field>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={loading || isSendingMessage}
                          className="message-send-button text-cyan-700 px-4 focus:outline-none outline-none py-2 mx-auto absolute top-[45%] rounded disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-200 transition-all"
                        >
                          <IoSend
                            size={30}
                            className="send-message text-cyan-700 hover:fill-black transition-colors"
                          />
                        </button>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </motion.div>
    </BgChatGradient>
  );
}
