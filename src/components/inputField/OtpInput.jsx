import { useField } from "formik";
import React from "react";

const OtpInput = ({
  index,
  handleChange,
  handleBackspaceAndEnter,
  otpBoxReference,
}) => {
  const [field, , helpers] = useField(`otp[${index}]`);

  return (
    <input
      {...field}
      type="text"
      maxLength={1}
      onChange={(e) => {
        helpers.setValue(e.target.value);
        handleChange(e.target.value, index);
      }}
      onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
      ref={(reference) => (otpBoxReference.current[index] = reference)}
      className="min-w-10 min-h-10 text-xl bg-white/30 dark:bg-gray-700 text-center text-gray-900 dark:text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
               md:w-16 md:h-16 md:text-2xl
               lg:w-18 lg:h-18 lg:text-3xl"
    />
  );
};

export default OtpInput;
