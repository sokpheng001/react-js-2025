import React from "react";
import { useTranslation } from "react-i18next";
import dashboardUser from "../../../../../public/svg/dashboardUser.svg";
export default function Section3() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      {/* fhird section */}
      <div className="xl:pb-16 lg:pb-14 md:pb-12 sm:pb-10 pb-8">
        <div className="dark:bg-primary-600 bg-[#A6E2FA] flex lg:flex-nowrap flex-wrap lg:px-16 md:px-8 px-4 lg:justify-between md:justify-center justify-center lg:gap-5 gap-4">
          <div className="justify-center items-center ">
            <img
              src={dashboardUser}
              alt="dashboardUser"
              className="lg:w-96 lg:h-96 md:w-80 md:h-80 sm:w-72 sm:h-64 h-60 w-64"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className="dark:text-text-des-dark-mode text-primary-950 lg:text-heading-3 md:text-heading-4 text-heading-5 text-center">
              {t("addmore")}
            </h3>
            <h4 className="dark:text-text-des-dark-mode text-primary-950 lg:text-heading-4 md:text-heading-5 text-heading-6 text-center">
              {t("startFree")}
            </h4>
            <p className="dark:text-text-des-dark-mode text-primary-950 lg:text-des-2 md:text-des-3 text-des-5 text-center">
              {t("skill")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
