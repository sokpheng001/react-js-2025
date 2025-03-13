import React from 'react'
import { NavLink } from 'react-router';
import { useTranslation } from "react-i18next";
export default function RegisterBtn() {
    const { t } = useTranslation("navbar");
  return (
    <NavLink
      className="hidden md:flex rounded-md bg-secondary-500 px-4 py-2 text-heading-6 text-white transition font-semibold"
      to="/register"
    >
      {t("register")}
    </NavLink>
  );
}
