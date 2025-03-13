import React from "react";
import { NavLink } from "react-router";

const CourseCard = ({ title, img, des, link,onClick }) => {
  return (
    <div onClick={onClick} className="flex justify-center md:justify-start">
      <div className="relative flex flex-col md:flex-row items-center shadow-md">
        <img
          src={img} // Replace with your actual image path
          alt="Woman using phone"
          className=" object-cover w-[380px]  lg:w-96 md:rounded"
        />
        <div className="border-2 block md:absolute bg-white dark:bg-bg-dark-mode dark:border-primary-500 p-6 shadow-md lg:w-[500px] left-[90px] top-[20px] lg:left-[250px] lg:top-[50px] md:rounded-tl-[50px] md:rounded-br-[50px] w-[380px]">
          <NavLink
            to={link}
            className="text-heading-3 font-bold text-primary-500 md:text-heading-4 lg:text-heading-4 hover:underline"
          >
            {title}
          </NavLink>
          <p className="text-gray-700 dark:text-text-des-dark-mode mt-2 md:text-des-5 lg:text-des-3 line-clamp-3">
            {des}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
