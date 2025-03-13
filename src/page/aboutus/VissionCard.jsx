import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import education from "../../../public/img/iconSVG/education.svg";
export default function VissionCard() {
  const { t } = useTranslation("about");

  return (
    <div className="flex justify-center p-4 md:mx-5">
      <GlassCard className="w-full max-w-[1100px] p-5 md:h-auto">
        <div className="flex flex-wrap items-center justify-between p-4 gap-6">
          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-accents-color">
              {t("ourvision")}
            </h2>
            <p className="text-base md:text-lg text-[#666666] dark:text-white mt-3">
              {t("vision-description")}
            </p>
          </div>

          {/* Image (Hidden on `sm` and smaller, visible from `md`) */}
          <img
            className="hidden md:block w-full max-w-[350px] lg:max-w-[450px]"
            src={education}
            loading="lazy"
            alt="Vision"
          />
        </div>
      </GlassCard>
    </div>
  );
}
