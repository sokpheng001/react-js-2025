import React from "react";
import GlassCard from "../../components/card/GlassCard";
const CoursesMain = () => {
  return (
    <div className="h-[2000px]">
      <div className="flex justify-center mt-10">
        <GlassCard className="w-80 text-white text-center">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
            alt="Profile"
            className="w-20 h-20 mx-auto rounded-full border dark:border-white/30 border-black"
          />
          <h2 className="text-xl font-semibold mt-3 text-black dark:text-white">
            Toch Ratana
          </h2>
          <p className="text-text-des-light-mode text-sm dark:text-text-des-dark-mode">
            @ratana
          </p>
          <p className="mt-2 text-text-des-light-mode text-sm dark:text-text-des-dark-mode">
            Frontend Developer | IT Student
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default CoursesMain;
