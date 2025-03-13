import React from "react";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import { useTranslation } from "react-i18next";
import { useAllWritingA1QueryQuery } from "../../../../redux/features/skill/skillSlice";
import CourseCard from "../../../../components/card/CourseCard";
import { useNavigate } from "react-router-dom";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";

export const WritingA1 = () => {
  const { data, isLoading, error } = useAllWritingA1QueryQuery();
  const { t } = useTranslation("reading");
  const navigate = useNavigate(); // Initialize navigate hook
  const exercises = data?.flatMap((item) => item.exercises) || [];

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

  // Handle click on card to get exercise ID and navigate to another page
  const handleCardClick = (id) => {
    navigate(`/exercises/${id}`); // Navigate to exercise detail page
    console.log(id);
    const fullUrl = `/exercises/${id}`;
    console.log("Full URL:", fullUrl); // This should log the full URL
  };

  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[88px] mb-10 container mx-auto px-4">
      <HeroLevel
        thumnail={
          "https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/2021-10/RS8039_GettyImages-554489637-hig.jpg?itok=DMT6G5Yv"
        }
        title={t("a1writing")}
        description={t("description")}
      />
      {/* Render Courses  */}

      <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
        {exercises.map((item, index) => (
          <CourseCard
            key={index}
            title={item.title}
            img={item.thumbnail}
            des={item.description}
            onClick={() => handleCardClick(item.ex_uuid)} // Passing the ex_uuid correctly
          />
        ))}
      </div>
    </div>
  );
};
