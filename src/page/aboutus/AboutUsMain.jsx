import React, { use } from "react";
import { useEffect } from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import MentorCard from "./MentorCard";
import Bubbles from "../../components/card/Bubble";
import MissionCard from "./MissionCard";
import VissionCard from "./VissionCard";
import AboutUsShape from "./AboutUsShape";
import MemberCard from "./MemberCard";
import WorkTogether from "../../../public/img/vextor/undraw_working-together_r43a.svg";
import OurTeamSection from "./OurTeamSection";
const AboutUsMain = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: "ease-in-out", // Easing function
      once: false, // Whether animation should happen only once
    });
  }, []);
  const { t } = useTranslation("about");
  return (
    <main className="mx-auto max-w-full overflow-hidden">
      <section className="px-4 md:px-8 xl:px-16 py-10 ">
        <div className="flex justify-center">
          <AboutUsShape className="max-w-[1205px] flex justify-center relative z-10">
            <GlassCard className="relative top-20 z-20 w-full  max-w-[1000px] md:max-w-[1100px] xl:max-w-[1205px] px-4 md:px-8 xl:px-12 py-6 md:py-8 xl:py-10 sm:border-stone-200 md:border-stone-200 xl:border-white">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-black dark:text-white mt-4">
                  {t("title")}
                </h2>
                <p className="text-base md:text-lg xl:text-xl p-4 text-gray-600 dark:text-white">
                  {t("description")}
                </p>
              </div>
              <div className="flex justify-center items-center mt-3">
                <img className="w-[200px] sm:w-[200px] md:w-[300px] xl:w-1/3" src={WorkTogether} alt="" />
              </div>
            </GlassCard>
          </AboutUsShape>
        </div>
      </section>
      <section className="container max-w-screen-xl mx-auto">
        <div className="mt-36 md:mt-96">
          <div>
            <p className="text-center text-primary-950 dark:text-primary-100 font-bold text-heading-3">
              {t("mentor")}
            </p>
          </div>
          <div>
            <MentorCard></MentorCard>
          </div>
        </div>
        <Bubbles className="mt-36">
          <div className="relative z-10 flex flex-col gap-8 justify-center items-center h-screen">
            <div>
            {/* data-aos="fade-up" data-aos-anchor-placement="top-bottom" */}
              <MissionCard />
            </div>
            <div>
              <VissionCard />
            </div>
          </div>
        </Bubbles>
        <div className="mt-36">
          <p className="text-center text-primary-950 dark:text-primary-100  font-bold text-heading-3">
            {t("teammember")}
          </p>
        </div>
        <div className="mb-12 mt-6">
          <MemberCard />
        </div>
      </section>
    </main>
  );
};
export default AboutUsMain;
