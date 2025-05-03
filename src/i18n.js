import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru.json";
import en from "./locales/en.json";

function detectPreferredLanguage() {
  const savedLang = localStorage.getItem("i18nextLng");
  if (savedLang) {
    return savedLang;
  }

  const navLang = navigator.language || navigator.userLanguage;
  const browserLang =
    (navigator.languages && navigator.languages[0]) || navLang;

  const isSystemRu = navLang.startsWith("ru");
  const isBrowserEn = browserLang.startsWith("en");

  // console.log("иван");
  // console.log({ navLang, browserLang, isSystemRu, isBrowserEn });

  if (isSystemRu && isBrowserEn) {
    return "en";
  }
  if (isSystemRu) {
    return "ru";
  }

  return "en";
}

const lang = detectPreferredLanguage();

document.documentElement.lang = lang;

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: lang,
  fallbackLng: "en",
  detection: {
    caches: ["localStorage"],
  },
  supportedLngs: ["en", "ru"],
  interpolation: {
    escapeValue: false,
  },
});

// console.log("Текущий язык:", i18n.language);

export default i18n;
