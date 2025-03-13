import { useSelector } from "react-redux";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import istadLogoLight from "../../../public/img/logo/istad-logo-light.webp";
import istadLogoDark from "../../../public/img/logo/istad-logo-dark.png";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { AiOutlineMail } from "react-icons/ai";

export default function Footer() {
  const theme = useSelector((state) => state.theme.theme);
  const { t } = useTranslation("footer");
  return (
    <footer className="bg-[#f1f5f9] dark:bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-2 sm:grid-cols-2 justify-items-center gap-4">
          {/* Logo */}
          <div className="flex flex-col justify-start xl:items-start lg:items-start md:items-center sm:items-center items-center text-center col-span-2 pb-2">
            <img
              src={theme === "dark" ? logodarkmode : logolightmode}
              alt="Logo"
              className="w-48 mb-6"
            />
            <p className="text-text-des-light-mode dark:text-text-des-dark-mode">
              <span className="text-primary-500 dark:text-white font-bold">
                FluentFlow
              </span>{" "}
              {t("isTheBest")}
            </p>
          </div>
          {/* Contents */}
          <div className="flex flex-col">
            <h5 className="text-heading-5 font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("contents")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <NavLink to="/">{t("home")}</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">{t("courses")}</NavLink>
              </li>
              <li>
                <NavLink to="/about">{t("about")}</NavLink>
              </li>
              <li>
                <NavLink to="/contact">{t("contact")}</NavLink>
              </li>
            </ul>
          </div>
          {/* Skills */}
          <div className="flex flex-col">
            <h5 className="text-heading-5 font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("skills")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <NavLink to="/listening">{t("listening")}</NavLink>
              </li>
              <li>
                <NavLink to="/reading">{t("reading")}</NavLink>
              </li>
              <li>
                <NavLink to="/writing">{t("writing")}</NavLink>
              </li>
              <li>
                <NavLink to="/speaking">{t("speaking")}</NavLink>
              </li>
            </ul>
          </div>
          {/* Grammar */}
          <div className="flex flex-col">
            <h5 className="text-heading-5 font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("grammar")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <NavLink to="/a1a2grammar">A1 - A2</NavLink>
              </li>
              <li>
                <NavLink to="/b1b2grammar">B1 - B2</NavLink>
              </li>
              <li>
                <NavLink to="/c1grammar">C1</NavLink>
              </li>
            </ul>
          </div>
          {/* Vocabulary */}
          <div className="flex flex-col">
            <h5 className="text-xl font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("vocabulary")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <NavLink to="/a1a2vocabulary">A1 - A2</NavLink>
              </li>
              <li>
                <NavLink to="/a1a2vocabulary">B1 - B2</NavLink>
              </li>
              <li>
                <NavLink to="">C1</NavLink>
              </li>
            </ul>
          </div>
          {/* Organize */}
          <div className="col-span-2 flex flex-col justify-center items-center ">
            {/* ISTAD */}
            <div className="flex flex-col pb-8">
              <h5 className="text-xl font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode text-center">
                {t("organizeBy")}
              </h5>
              <img
                className="w-40"
                src={theme === "dark" ? istadLogoDark : istadLogoLight}
                alt="ISTAD Logo"
              />
            </div>
            <div>
              <h5 className="text-xl font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode flex flex-col justify-start xl:items-start lg:items-start md:items-start sm:items-center items-center text-center col-span-2 ">
                {t("newsLetter")}
              </h5>
              <div className="flex justity-center items-center">
                <input
                  className=" border-none bg-[#f1f5f9] dark:bg-white/5 blur-none dark:pl-2  dark:text-white placeholder-text-des-light-mode dark:placeholder-text-des-dark-mode placeholder:text-left text-sm pl-0 w-60 focus:outline-none focus:ring-0 focus:border-transparent"
                  placeholder="Enter your email address"
                  type="text"
                />
                <AiOutlineMail className="h-8 w-8 text-primary-300" />
              </div>
              <hr className="bg-text-des-light-mode border-0 h-px" />
            </div>
          </div>
        </div>
        <hr className="bg-text-des-light-mode dark:bg-text-des-dark-mode my-8 border-0 h-px" />
        <div className="text-center">
          <p className="text-text-des-light-mode dark:text-text-des-dark-mode">
            &copy; 2025 FluentFlow {t("by")}{" "}
            <a href="https://www.cstad.edu.kh/">ISTAD{t(".")}</a>{" "}
            {t("allRights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
