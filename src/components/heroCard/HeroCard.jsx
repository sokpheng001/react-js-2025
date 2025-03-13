import React from "react";
import TextAnimation from "../progress/TextAnimation";
import ButtonNavigate from "../button/ButtonNavigate";

export const HeroCard = ({
  title,
  text1,
  text2,
  text3,
  jsonname,
  img,
  des,
  start,
  link,
  description,
}) => {
  return (
    <>
      <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
        <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
          {title}
        </h1>
        <TextAnimation
          jsonName={jsonname}
          text1={text1}
          text2={text2}
          text3={text3}
        />
      </div>

      {/* Hero Section */}
      <div className="rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={img}
            alt="People collaborating at work"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="bg-white dark:bg-bg-dark-mode rounded-lg p-6 mx-4 text-center shadow-lg">
              <p className="text-primary-500 text-xl md:text-2xl font-bold mb-4">
                {des}
              </p>
              <ButtonNavigate text={start} link={link} />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10">
          {description}
        </p>
      </div>
    </>
  );
};
