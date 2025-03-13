import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({ label, name, type, placeholder, icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Label */}
      <label
        htmlFor={name}
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        {label}
        <span className="text-red-500"> *</span>
      </label>

      {/* Input Wrapper */}
      <div className="relative w-full">
        <div className="flex items-center">
          {/* Left Icon */}
          {Icon && (
            <Icon className="absolute text-gray-500 dark:text-gray-400 m-[1rem]" />
          )}

          {/* Input Field */}
          <Field
            type={type === "password" && showPassword ? "text" : type}
            id={name}
            name={name}
            className="w-full bg-white/30 dark:bg-gray-700 px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={placeholder}
          />

          {/* Show/Hide Password Button (Only for Password Fields) */}
          {type.toLowerCase() === "password" && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-3 flex items-center text-xl leading-5 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      <ErrorMessage
        component="div"
        name={name}
        className="text-red-400 text-sm mt-1"
      />
    </div>
  );
};

export default InputField;
