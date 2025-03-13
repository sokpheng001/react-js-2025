import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const bubbles = [
  { size: "w-24 h-24", x: "left-12", y: "bottom-1/2", delay: 0.5 },
  { size: "w-32 h-32", x: "right-0", y: "top-0", delay: 0.5 },
  { size: "w-24 h-24", x: "left-1/2", y: "top-1/2", delay: 0.7 },
  { size: "w-32 h-32", x: "right-5", y: "bottom-10", delay: 1.0 },
  { size: "w-20 h-20", x: "left-10", y: "bottom-1/4", delay: 0.8 },
];

const Bubbles = ({ className = "", children }) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);  // Start animation when bubbles come into view
          }
        });
      },
      { threshold: 0.1 }  // Trigger when 10% of the bubbles are visible
    );
    
    const bubbleContainer = document.getElementById("bubbles-container");
    if (bubbleContainer) observer.observe(bubbleContainer);

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div
      id="bubbles-container"
      className={`relative w-full space-x-7 h-screen overflow-hidden z-10 ${className}`}
    >
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute ${bubble.size} ${bubble.x} ${bubble.y} bg-primary-100 rounded-full opacity-50`}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{
            duration: 1.5,
            delay: bubble.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default Bubbles;
