import React from "react";
import { useTranslation } from "react-i18next";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import CourseCard from "../../../../components/card/CourseCard";
import { useAllVocabulariesQuery } from "../../../../redux/features/vocabularies/VocabulariesSlice";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";
import { useNavigate } from "react-router";

const B1B2vocabulary = () => {
  const { t } = useTranslation("b1b2vocabularies");
  const { data, isLoading, error } = useAllVocabulariesQuery();
  const allData = data?.payload;
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
        title={t("b1b2vocabulary")}
        thumnail={
          "https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/2021-11/RS8874_GettyImages-1287307856-hig.jpg?itok=6lE8I5rz"
        }
        description={t("description")}
      />
      <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
        {allData?.map((item, index) => {
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
                onClick={() =>
                  navigate(`/vocabulary/${item.lessons[0].lesson_uuid}`)
                }
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default B1B2vocabulary;
