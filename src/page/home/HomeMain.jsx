import React from "react";
import Hero from "./Hero";
import shap from "../../../public/svg/1.svg";
import ellipseHalf from "../../../public/svg/2.svg";

import Description from "./Description";
import FeaturesGrid from "./Categories";
// import Container from "./Container";
// import Categories from "./Categories";
// import CategoriesCard from "./CategoriesCard";
import ContentSectionCard from "./ContentSectionCard";
import ContentSingle from "./ContentSingle";
import FeedbackSection from "./FeedbackSection";

const HomeMain = () => {
  const Container = ({ children, className = "" }) => {
    return (
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    );
  };
  return (
    <div>
      <div className="relative">
        <img
          src={shap}
          alt=""
          className="absolute mt-[-100px] w-[50%] right-0 z-[-1] hidden md:block"
        />
      </div>
      <div className="relative">
        <img
          src={ellipseHalf}
          alt=""
          className="absolute mt-[170px] w-[200px] left-0 z-[-1]"
        />
      </div>
      <Container>
        <Hero />
        <br />
        <Description />
      </Container>
      <div className="relative">
        <div className="absolute w-32 h-32 bg-primary-100 rounded-full top-[150px] left-[1px] z-0 "></div>
        <div className="absolute w-24 h-24 bg-primary-100 rounded-full top-1/3 right-1 z-0 "></div>
        <div className="absolute w-20 h-20 bg-primary-100 rounded-full bottom-[1px] left-1 z-0"></div>

        <div className="bg-primary-50/80 dark:bg-transparent relative z-10">
          <Container>
            <FeaturesGrid />
          </Container>
        </div>
      </div>
      <ContentSectionCard />
      <div className="relative">
        {/* red dot */}
        <div className="absolute w-4 h-4 bg-red-500 rounded-full top-[30px] left-[300px]"></div>
        {/* blue dot */}
        <div className="absolute w-4 h-4 bg-primary-500 rounded-full bottom-[50px] left-[60px]"></div>
        <ContentSingle />
      </div>
      <div className="dark:bg-transparent">
        <Container>
          <FeedbackSection />
        </Container>{" "}
      </div>
    </div>
  );
};

export default HomeMain;
