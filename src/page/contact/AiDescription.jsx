import { useTranslation } from "react-i18next";
import robotAi from "../../../public/svg/robot.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

const AiDescription = () => {
  const { t } = useTranslation("contact");
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
 
    });
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-center items-center py-14 gap-8 m-auto">
      {/* Left Content */}
      <div
        className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <h2 className="text-black dark:text-white text-heading-3 font-bold mb-4 text-center">
          {t("ai-caption")}{" "}
          <span className="text-secondary-500">{t("ai-caption2")} </span>
          {t("ai-caption3")}
        </h2>
        <p className="text-gray-500 text-center text-des-2 leading-relaxed">
          {t("ai-description")}
        </p>
      </div>

      {/* Right Image */}
      <div
        className="w-full flex justify-center md:w-1/2 order-1 md:order-2"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        <img src={robotAi} />
      </div>
    </div>
  );
};

export default AiDescription;
