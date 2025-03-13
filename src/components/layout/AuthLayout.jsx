import React from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import blob from "../../../public/svg/Blob.svg";
import ellipse from "../../../public/svg/Ellipse.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";

const AuthLayout = ({
  children,
  theme,
  onGoBack,
  imageSrc, // New prop for dynamic image
  blobPosition, // Custom positions for blob
  ellipse1Position, // Custom positions for ellipse
  ellipse2Position, // Custom positions for ellipse
}) => {
  return (
    <div className="flex flex-wrap h-screen items-center justify-center bg-white dark:bg-bg-dark-mode">
      <div className="relative flex w-full max-w-9xl overflow-hidden rounded-2xl backdrop-blur-lg min-w-[200px]">
        <div className="max-w-7xl w-full flex mx-auto flex-wrap">
          {/* Left - Image (Hidden on Small Screens) */}
          <div className="hidden w-full md:w-[40%] lg:flex p-4 order-2 md:order-2 lg:order-1 mx-auto">
            <img src={imageSrc} alt="Page Illustration" className="w-full" />
          </div>

          {/* Right - Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 order-1 md:order-1">
            <div className="w-full max-w-lg bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg dark:bg-gray-800/60">
              <div className="flex justify-between">
                <a href="/">
                  <img
                    src={theme === "light" ? logolightmode : logodarkmode}
                    alt="Logo"
                    className="w-32 md:w-40"
                  />
                </a>
                <button
                  onClick={onGoBack}
                  className="p-2 rounded-full transition duration-300"
                >
                  <FaTimes className="text-xl text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              {children}
            </div>
          </div>

          {/* Blob Image (Hidden on Small Screens) */}
          <div
            className={`absolute w-full md:flex items-center justify-center -z-30 ${blobPosition}`}
          >
            <img src={blob} alt="blob" />
          </div>

          {/* Ellipse Image */}
          <div
            className={`absolute w-full md:flex items-center justify-center -z-30 ${ellipse1Position}`}
          >
            <img src={ellipse} alt="ellipse" />
          </div>
          <div
            className={`absolute w-[100px] md:flex items-center justify-center -z-30 ${ellipse2Position}`}
          >
            <img src={ellipse} alt="ellipse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
