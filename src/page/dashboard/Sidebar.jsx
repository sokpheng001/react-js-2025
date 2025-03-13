import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { SiHyperskill } from "react-icons/si";
import menuForSidebar from "../../data/menu.js";
import skillForSidebar from "../../data/skill.js";
import grammarForSidebar from "../../data/grammar.js";
import vocabularyForSidebar from "../../data/vocabulary.js";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router";
import ThemeToggle from "../../components/button/ThemeToggle";
import ButtonLanguage from "../../components/button/ButtonLanguage";
import { TbTextGrammar, TbVocabulary } from "react-icons/tb";
import { PiUserSoundFill } from "react-icons/pi";
import { MdVideoLibrary } from "react-icons/md";

import {
  setActiveItem,
  toggleDropdown,
} from "../../redux/features/user/sidebarSlice.js";

const Sidebar = () => {
  // for two language
  const { t } = useTranslation("dashboard");
  const isVisible = useSelector((state) => state.visibility.isVisible);
  // import object
  const menu = menuForSidebar();
  const skill = skillForSidebar();
  const grammar = grammarForSidebar();
  const vocabulary = vocabularyForSidebar();

  // dispatch aciton
  const dispatch = useDispatch();
  const { activeItem, openDropdowns } = useSelector((state) => state.sidebar);

  // handle click
  const handleAction = (item, dropdown) => {
    dispatch(setActiveItem(item)); // Set active item
    dispatch(toggleDropdown(dropdown)); // Toggle dropdown
  };

  const handleClick = (item) => {
    dispatch(setActiveItem(item));
  };

  return (
    <aside
      id="logo-sidebar"
      className={`border-r border-gray-200 dark:border-gray-700 dark:bg-bg-dark-mode fixed top-0 left-0 z-40 w-64 h-screen sm:pt-[80px] pt-[60px] transition-transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } bg-white sm:translate-x-0 sm:block`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-16 overflow-y-auto dark:bg-white/5 backdrop-blur-[18px] pt-6">
        <ul className="space-y-2 font-medium">
          {/* Overview */}
          <li>
            <NavLink
              to="/dashboard"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "dashboard"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
              onClick={() => handleAction("dashboard", "dashboard")}
            >
              <FaHome className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("overview")}
              </span>
            </NavLink>
          </li>

          {/* Skills */}
          <li>
            <NavLink
              type="button"
              to="/skills"
              onClick={() => handleAction("skill", "skill")}
              className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-primary-100 hover:text-white dark:text-white dark:hover:bg-primary-950 ${
                activeItem === "skill"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
            >
              <SiHyperskill />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {t("skill")}
              </span>
              {openDropdowns.includes("skill") ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </NavLink>
            {openDropdowns.includes("skill") && (
              <ul className="py-2 space-y-2">
                {skill.map((skillItem) => (
                  <li key={skillItem.text}>
                    <NavLink
                      to={skillItem.path}
                      onClick={() => handleClick(skillItem.text)}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-primary-100 hover:text-white dark:text-white dark:hover:bg-primary-950 cursor-pointer ${
                        activeItem === skillItem.text
                          ? "bg-primary-100 dark:bg-primary-950 text-white"
                          : ""
                      }`}
                    >
                      {skillItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* Grammar */}
          <li>
            <NavLink
              type="button"
              to="/over-grammar"
              onClick={() => handleAction("grammar", "grammar")}
              className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-primary-100 hover:text-white dark:text-white dark:hover:bg-primary-950 ${
                activeItem === "grammar"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
            >
              <TbTextGrammar />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {t("grammar")}
              </span>
              {openDropdowns.includes("grammar") ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </NavLink>
            {openDropdowns.includes("grammar") && (
              <ul className="py-2 space-y-2">
                {grammar.map((grammarItem) => (
                  <li key={grammarItem.text}>
                    <NavLink
                      to={grammarItem.path}
                      onClick={() => handleClick(grammarItem.text)}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-primary-100 hover:text-white dark:text-white dark:hover:bg-primary-950 cursor-pointer ${
                        activeItem === grammarItem.text
                          ? "bg-primary-100 dark:bg-primary-950 text-white"
                          : ""
                      }`}
                    >
                      {grammarItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* Vocabulary */}
          <li>
            <NavLink
              to="/over-vocabulary"
              onClick={() => handleAction("vocabulary", "vocabulary")}
              className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-primary-100 hover:text-white dark:text-white dark:hover:bg-primary-950 ${
                activeItem === "vocabulary"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
            >
              <TbVocabulary />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {t("vocabulary")}
              </span>
              {openDropdowns.includes("vocabulary") ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </NavLink>
            {openDropdowns.includes("vocabulary") && (
              <ul className="py-2 space-y-2">
                {vocabulary.map((grammarItem) => (
                  <li key={grammarItem.text}>
                    <NavLink
                      to={grammarItem.path}
                      onClick={() => handleClick(grammarItem.text)}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-primary-100 hover:text-white dark:text-white dark:hover:bg-primary-950 cursor-pointer ${
                        activeItem === grammarItem.text
                          ? "bg-primary-100 dark:bg-primary-950 text-white"
                          : ""
                      }`}
                    >
                      {grammarItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/soundTts"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "soundTts"
                  ? "bg-primary-100 dark:bg-primary-950"
                  : ""
              }`}
              onClick={() => handleClick("soundTts")}
            >
              <PiUserSoundFill className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("soundTts")}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/extra-video"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "extraVideo"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
              onClick={() => handleClick("extraVideo")}
            >
              <MdVideoLibrary className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("extraVideo")}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <ul className="absolute bg-white/10 backdrop-blur-md border-2 border-white dark:border-none border-white/20 bottom-0 w-64 left-0 flex justify-between px-5 py-2 sm:hidden">
        <ButtonLanguage />
        <ThemeToggle />
      </ul>
    </aside>
  );
};

export default Sidebar;
