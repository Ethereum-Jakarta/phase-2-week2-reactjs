import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 mx-2 text-white text-sm font-bold rounded bg-green-800 hover:bg-green-900 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 mx-2 text-white text-sm font-bold rounded bg-green-800 hover:bg-green-900 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
