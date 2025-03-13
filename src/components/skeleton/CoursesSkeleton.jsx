import React from "react";

const CoursesSkeleton = () => {
  const skeletons = Array(5).fill(0); // Creates an array of length 5

  return (
    <div>
      {skeletons.map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 dark:bg-[#0F172A] p-6 rounded-lg flex items-center max-w-xl animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-1/3">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-32"></div>
          </div>

          {/* Text Skeleton */}
          <div className="w-2/3 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg rounded-tl-none">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-3"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesSkeleton;
