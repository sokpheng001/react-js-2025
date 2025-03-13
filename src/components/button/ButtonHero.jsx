import React from "react";
const ButtonHero = ({ href = "#", label = "Button Name", className = "" }) => {
  return (
    <a href={href}>
      <button
        className={`inline-block text-lg  text-white
            font-medium rounded-lg  text-center py-3 px-6  bg-secondary-500  hover:bg-secondary-800 transition duration-300  focus:ring-4 focus:outline-none focus:ring-secondary-200 ${className}`}
      >
        {label}
      </button>
    </a>
  );
};
 
export default ButtonHero;
