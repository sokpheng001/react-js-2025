import React from "react";
import { useTranslation } from "react-i18next";
import img from "../../../../../public/img/dashboard/girls.jpg";

export default function Section1() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      {/* first section */}
      <div className="relative flex justify-center ">
        <div className="flex justify-center w-full">
          <img
            src={img}
            alt="img-dashboard"
            className="rounded-lg  max-h-screen"
          />
          <div className="absolute bottom-0 flex justify-center bg-bg-light-mode dark:bg-bg-dark-mode rounded-tl-lg  rounded-tr-lg">
            <h2 className=" text-primary-500 font-bold  xl:text-heading-1 lg:text-heading-2  md:text-heading-4 sm:text-heading-5  text-heading-6 whitespace-nowrap xl:py-10 lg:py-8 md:py-6 sm:py-4 py-2 text-center xl:px-20 lg:px-12 md:px-10 sm:px-6 px-6">
              {t("learnOnline")}
              <span className="text-accents-color">{t("fluentflow")}</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
