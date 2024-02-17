import React, { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, disabled }) => {
  const [pageNumber, setPageNumber] = useState(currentPage);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== pageNumber) {
      setPageNumber(newPage);
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer mx-2 px-4 py-2 border rounded-full  ${
            i === pageNumber
              ? "bg-indigo-700 text-white"
              : "bg-indigo-400 text-indigo-700 hover:scale-105"
          } ${disabled ? "opacity-70 hover:cursor-not-allowed" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-4 mb-6">
      <button
        className={`mr-4 px-4 py-2 border rounded-full cursor-pointer ${
          pageNumber === 1
            ? "bg-indigo-300 text-indigo-500 cursor-not-allowed hover:cursor-not-allowed"
            : "bg-indigo-200 text-indigo-700"
        }`}
        onClick={() => handlePageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        &lt; Prev
      </button>
      {renderPageNumbers()}
      <button
        className={`ml-4 px-4 py-2 border rounded-full cursor-pointer ${
          pageNumber === totalPages
            ? "bg-indigo-300 text-indigo-500 cursor-not-allowed hover:cursor-not-allowed"
            : "bg-indigo-200 text-indigo-700"
        }`}
        onClick={() => handlePageChange(pageNumber + 1)}
        disabled={pageNumber === totalPages}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
