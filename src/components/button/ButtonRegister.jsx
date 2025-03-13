import React, { useTransition } from "react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const ButtonRegister = () => {
  const { t } = useTranslation("navbar");
  return (
    <NavLink
      className="rounded-md bg-secondary-500 px-5 py-2 text-black transition text-heading-6 font-bold"
      to="/login"
    >
      {t("register")}
    </NavLink>
  );
};

export default ButtonRegister;
