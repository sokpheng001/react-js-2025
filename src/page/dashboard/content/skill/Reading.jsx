import { useTranslation } from "react-i18next";
import CourseCard from "../../../../components/card/CourseCard";
import readingJson from "../../../../data/json/reading.json";
import TextAnimation from "../../../../components/progress/TextAnimation";
import ButtonNavigate from "../../../../components/button/ButtonNavigate";

const Reading = () => {
  const skeleton = Array(8).fill(0);
  const { t } = useTranslation("reading");

  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
      <div className="max-w-full">
        <div className="container mx-auto px-4">
          <div className="md:h-auto xl:text-heading-2 flex flex-wrap md:flex-nowrap items-center gap-1 sm:gap-2 text-heading-4">
            <h1 className="text-primary-500 dark:text-primary-500 font-bold py-0 md:py-5 whitespace-nowrap">
              {t("title")}
            </h1>
            <TextAnimation
              jsonName="reading"
              text1="readingHere"
              text2="fluentflow"
              text3="moreKnow"
            />
          </div>

          {/* Hero Section */}
          <div className="rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/2021-10/RS5825_169280449-hig.jpg?itok=wYILtdrb"
                alt="People collaborating at work"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="bg-white dark:bg-bg-dark-mode rounded-lg p-6 mx-4 text-center shadow-lg">
                  <p className="text-primary-500 text-xl md:text-2xl font-bold mb-4">
                    {t("des")}
                  </p>
                  <ButtonNavigate text={t("start")} link={"#"} />
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
            {readingJson.map((items) => (
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

export default Reading;
