import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import englishTranslation from "./locales/en_language.json";
import arabicTranslation from "./locales/ar_language.json";

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: arabicTranslation,
    },
    en: {
      translation: englishTranslation,
    },
  },
  lng: localStorage.getItem("locale") || "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
