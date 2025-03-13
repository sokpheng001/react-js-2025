import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Leaphea from "../../../public/img/image/Leaphea.png";
import GlassCard from "../../components/card/GlassCard";
import ButtonHero from "../../components/button/ButtonHero";
import { NavLink } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const Hero = () => {
  const { t } = useTranslation("homepage");

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true, // Ensure the animation only happens once
    });
  }, []);

  return (
    <div className="pt-14">
      <GlassCard
        className="h-[700px] sm:h-full md:h-[500px] flex items-center rounded-[3rem_0px]"
        data-aos="fade-up" // Apply fade-up animation to the entire GlassCard
      >
        <div className="flex flex-col md:flex-row justify-center items-center py-8 m-auto h-full w-full">
          {/* Left Content */}
          <div
            className="p-6 w-full md:w-[50%] flex flex-col items-center md:text-left order-2 md:order-1 sm:h-full sm:flex sm:justify-center"
            data-aos="fade-right" // Fade-in from right for the left content
          >
            <h2 className="text-bg-dark-mode dark:text-bg-light-mode text-heading-5 sm:text-heading-4 md:text-heading-4 lg:text-heading-3 font-bold mb-1 sm:leading-tight md:leading-normal">
              {t("practice-your")}
              <span
                className="block text-heading-5 sm:text-heading-4 md:text-heading-4 lg:text-heading-3 font-bold mb-1 sm:leading-tight md:leading-normal"
              >
                {t("practice-des")}
              </span>
            </h2>
            <p
              className="text-gray-500 dark:text-white text-des-lg sm:text-[15px] md:text-des-4 lg:text-des-3 leading-snug sm:leading-normal"
              data-aos="fade-left" // Fade-in from left for the paragraph
            >
              {t("hero-des")}
            </p>

            {/* button */}
            <div
              className="w-full flex justify-center md:justify-start mt-4 sm:pr-0"
              data-aos="zoom-in" // Zoom-in animation for the button
            >
              <NavLink to="/dashboard" className="w-full sm:w-auto">
                <ButtonHero
                  label={t("hero-btn")}
                  className="mt-5 w-full py-1.5 md:text-lg sm:text-sm text-white"
                >
                  {t("hero-btn")}
                </ButtonHero>
              </NavLink>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="w-full flex justify-center md:justify-end md:w-1/2 order-1 sm:h-full sm:flex sm:items-center "
            data-aos="fade-left" // Fade-in from left for the image
          >
            <img src={Leaphea} className="w-4/5 md:w-[85%]" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Hero;
