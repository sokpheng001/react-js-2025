import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
// import TextAnimation from "../../components/progress/TextAnimation";

const CardSection = () => {
  const { t } = useTranslation("contact");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <>
      <div>
        <div className="text-center">
          <h2 className="text-primary-500 text-heading-1 font-bold dark:text-primary-500 py-14">
            <span>{t("title")}</span>{" "}
            <span className="text-[#FBA526] font-en">FluentFlow</span>
          </h2>
          {/* <TextAnimation
            className="text-primary-500 text-heading-1 font-bold dark:text-primary-500 py-14 "
            jsonName="contact"
            text1="title"
            text2="welcome"
          /> */}
          {/* <p className="pb-14"></p> */}

          <div className="flex justify-center items-center">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 pt-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <GlassCard className="w-full max-w-[350px] h-full flex flex-col items-center text-center p-6">
                <img
                  alt="FAQS Icon"
                  className="mx-auto mb-4"
                  height="150"
                  src="img/contactpage-img/faq.png"
                  width="150"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-heading-3 text-primary-500 font-semibold">
                    {t("des")}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-white text-des-2">
                    {t("sub-des-faq")}
                  </p>
                </div>
                <a href="#ask-question">
                  <button className="text-heading-4 text-white m-3 bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                    {t("btn-des")}
                  </button>
                </a>
              </GlassCard>

              <GlassCard className="w-full max-w-[350px] h-full flex flex-col items-center text-center p-6">
                <img
                  alt="Support Icon"
                  className="mx-auto mb-4"
                  height="150"
                  src="img/contactpage-img/support.png"
                  width="150"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-heading-3 text-primary-500 font-semibold">
                    {t("con")}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-white text-des-2">
                    {t("sub-des-con")}
                  </p>
                </div>
                <a href="#contact">
                  <button className="text-heading-4 text-white m-3 bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                    {t("btn-con")}
                  </button>
                </a>
              </GlassCard>

              <GlassCard className="w-full max-w-[350px] h-full flex flex-col items-center text-center p-6">
                <img
                  alt="Business Growing Icon"
                  className="mx-auto mb-4"
                  height="150"
                  src="img/contactpage-img/fly.png"
                  width="150"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-heading-3 text-primary-500 font-semibold">
                    FluentFlow
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-white text-des-2">
                    {t("sub-des-name")}
                  </p>
                </div>
                <a href="#">
                  <button className="text-heading-4 text-white m-3 bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                    {t("btn-name")}
                  </button>
                </a>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardSection;
