import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { SiHyperskill } from "react-icons/si";
import { TbTextGrammar } from "react-icons/tb";
import { TbVocabulary } from "react-icons/tb";
import { MdOndemandVideo } from "react-icons/md";

export function menuForSidebar() {
  const { t } = useTranslation("dashboard");

  const menu = [
    {
      title: t("overview"),
      icon: FaHome,
      path: "/",
      isSubComponent: false,
    },
    {
      title: t("skill"),
      icon: SiHyperskill,
      path: "/",
      isSubComponent: true,
    },
    {
      title: t("grammar"),
      icon: TbTextGrammar,
      path: "/",
      isSubComponent: true,
    },
    {
      title: t("vocabulary"),
      icon: TbVocabulary,
      path: "/",
      isSubComponent: true,
    },
    {
      title: t("extraVideo"),
      icon: MdOndemandVideo,
      path: "/",
      isSubComponent: false,
    },
  ];

  return menu;
}

export default menuForSidebar;
