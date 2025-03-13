import React from "react";
import { useTranslation } from "react-i18next";
import GlassCard from "../../../../components/card/GlassCard";
import ButtonNavigate from "../../../../components/button/ButtonNavigate";
import reading from "../../../../../public/svg/skill/exercises.svg";
import video from "../../../../../public/svg/skill/video.svg";
export default function Section4() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      <div className="flex flex-col gap-8 justify-center xl:pb-16 lg:pb-14 md:pb-12 sm:pb-10 pb-8">
        <h2 className="dark:text-text-des-dark-mode text-primary-500 lg:text-heading-2 md:text-heading-3 text-heading-4 text-center">
          {t("startWith")}
          <span className="text-accents-color">{t("fluentflow")}</span>
        </h2>
        <div className="flex lg:flex-nowrap flex-wrap lg:justify-between md:justify-center justify-center lg:gap-5 gap-4">
          <GlassCard className="flex flex-col gap-6 justify-center items-center lg:w-1/2 md:w-3/4 w-full p-4">
            <h4 className="dark:text-accents-color text-primary-950 lg:text-heading-4 md:text-heading-5 sm:text-heading-6 text-heading-6 font-semibold text-center">
              {t("exercises")}
            </h4>
            <p className="dark:text-white text-primary-800  lg:text-des-2 md:text-des-3 sm:text-des-4 text-des-5 text-center">
              {t("desExercises")}
            </p>
            <ButtonNavigate text={t("start-learning")} link="/" onClick={""} />
          </GlassCard>
          <div>
            <img src={reading} alt="" className="w-[400px]" />
          </div>
        </div>
        <div className="flex lg:flex-nowrap flex-wrap lg:justify-between md:justify-between justify-center px-10">
          <div>
            <img src={video} alt="" className="w-[400px]" />
          </div>
          <GlassCard className="flex flex-col gap-6 justify-center items-center lg:w-1/2 md:w-3/4 w-full p-4">
            <h4 className="dark:text-accents-color text-primary-950 lg:text-heading-4 md:text-heading-5 sm:text-heading-6 text-heading-6 font-semibold text-center">
              {t("more-videos")}
            </h4>
            <p className="dark:text-white text-primary-800  lg:text-des-2 md:text-des-3 sm:text-des-4 text-des-5 text-center">
              {t("desMoreVideos")}
            </p>
            <ButtonNavigate text={t("start-learning")} link="/" onClick={""} />
          </GlassCard>
        </div>
      </div>
    </>
  );
}
