
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import GlassCard from "../../components/card/GlassCard";
import ButtonNavigate from "../../components/button/ButtonNavigate";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure you import the AOS CSS

export default function ContentSectionCard() {
  const { t } = useTranslation("homepage");

  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Trigger animation only once
    });
  }, []);

  const content = [
    {
      title: t("title-cards-skill"),
      des: t("des-card-skill"),
      sub: [t("sub-des-skill1"), t("sub-des-skill2"), t("sub-des-skill3")],
      image: "/img/image/skill.jpg",
      float: "right",
      link: "/skills",
    },
    {
      title: t("title-cards-grammar"),
      des: t("des-card-grammar"),
      sub: [
        t("sub-des-grammar1"),
        t("sub-des-grammar2"),
        t("sub-des-grammar3"),
      ],
      image: "/img/image/grammer.jpg",
      float: "left",
      link: "/over-grammar",
    },
    {
      title: t("title-cards-vocab"),
      des: t("des-card-vocab"),
      sub: [t("sub-des-vocab1"), t("sub-des-vocab2"), t("sub-des-vocab3")],
      image: "/img/image/vocab.jpg",
      float: "right",
      link: "/over-vocabulary",
    },
  ];

  return (
    <div className="mt-32 md:mx-28 space-y-16">
      <div className="text-center" data-aos="fade-up">
        <p className="text-primary-400 text-heading-3 font-bold">
          {t("title-card")}{" "}
          <span className="text-secondary-400 text-heading-3 font-bold">
            {t("title-cardii")}
          </span>
        </p>
        <p className="text-primary-800 text-heading-5">{t("des-title-card")}</p>
      </div>

      {content.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col sm:flex-col md:flex-row items-center gap-7 mx-[40px]
          ${item.float === "right" ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          {/* Image Outside the GlassCard */}
          {/* <div
            className="flex-1"
            data-aos={item.float === "right" ? "fade-right" : "fade-left"}
            data-aos-delay={index * 100} // Stagger delay for each card
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover rounded-tr-[50px] rounded-bl-[50px] shadow-lg"
            />
          </div> */}

          {/* Text Content Inside the GlassCard */}
          <div
            className="flex-1"
            data-aos={item.float === "right" ? "fade-left" : "fade-right"}
            data-aos-delay={index * 100} // Stagger delay for each card
          >
            <GlassCard
              className="p-6 rounded-tl-[50px] rounded-br-[50px] 
             bg-white/10 dark:bg-[#242f31] 
             backdrop-blur-md border-2 border-white dark:border-none border-white/20"
            >
              <div className="p-5">
                <h3 className="text-primary-500 font-bold text-heading-3 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-white text-heading-5 leading-relaxed">
                  {item.des}
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-white mt-4 mb-8 text-[20px]">
                  {item.sub.map((sub, subIndex) => (
                    <li key={subIndex}>{sub}</li>
                  ))}
                </ul>
                <ButtonNavigate
                  text={t("start Learning")}
                  link={item.link}
                  addMoreStyle=""
                />
              </div>
            </GlassCard>
          </div>

          {/* Image - Responsive Positioning */}
          <div className="flex-1 order-2 md:order-${item.float === 'right' ? '2' : '1'} sm:order-2">
            <img
              data-aos={item.float === "right" ? "fade-right" : "fade-left"}
              data-aos-delay={index * 100} // Stagger delay for each card
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-auto object-cover rounded-tr-[50px] rounded-bl-[50px] shadow-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
