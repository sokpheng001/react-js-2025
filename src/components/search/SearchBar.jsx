import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchQuery } from "../../redux/features/search/search"; // Assuming you have this hook set up for searching
import { useNavigate } from "react-router-dom"; // For navigation
import { useTranslation } from "react-i18next";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Store the search term
  const [isInputVisible, setIsInputVisible] = useState(false); // For input visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // For dropdown visibility
  const navigate = useNavigate(); // For navigation
  const { t } = useTranslation("dashboard");
  // Fetch search results from the API
  const { data, isFetching, error } = useSearchQuery(searchTerm, {
    skip: !searchTerm, // Only make the request if there’s a search term
  });

  const results = data?.payload || {}; // API response data
  const exercises = results?.exercises || []; // Extract exercises from the response
  // Handle search icon click
  const handleSearchIconClick = () => {
    setIsInputVisible(!isInputVisible); // Toggle input visibility
    setIsDropdownVisible(false); // Close dropdown when toggling input
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownVisible(true); // Show dropdown when user types
  };

  // Handle click on a search result
  const handleResultClick = (ex_uuid) => {
    navigate(`/exercises/${ex_uuid}`); // Navigate to the lesson page
    setIsDropdownVisible(false); // Close the dropdown after selection
    setIsInputVisible(false); // Hide the input after selection
    setSearchTerm(""); // Clear the search term
  };

  return (
    <div className="flex items-center relative">
      {/* Search Icon */}
      <div
        className="cursor-pointer text-white rounded-md bg-secondary-500 p-2 order-2"
        onClick={handleSearchIconClick}
      >
        <IoSearch className="text-2xl" />
      </div>

      {/* Search Input */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isInputVisible
            ? "w-[8rem] sm:w-[19rem] md:w-[23rem] lg:w-[58rem] opacity-100"
            : "w-0 opacity-0"
        }`}
      >
        <div className="rounded-lg shadow-lg z-50">
          <div className="relative p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-1.5 rounded-lg bg-bg-light-mode focus:outline-none focus:ring-2 focus:ring-secondary-200 
             focus:border-secondary-500 dark:bg-gray-800 dark:text-white order-1 text-sm md:text-md lg:text-lg"
              placeholder={t("search for a lesson...")}
              autoFocus // Automatically focus the input when it appears
            />
          </div>

          {/* Dropdown showing search results */}
          {isDropdownVisible && searchTerm && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {isFetching ? (
                <div className="p-2 text-gray-600 dark:text-white">
                  {t("loading...")}
                </div>
              ) : error ? (
                <div className="p-2 text-red-500">Error fetching results</div>
              ) : (
                <div>
                  {exercises.length === 0 ? (
                    <div className="p-2 text-gray-500">No results found</div>
                  ) : (
                    exercises.map((item) => (
                      <div
                        key={item.ex_uuid} // Use ex_uuid as key
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleResultClick(item.ex_uuid)} // Navigate to the lesson
                      >
                        <h3 className="text-sm md:text-md lg:text-lg font-bold text-primary-500 dark:text-primary-300">
                          {item.title}
                        </h3>
                        <hr />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
