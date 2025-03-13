import React from "react";

const SubmitButton = ({
  isSubmitting,
  loading,
  label,
  loadingLabel,
  disabled,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting || loading || disabled}
      className="w-full rounded-lg bg-primary-500 p-3 font-semibold text-white hover:bg-primary-600 transition duration-300 text-heading-6"
    >
      {loading ? loadingLabel : label}
    </button>
  );
};

export default SubmitButton;
