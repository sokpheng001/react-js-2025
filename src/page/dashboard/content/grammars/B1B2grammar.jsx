import React from "react";
import { useTranslation } from "react-i18next";
import { useAllGrammarQuery } from "../../../../redux/features/grammar/grammarSlice";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import CourseCard from "../../../../components/card/CourseCard";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import { useNavigate } from "react-router";

const A1B2grammar = () => {
  const { t } = useTranslation("b1b2grammar");
  const { data, isLoading, error } = useAllGrammarQuery();
  const navigate = useNavigate(); // Initialize navigate hook

  if (isLoading) {
    return (
      <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
        <HeroSkeleton />
        <CoursesSkeleton />
      </div>
    );
  }
  if (error) {
    return <ServerErrorPage />; // Handle errors properly
  }
  return (
    <div className="p-4 sm:ml-64  mt-[88px]">
      <HeroLevel
        title={t("b1b2grammar")}
        thumnail={
          "https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/2023-03/RS7979_ThinkstockPhotos-625733420-hig-flip.jpg?itok=Lp0lXONW"
        }
        description={t("description")}
      />
      <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
        {data?.map((item, index) => {
          if (
            item.lessons.length > 0 && // Ensure lessons array is not empty
            (item.lessons[0].lesson_level === "B1" ||
              item.lessons[0].lesson_level === "B2")
          ) {
            return (
              <CourseCard
                key={index} // Include index here
                title={item.lessons[0].lesson_title}
                img={item.lessons[0].thumbnail}
                des={item.lessons[0].description}
                onClick={() => navigate(`/lesson/${item.lessons[0].lesson_uuid}`)}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default A1B2grammar;
