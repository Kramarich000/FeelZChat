import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import ru from "./locales/ru.json";
import en from "./locales/en.json";

const SUPPORTED_LANGS = ["en", "ru"];

function detectPreferredLanguage() {
  const savedLang = localStorage.getItem("i18nextLng");
  if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
    return savedLang;
  }

  const browserLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en";
  console.log("s21цdasd", browserLang);
  console.log("navigator.languages:", navigator.languages);
  console.log("navigator.language:", navigator.language);

  const detectedLang = SUPPORTED_LANGS.find((lang) =>
    browserLang.startsWith(lang),
  );

  console.log("sdasd", detectedLang);

  return detectedLang || "en";
}

export const changeLanguage = (lang) => {
  if (SUPPORTED_LANGS.includes(lang)) {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    document.documentElement.lang = lang;
  }
};

const lang = detectPreferredLanguage();
localStorage.setItem("i18nextLng", lang);
document.documentElement.lang = lang;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: lang,
    fallbackLng: "en",
    // detection: {
    //   caches: ["localStorage"],
    // },
    supportedLngs: ["en", "ru"],
    interpolation: {
      escapeValue: false,
    },
  });

console.log("Текущий язык:", i18n.language);

export default i18n;
