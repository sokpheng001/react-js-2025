import React from "react";
import { NavLink } from "react-router-dom"; // Ensure correct import

const ButtonNavigate = ({ text, link, onClick, addMoreStyle }) => {
  return (
    <NavLink
      to={link}
      onClick={onClick}
      className={`text-[19px] text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg px-5 py-2.5 text-center z-30 ${
        addMoreStyle ? addMoreStyle : ""
      }`}
    >
      {text}
    </NavLink>
  );
};

export default ButtonNavigate;
