import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "kh"],
    fallbackLng: "en",
    detection: {
      order: ["path", "localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: true,
    },
  });

// Change font when language changes
i18n.on("languageChanged", (lng) => {
  document.body.classList.toggle("font-kh", lng === "kh");
  document.body.classList.toggle("font-en", lng === "en");
});

export default i18n;
