import React from "react";
import { PropagateLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <PropagateLoader color="#34729C" size={25} /> {/* Blue spinner */}
    </div>
  );
};

export default LoadingSpinner;
