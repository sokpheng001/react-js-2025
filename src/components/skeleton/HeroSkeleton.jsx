import React from "react";

export const HeroSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#0F172A] p-6 rounded-lg mx-auto animate-pulse border border-gray-200 dark:border-gray-700">
      {/* Title Skeleton */}
      <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>

      {/* Image Skeleton */}
      <div className="w-full h-56 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>

      {/* Subtitle Skeleton */}
      <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

      {/* Button Skeleton */}
      <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>

      {/* Description Skeleton */}
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
};
