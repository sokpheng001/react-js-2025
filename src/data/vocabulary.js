import { useTranslation } from "react-i18next";

export function vocabularyForSidebar() {
  const { t } = useTranslation("dashboard");

  const vocabulary = [
    {
      title: t("a1a2vocabulary"),
      path: "/a1a2vocabulary",
      active: () => "a1a2vocabulary",
      text: "a1a2vocabulary",
    },
    {
      title: t("b1b2vocabulary"),
      path: "/b1b2vocanulary",
      active: () => "b1b2vocabulary",
      text: "b1b2vocabulary",
    },
  ];

  return vocabulary; // 🔥 Return the array so it can be used in other files
}

export default vocabularyForSidebar;
