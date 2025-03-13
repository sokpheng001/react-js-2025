import React from "react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            onClick={() => paginate(currentPage - 1)}
            href="#!"
            className="page-link"
            aria-disabled={currentPage === 1}
          >
            Previous
          </a>
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === Math.ceil(totalItems / itemsPerPage)
              ? "disabled"
              : ""
          }`}
        >
          <a
            onClick={() => paginate(currentPage + 1)}
            href="#!"
            className="page-link"
            aria-disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
