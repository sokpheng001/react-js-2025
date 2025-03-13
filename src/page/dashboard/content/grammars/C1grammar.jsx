import React from "react";
import { useTranslation } from "react-i18next";
import { useAllGrammarQuery } from "../../../../redux/features/grammar/grammarSlice";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import CourseCard from "../../../../components/card/CourseCard";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import { useNavigate } from "react-router";

const C1grammar = () => {
  const { t } = useTranslation("c1grammar");
  const { data, isLoading, error } = useAllGrammarQuery();
  const navigate = useNavigate();

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
        title={t("c1grammar")}
        thumnail={
          "https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/430x261_4/public/2023-05/RS8090_GettyImages-769719673-hig.jpg?itok=pnDb6ZnC"
        }
        description={t("description")}
      />
      <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
        {data?.map((item, index) => {
          if (
            item.lessons.length > 0 && // Ensure lessons array is not empty
            item.lessons[0].lesson_level === "C1"
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

export default C1grammar;
