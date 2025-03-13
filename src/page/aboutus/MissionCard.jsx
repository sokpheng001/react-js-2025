import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import hello from "../../../public/img/iconSVG/hello.svg";
export default function MissionCard() {
  const { t } = useTranslation("about");

  return (
    <div className="flex justify-center p-4">
      <GlassCard className="w-full max-w-[1100px] p-5 md:h-auto">
        <div className="flex flex-wrap items-center justify-center p-4 gap-6">
          {/* Image (Hidden on small screens) */}
          <img
            className="hidden sm:hidden md:block w-full max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
            src={hello}
            loading="lazy"
            alt="Mission"
          />

          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-accents-color">
              {t("ourmission")}
            </h2>
            <p className="text-base md:text-lg text-[#666666] dark:text-white mt-3">
              {t("mission-description")}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
