import React from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Pagination from "../../../test/Pagination";
// import UserAnswers from "../../../test/UserAnswers";

const MoreDoc = () => {
  // Always declare all hooks at the top level
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch your data or set your items
    const fetchData = async () => {
      // Replace with your actual data fetching logic
      const result = await fetch("your-api-endpoint");
      const data = await result.json();
      setItems(data);
    };

    fetchData();
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { t } = useTranslation("dashboard");
  return (
    <div className="p-4 sm:ml-64  mt-[88px] h-[3000px]">
      {/* <h1 className="dark:text-white text-black">
        This Content of More Document
      </h1> */}
      {/* <UserAnswers /> */}
      {/* <PaginatedItems /> */}
      <div>
        {/* Display your items */}
        <div>
          {currentItems.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>

        {/* Pagination component with all required props */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default MoreDoc;
