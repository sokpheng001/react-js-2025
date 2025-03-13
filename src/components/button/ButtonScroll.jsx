import React from "react";

export const ButtonScroll = ({ text, link,onClick }) => {
  return (
    <a
      href={link}
      onClick={onClick}
      className="text-[20px] text-white bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {text}
    </a>
  );
};
