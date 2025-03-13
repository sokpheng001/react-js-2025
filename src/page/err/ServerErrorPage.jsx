import React from "react";
import { useTranslation } from "react-i18next";
import { MdError } from "react-icons/md";
const ServerErrorPage = () => {
  const { t } = useTranslation("error");
  return (
    <div className="max-w-screen-xl sm:ml-64 flex flex-col items-center justify-center min-h-screen bg-bg-light-mode dark:bg-bg-dark-mode text-text-des-light-mode dark:text-text-des-dark-mode">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 bg-bg-light-mode dark:bg-bg-dark-mode flex items-center justify-center dark:border-text-des-dark-mode border-text-des-light-mode">
          <div className="h-screen flex flex-col justify-center items-center">
            <MdError className="text-8xl pb-2" />
            <p className="text-4xl font-medium text-text-des-light-mode dark:text-text-des-dark-mode">
              Internal Server Error
            </p>
            <p className="text-xl text-text-des-light-mode dark:text-text-des-dark-mode mt-4">
              {t("apologize")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
