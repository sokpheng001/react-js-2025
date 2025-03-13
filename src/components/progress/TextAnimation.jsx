import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";

const TextAnimation = ({ jsonName, text1, text2, text3, className }) => {
  const { t } = useTranslation(jsonName);
  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: [t(text1), t(text2), t(text3)],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
      showCursor: false,
    });

    return () => {
      typedInstance.current.destroy();
    };
  }, [jsonName, text1, text2, text3, t]);

  return (
    <span
      ref={typedRef}
      className={`font-bold text-secondary-500 ${className}`}
    >
      {t(text1)}
    </span>
  );
};

export default TextAnimation;
