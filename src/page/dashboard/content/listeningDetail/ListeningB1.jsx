import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAllListeningB1QueryQuery } from "../../../../redux/features/skill/skillSlice";
import CourseCard from "../../../../components/card/CourseCard";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import { useNavigate } from "react-router-dom";
import ServerErrorPage from "../../../err/ServerErrorPage";

const ListeningB1 = () => {
  const { data, isLoading, error } = useAllListeningB1QueryQuery();
  const { t } = useTranslation("listeningA1");
  const exercises = data?.flatMap((item) => item.exercises) || [];
  const navigate = useNavigate(); // Initialize navigate hook
  console.log("This is an data : ", exercises);

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
    navigate(`/listening/${id}`); // Navigate to exercise detail page
    console.log(id);
    const fullUrl = `/listening/${id}`;
    console.log("Full URL:", fullUrl); // This should log the full URL
  };

  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
      <div className="max-w-full">
        <div className="container mx-auto px-4">
          <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
            <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
              {t("a1listening")}
            </h1>
          </div>

          {/* Hero Section */}
          <div className="rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://howwelead.org/wp-content/uploads/2022/07/ken-blog-7.13.22.jpg"
                alt="People collaborating at work"
                className="w-full h-[400px] object-cover"
              />
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
      </div>
    </div>
  );
};

export default ListeningB1;
