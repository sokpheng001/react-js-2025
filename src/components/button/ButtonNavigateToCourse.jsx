import React from "react";

export default function ButtonNavigateToCourse({ children }) {
  return (
    <div>
      <button className="mt-6 px-6 py-3 bg-secondary-300 text-black font-bold rounded-full shadow-md hover:bg-secondary-500">
        {children}
      </button>
    </div>
  );
}
