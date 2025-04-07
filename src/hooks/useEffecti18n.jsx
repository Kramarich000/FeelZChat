import i18n from "../i18n";
import { useEffect } from "react";

export default function useEffecti18n() {
  useEffect(() => {
    console.log("navigator.language:", navigator.language);
    console.log("i18n.language:", i18n.language);
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const country = data.country;
        if (country === "RU") {
          i18n.changeLanguage("ru");
        } else {
          i18n.changeLanguage("en");
        }
      })
      .catch(() => {
        i18n.changeLanguage(navigator.language.split("-")[0] || "en");
      });
  }, []);
}
