import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "./language/ar.json"
import en from"./language/en.json"
import fr from"./language/fr.json"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en
  },
  ar: {
    translation:ar
  },
  fr: {
    translation:fr
  }
};

i18n
.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {   order: ["localStorage", "htmlTag" ],
    caches: ["localStorage"]},
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;