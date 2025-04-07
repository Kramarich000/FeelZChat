import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,

    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          login: "Login",
          register: "Register",
          profile: "Profile",
          chat: "Chat",
          home: "Home",
          help: "Help",
          privacy: "Privacy Policy",
        },
      },
      ru: {
        translation: {
          welcome: "Добро пожаловать",
          login: "Вход",
          register: "Регистрация",
          profile: "Профиль",
          chat: "Чат",
          home: "Главная",
          help: "Помощь",
          privacy: "Политика конфиденциальности",
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
