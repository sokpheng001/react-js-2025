"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import GlassCard from "../../components/card/GlassCard";
import { useSpring, animated } from "@react-spring/web";

const FeedbackSection = () => {
  const { t } = useTranslation(["homepage", "about"]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const aosRefreshInterval = setInterval(() => {
      AOS.refresh();
    }, 500);

    return () => clearInterval(aosRefreshInterval);
  }, []);

  // Feedback data
  const feedback = [
    {
      id: 1,
      text: t("feedback-des-one", { ns: "homepage" }),
      author: t("sanom", { ns: "about" }),
      position: t("student"),
      image: "/img/image/sanom.jpg",
      stars: 4,
    },
    {
      id: 2,
      text: t("feedback-des-two", { ns: "homepage" }),
      author: t("rotana", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/rotana.JPG",
      stars: 5,
    },
    {
      id: 3,
      text: t("feedback-des-three", { ns: "homepage" }),
      author: t("leaphea", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/leaphea.JPG",
      stars: 5,
    },
    // {
    //   id: 4,
    //   text: t("feedback-des-four", { ns: "homepage" }),
    //   author: t("vuthy", { ns: "about" }),
    //   position: t("student"),
    //   image: "/img/teamwork-img/vuthy.JPG",
    //   stars: 5,
    // },
    {
      id: 5,
      text: t("feedback-des-five", { ns: "homepage" }),
      author: t("bora", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/bora.JPG",
      stars: 5,
    },
    // {
    //   id: 6,
    //   text: t("feedback-des-six", { ns: "homepage" }),
    //   author: t("oudom", { ns: "about" }),
    //   position: t("student"),
    //   image: "/img/teamwork-img/oudom.JPG",
    //   stars: 5,
    // },
    {
      id: 7,
      text: t("feedback-des-seven", { ns: "homepage" }),
      author: t("eric", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/eric.JPG",
      stars: 4,
    },
  ];

  // Duplicate feedback for seamless looping
  const duplicatedFeedback = [...feedback, ...feedback];

  const [isHovered, setIsHovered] = useState(false);

  // React-spring animation for smooth continuous scrolling
  const scrollAnimation = useSpring({
    from: { transform: `translateX(0%)` }, // Start from the beginning
    to: { transform: `translateX(-100%)` }, // Translate to the left
    config: { duration: 20000, easing: (t) => t }, // Smooth scroll duration
    loop: true, // Loop indefinitely
    pause: isHovered, // Pause on hover
  });

  return (
    <div className="py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-bold text-primary-500 dark:text-white text-center mb-12"
          data-aos="fade-up"
        >
          {t("feedback")}
        </h2>

        {/* Scroll Container */}
        <div
          className="overflow-hidden relative"
          style={{
            height: "25rem", // Height for the scroll area
            cursor: "default",
            userSelect: "none",
          }}
          onMouseEnter={() => setIsHovered(true)} // Pause on hover
          onMouseLeave={() => setIsHovered(false)} // Resume on leave
        >
          {/* Scroll content */}
          <animated.div
            className="flex gap-8 transition-all"
            style={scrollAnimation}
          >
            {duplicatedFeedback.map((feed, index) => (
              <div
                key={`${feed.id}-${index}`}
                className="flex-shrink-0 w-96"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <GlassCard className="w-full h-[25rem] flex flex-col justify-between dark:bg-gray-800/50 rounded-xl bg-[#f5f5f5] shadow-sm transition-shadow duration-300 p-8">
                  <div className="text-secondary-500 flex gap-1">
                    {[...Array(feed.stars)].map((_, i) => (
                      <FaStar key={i} size={20} />
                    ))}
                  </div>
                  <p className="my-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed line-clamp-6">
                    {feed.text}
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full shadow-md">
                      <img
                        alt={`${feed.author} profile picture`}
                        src={feed.image}
                        width="50"
                        height="50"
                        decoding="async"
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {feed.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {feed.position}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
