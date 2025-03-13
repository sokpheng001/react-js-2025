import React from "react";
import { useTranslation } from "react-i18next";
import TextAnimation from "../../../../components/progress/TextAnimation";
import writingJson from "../../../../data/json/writingJson.json";
import CourseCard from "../../../../components/card/CourseCard";
import { useAllSkillQuery } from "../../../../redux/features/skill/skillSlice";

const Writing = () => {
  const { t } = useTranslation("writing");
  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
      <div className="max-w-full">
        <div className="container mx-auto px-4">
          <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
            <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
              {t("title")}
            </h1>
            <TextAnimation
              jsonName={"reading"}
              text1={"readingHere"}
              text2={"fluentflow"}
              text3={"moreKnow"}
            />
          </div>

          {/* Hero Section */}
          <div className="rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/RS7522_ThinkstockPhotos-622015126-hig_0.jpg?itok=qHpUdRl_"
                alt="People collaborating at work"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="bg-white dark:bg-bg-dark-mode rounded-lg p-6 mx-4 text-center shadow-lg">
                  <p className="text-primary-500 text-xl md:text-2xl font-bold mb-4">
                    {t("des")}
                  </p>
                  <button className="dark:bg-secondary-900 bg-secondary-500 dark:hover:bg-secondary-700 hover:bg-secondary-700 text-white text-des-4 py-3 px-8 rounded-full mt-2 transition duration-300">
                    {t("start")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4">
            <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10">
              {t("description")}
            </p>
          </div>

          {/* Courses Section */}
          <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
            {writingJson.map((items) => (
              <CourseCard
                link={items.link}
                key={items.level}
                title={items.title}
                img={items.img}
                des={items.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing;
