// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import cherPheng from "../../../public/img/image/cherPheng.png";
// import cherDavan from "../../../public/img/image/cherDavan.png";
// import { useTranslation } from "react-i18next";
// import { FaLinkedinIn } from "react-icons/fa";
// import { IoMdMail } from "react-icons/io";
// import { FaGithub } from "react-icons/fa";
// export default function MentorCard() {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000, // Animation duration (in ms)
//       easing: "ease-in-out", // Easing function
//       once: true, // Whether animation should happen only once
//     });
//   }, []);
//   const { t } = useTranslation("about");
//   return (
//     <div  className="flex flex-wrap justify-center">
//       <div data-aos="fade-right"   className="px-10">
//         <div className="flex justify-center mt-12">
//           <div className="rounded-tl-[40px] rounded-br-[40px] bg-accents-color ">
//             <p className="pt-2 pb-2 py-16 px-8 text-center font-bold text-heading-5 text-white">
//               {t("cherPheng")}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <img className="w-72 mt-5" src={cherPheng} alt="" />
//         </div>
//         <div className="flex justify-center p-5">
//           <a
//             className="p-3"
//             href="http://linkedin.com/in/kim-chansokpheng-6b6513267"
//           >
//             <FaLinkedinIn className="size-9 text-primary-950 hover:text-[#1560BD] dark:text-white" />
//           </a>
//           <a className="p-3" href="http://">
//             <IoMdMail className="size-9 text-primary-950 hover:text-[#1560BD] dark:text-white" />
//           </a>
//           <a className="p-3" href="http://">
//             <FaGithub className="size-9 text-primary-950 hover:text-[#1560BD] dark:text-white" />
//           </a>
//         </div>
//       </div>
//       <div data-aos="fade-left"   className="px-10">
//         <div className="flex justify-center mt-12">
//           <div className="rounded-tl-[40px] rounded-br-[40px] bg-accents-color ">
//             <p className="pt-2 pb-2 py-16 px-16 text-center font-bold text-heading-5 text-white">
//               {t("cherDavan")}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <img className="w-72 mt-5" src={cherDavan} alt="" />
//         </div>
//         <div className="flex justify-center p-5">
//           <a className="p-3" href="http://linkedin.com/in/ing-davann-0617b32a3">
//             <FaLinkedinIn className="size-9 text-primary-950 hover:text-[#1560BD] dark:text-white" />
//           </a>
//           <a className="p-3" href="http://">
//             <IoMdMail className="size-9 text-primary-950 hover:text-[#1560BD] dark:text-white" />
//           </a>
//           <a className="p-3" href="http://">
//             <FaGithub className="size-9 text-primary-950 hover:text-[#1560BD] dark:text-white" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import cherPheng from "../../../public/img/image/LokKruPheng.png";
import cherDavan from "../../../public/img/image/LokKruDavan.png";
import { useTranslation } from "react-i18next";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

export default function MentorCard() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once
    });
  }, []);

  const { t } = useTranslation("about");

  return (
    <div className="flex flex-wrap justify-center">
      <div data-aos="fade-right" className="px-10">
        <div className="flex justify-center mt-12">
          <div className="rounded-tl-[40px] rounded-br-[40px] bg-accents-color ">
            <p className="pt-2 pb-2 py-16 px-8 text-center font-bold text-heading-5 text-white">
              {t("cherPheng")}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-72 mt-5"
            src={cherPheng}
            alt="Cher Pheng"
            loading="lazy" // Lazy loading attribute
          />
        </div>
        <div className="flex justify-center p-5 text-primary-950 dark:text-white">
          {/* LinkedIn */}
          <a
            className="p-3"
            href="https://linkedin.com/in/kim-chansokpheng-6b6513267"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="size-9 hover:text-primary-100" />
          </a>

          {/* Email */}
          <a
            className="p-3"
            href="https://mail.google.com/mail/u/0/#search/kimchansokpheng123%40gmail.com?compose=new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoMdMail className="size-9 hover:text-primary-100" />
          </a>

          {/* GitHub */}
          <a
            className="p-3"
            href="https://github.com/sokpheng001"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="size-9 hover:text-primary-100" />
          </a>
        </div>
      </div>

      <div data-aos="fade-left" className="px-10">
        <div className="flex justify-center mt-12">
          <div className="rounded-tl-[40px] rounded-br-[40px] bg-accents-color ">
            <p className="pt-2 pb-2 py-16 px-16 text-center font-bold text-heading-5 text-white">
              {t("cherDavan")}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-72 mt-5"
            src={cherDavan}
            alt="Cher Davan"
            loading="lazy" // Lazy loading attribute
          />
        </div>
        <div className="flex justify-center p-5 text-primary-950 dark:text-white">
          <a className="p-3"
          target="_blank"
          rel="noopener noreferrer"
          href="http://linkedin.com/in/ing-davann-0617b32a3">
            <FaLinkedinIn className="size-9  hover:text-primary-100 " />
          </a>
          <a className="p-3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://mail.google.com/mail/u/0/#search/ingdavann4444%40gmail.com?compose=new">
            <IoMdMail className="size-9  hover:text-primary-100" />
          </a>
          <a className="p-3"
          target="_blank"
          rel="noopener noreferrer"
          href="http://github.com/ingdavann">
            <FaGithub className="size-9  hover:text-primary-100 " />
          </a>
        </div>
      </div>
    </div>
  );
}
