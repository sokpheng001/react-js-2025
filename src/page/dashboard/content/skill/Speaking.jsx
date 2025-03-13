import React from "react";
import { useTranslation } from "react-i18next";
import CourseCard from "../../../../components/card/CourseCard";
import speaking from "../../../../data/json/speaking.json";
import TextAnimation from "../../../../components/progress/TextAnimation";
import ButtonNavigate from "../../../../components/button/ButtonNavigate";
import { HeroCard } from "../../../../components/heroCard/HeroCard";
const Speaking = () => {
  // const { data, isLoading, error } = useAllReadingQuery();
  const { t } = useTranslation("speaking");

  // console.log({ data, isLoading, error }); // Debugging log

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
      <div className="max-w-full">
        <div className=" container mx-auto px-4">
          <HeroCard
            title={t("title")}
            img={
              "https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/RS8016_GettyImages-646457628-hig_2.jpg?itok=z_YbpNkB"
            }
            text1={t("text1")}
            text2={t("text2")}
            text3={t("text3")}
            des={t("des")}
            start={t("start")}
            description={t("description")}
          />
        </div>
        {/* Level Courses */}
        <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
          {speaking.map((items) => (
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
  );
};

export default Speaking;
