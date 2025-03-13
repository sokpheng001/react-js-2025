import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll"; // Import Link from react-scroll
import { BsPerson, BsBarChartLine } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { setActiveItem } from "../../redux/features/user/sidebarSlice.js";

const UserProfileSidebar = ({ showSignOutModal, setShowSignOutModal }) => {
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();
  const { activeItem } = useSelector((state) => state.sidebar);
  const [isAtBottom, setIsAtBottom] = useState(false); // Track if we're at the bottom of the page
  const [scrolling, setScrolling] = useState(false); // Track if we are actively scrolling
  const isVisible = useSelector((state) => state.visibility.isVisible);
  const handleAction = (item) => {
    dispatch(setActiveItem(item));
  };

  // Track scroll position and update active item
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the bottom of the page
      const bottom =
        document.documentElement.scrollHeight ===
        window.innerHeight + window.scrollY;
      setIsAtBottom(bottom);

      if (scrolling) {
        return;
      }

      // Find the current visible section based on the scroll position
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          // If section is in the middle of the screen, set it as the active section
          handleAction(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolling]);

  // Smooth scroll when clicking on a sidebar item
  const handleLinkClick = (item) => {
    setScrolling(true); // Set scrolling state to true when a section is clicked
    handleAction(item);
  };

  // Reset scrolling state after smooth scroll finishes
  useEffect(() => {
    if (scrolling) {
      setTimeout(() => setScrolling(false), 500); // Reset after smooth scroll duration
    }
  }, [scrolling]);

  // Ensure the profile section is active on initial load
  useEffect(() => {
    if (!activeItem) {
      handleAction("profile-section");
    }
  }, [activeItem]);

  const handleSignOutClick = () => {
    setShowSignOutModal(true); // Show the sign-out modal when the link is clicked
    dispatch(setActiveItem("sign-out"));
  };

  return (
    <aside
      id="logo-sidebar"
      className={`border-r border-gray-200 dark:border-gray-700 dark:bg-bg-dark-mode fixed top-0 left-0 z-40 w-64 h-screen sm:pt-[80px] pt-[60px] transition-transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } bg-white sm:translate-x-0 sm:block`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-white/5 backdrop-blur-[18px] pt-6">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="profile-section"
              smooth={true}
              duration={500}
              offset={-60}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "profile-section"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
              onClick={() => handleLinkClick("profile-section")}
            >
              <BsPerson className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("profile")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="exercise-section"
              smooth={true}
              duration={500}
              offset={-60}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "exercise-section"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
              onClick={() => handleLinkClick("exercise-section")}
            >
              <BsBarChartLine className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("learning")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              onClick={handleSignOutClick} // Use the passed function to trigger modal
              to="/sign out"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "sign-out"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
            >
              <IoIosLogOut className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("sign out")}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default UserProfileSidebar;
