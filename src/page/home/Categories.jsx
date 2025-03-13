import React, { useEffect } from "react";
import GlassCard from "../../components/card/GlassCard";
import { RiHeadphoneLine, RiFileList3Line } from "react-icons/ri";
import { FaRegFaceFrownOpen, FaArrowUpRightDots } from "react-icons/fa6";
import { AiOutlinePieChart, AiOutlineRead } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="h-full flex flex-col" data-aos="zoom-in">
    <div className="p-2 flex flex-col items-center text-center flex-grow">
      <div
        className={`w-12 h-12 rounded-full flex justify-center items-center mb-6`}
      >
        {Icon && <Icon className="text-6xl text-black dark:text-white" />}
      </div>
      <h3 className="text-heading-4 font-bold text-primary-500 mb-4">
        {title}
      </h3>
      <p className="text-des-2 text-gray-600 dark:text-white text-center">
        {description}
      </p>
    </div>
  </div>
);

const FeaturesGrid = () => {
  const { t } = useTranslation("homepage");
  const features = [
    {
      icon: RiHeadphoneLine,
      title: t("ca-listening"),
      description: t("ca-des-lis"),
    },
    {
      icon: FaArrowUpRightDots,
      title: t("ca-quiz"),
      description: t("ca-des-quiz"),
    },
    {
      icon: RiFileList3Line,
      title: t("ca-exercises"),
      description: t("ca-des-exercises"),
    },
    {
      icon: AiOutlineRead,
      title: t("ca-reading"),
      description: t("ca-des-reading"),
    },
    {
      icon: FaRegFaceFrownOpen,
      title: t("ca-speaking"),
      description: t("ca-des-speaking"),
    },
    {
      icon: AiOutlinePieChart,
      title: t("ca-vocabulary"),
      description: t("ca-des-vocabulary"),
    },
  ];

  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div>
        {/* Title Section with fade-up animation */}
        <div className="py-16">
          <div className="text-center" data-aos="fade-up">
            <span className="text-heading-3 font-bold leading-tight text-primary-500 dark:text-white">
              {t("des-title")}
              <span className="text-secondary-500">
                {" "}
                {t("des-titleone")}
              </span>{" "}
              <span> {t("des-sub")}</span>
            </span>
            <p className="mt-4 text-des-2 leading-7 text-gray-500 sm:mt-8">
              {t("des-subtwo")}
            </p>
          </div>
        </div>

        {/* Features Grid with zoom-in animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 pb-6">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              data-aos="fade-up" // Zoom-in effect on each card
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturesGrid;
