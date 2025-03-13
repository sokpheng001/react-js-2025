import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonNavigate from "../../components/button/ButtonNavigate";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("not-found");

  return (
    <div className="h-[50vh] place-content-center bg-bg-light-mode dark:bg-bg-dark-mode px-4">
      <div className="flex flex-col text-center xl:gap-8 lg:gap-6 gap-4">
        <h1 className="xl:text-9xl lg:text-8xl md:text-7xl text-7xl font-black text-text-des-light-mode dark:text-text-des-dark-mode">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-text-des-light-mode dark:text-text-des-dark-mode">
          {t("notFound")}
        </p>
        <div>
          <ButtonNavigate
            text={t("back")}
            link="/"
            onClick={""}
            className="mt-6 inline-block"
          />
        </div>
        {/* <NavLink
          to="/"
          className="mt-6 inline-block rounded-full dark:bg-secondary-900 bg-secondary-500 dark:hover:bg-secondary-700 hover:bg-secondary-700  px-5 py-3 text-md font-medium text-white "
        >
          {t("back")}
        </NavLink> */}
      </div>
    </div>
  );
};

export default NotFound;
