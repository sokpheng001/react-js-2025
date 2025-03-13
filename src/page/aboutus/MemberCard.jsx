import React from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function MemberCard() {
  const { t } = useTranslation("about");

  const teamMembers = [
    {
      name: t("oudom"),
      image: "/img/teamwork-img/oudom.JPG",
      linkedin: "https://www.linkedin.com/in/oudom-phoem-8a12b62a3",
      email: "https://mail.google.com/mail/u/0/#search/oudomphoem%40gmail.com?compose=new",
      github: "https://github.com/oudomm",
    },
    {
      name: t("rotana"),
      image: "/img/teamwork-img/rotana.JPG",
      linkedin: "https://www.linkedin.com/in/ratana-touch-930119302/",
      email: "https://mail.google.com/mail/u/0/#search/toch.ratana.rml%40gmail.com?compose=new",
      github: "https://github.com/tochratana",
    },
    {
      name: t("leaphea"),
      image: "/img/teamwork-img/leaphea.JPG",
      linkedin: "https://www.linkedin.com/in/ansoleaphea-lim-a27999328/",
      email: "https://mail.google.com/mail/u/0/#search/ansoleaphea%40gmail.com?compose=new",
      github: "https://github.com/Leaphea-Lim",
    },
    {
      name: t("vuthy"),
      image: "/img/teamwork-img/vuthy.JPG",
      linkedin: "https://www.linkedin.com/in/vuthy-tourn-14ab38354/",
      email: "https://mail.google.com/mail/u/0/#search/vuthytuon168%40gmail.com?compose=new",
      github: "https://github.com/Vuthy-Tourn",
    },
    {
      name: t("eric"),
      image: "/img/teamwork-img/eric.JPG",
      linkedin: "https://www.linkedin.com/in/eric-va-b38456303/",
      email: "https://mail.google.com/mail/u/0/#search/ericva01%40gmail.com?compose=new",
      github: "https://github.com/ericva01",
    },
    {
      name: t("bora"),
      image: "/img/teamwork-img/bora.JPG",
      linkedin: "https://www.linkedin.com/in/tong-bora-a0760a333/",
      email: "https://mail.google.com/mail/u/0/#search/tongbora.official%40gmail.com?compose=new",
      github: "https://github.com/tongbora",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 md:px-20 dark:text-white">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center mt-5">
            {/* Name Tag */}
            <div className="text-white font-bold text-xl px-6 py-2 rounded-tl-[25px] rounded-br-[25px] bg-accents-color mb-[15px]">
              {member.name}
            </div>

            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="w-64 h-64 rounded-tl-[50px] rounded-br-[50px] object-cover shadow-lg"
            />

            {/* Social Icons */}
            <div className="flex mt-5 text-3xl text-primary-950 dark:text-white">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="cursor-pointer mr-4 hover:text-primary-100" />
              </a>
              <a href={member.email} target="_blank" rel="noopener noreferrer">
                <FaEnvelope className="cursor-pointer mx-2 hover:text-primary-100" />
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="cursor-pointer ml-4 hover:text-primary-100" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
