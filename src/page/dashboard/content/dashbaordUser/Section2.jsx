import React from "react";
import { useTranslation } from "react-i18next";

export default function Section2() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      <div className="xl:py-16 lg:py-14 md:py-12 sm:py-10 py-8">
        <p className="dark:text-text-des-dark-mode text-primary-800  lg:text-heading-4 md:text-heading-6 flex justify-center  text-center">
          {t("whatYouFindHere")}
          {t("special")}
          {t("by")}
        </p>
      </div>
    </>
  );
}
