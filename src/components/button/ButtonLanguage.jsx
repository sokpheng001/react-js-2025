import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n.js";
import cambodiaFlag from "../../../public/img/flage/khmer-flag.png";
import englishFlag from "../../../public/img/flage/english-flag.png";

const ButtonLanguage = ({ className }) => {
  const { i18n } = useTranslation();

  // Get saved language or default to English
  const savedLanguage = localStorage.getItem("language") || "en";

  // State to track the current flag
  const [currentFlag, setCurrentFlag] = useState(
    savedLanguage === "en" ? englishFlag : cambodiaFlag
  );

  useEffect(() => {
    i18n.changeLanguage(savedLanguage);
  }, [savedLanguage, i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "kh" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);

    // Update flag based on language
    setCurrentFlag(newLang === "en" ? englishFlag : cambodiaFlag);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`pb-1 border-b-4 border-primary-950 dark:border-white ${className}`}
    >
      <img src={currentFlag} alt="Language Flag" className="w-10 h-7" />
    </button>
  );
};

// import { useTranslation } from "react-i18next";

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const toggleLanguage = () => {
//     const newLang = i18n.language === "en" ? "kh" : "en";
//     i18n.changeLanguage(newLang);
//     localStorage.setItem("language", newLang); // Store the selection
//   };

//   return (
//     <button onClick={toggleLanguage}>
//       {i18n.language === "en" ? "ភាសាខ្មែរ" : "English"}
//       <button
//         onClick={toggleLanguage}
//         className="pb-1 border-b-4 border-primary-950"
//       >
//         <img src={currentFlag} alt="Language Flag" className="w-10 h-7" />
//       </button>
//     </button>
//   );
// };

export default ButtonLanguage;
