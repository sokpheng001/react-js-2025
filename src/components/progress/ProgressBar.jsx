import React, { useEffect, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import ChatBot from "../AI/ChatBot"; // Import the ChatBot component

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;

      setScrollProgress(scrollPercent);
      setIsVisible(scrollPercent > 5); // Show progress bar when scrolled beyond 5%
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-[1000] fixed top-0 left-0 right-0 h-2 transition-all duration-300 ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div
        className="h-full bg-secondary-500"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

const BackToTopButton = ({ setBackToTopVisible }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
      setIsVisible(scrollPercent > 5); // Show button when scrolled beyond 5%

      setBackToTopVisible(scrollPercent > 5); // Notify ChatBot of visibility change
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setBackToTopVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed bottom-5 right-5 bg-secondary-500 text-white p-3 rounded-full shadow-lg transition-opacity z-50 duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      <FaCircleArrowUp size={20} />
    </button>
  );
};

const App = () => {
  const [isBackToTopVisible, setBackToTopVisible] = useState(false);

  return (
    <div>
      <ProgressBar />
      <BackToTopButton setBackToTopVisible={setBackToTopVisible} />
      <ChatBot isBackToTopVisible={isBackToTopVisible} />
    </div>
  );
};

export default App;
