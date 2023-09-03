import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import useTodoStore from "../store/useStore";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // const paginated = useTodoStore((state) => state.getPagination);
  const currPage = useTodoStore((state) => state.setCurrentPage);
  const totalPages = useTodoStore((state) => state.totalPages);

  const goToPage = (page: number) => {
    console.log(page);
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };
  useEffect(() => {
    const pageFromQuery =
      Number(new URLSearchParams(window.location.search).get("page")) || 1;
    // paginated();
    currPage(pageFromQuery);
    setCurrentPage(pageFromQuery);
  }, [ currPage]);

  return (
    <nav
      className="flex w-full justify-between rounded-md"
      aria-label="Pagination"
    >
      {/* Previous button */}
      <Link
        href={`?page=${currentPage}`}
        className={`relative inline-flex items-center sm:px-2 py-2 text-gray-400 text-sm hover:bg-gray-50 focus:z-20 ${
          currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={(e) => {
          if (currentPage === 1) {
            e.preventDefault(); // Prevent navigation when currentPage is 1
          } else {
            goToPage(currentPage - 1);
          }
        }}
        aria-disabled={currentPage === 1}
      >
        <span className="sr-only">Previous</span>
        <GrLinkPrevious /> <span className=" hidden sm:ml-3 sm:block">Previous</span>
      </Link>

      {/* Pagination links */}
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          if (
            Math.abs(currentPage - pageNumber) <= 2 ||
            pageNumber === 1 ||
            pageNumber === totalPages
          ) {
            return (
              <Link
                key={pageNumber}
                href={`?page=${pageNumber}`} // Update this to your actual link or route
                className={`relative flex justify-center items-center   w-6 sm:h-10 sm:w-10  rounded-full text-xs font-semibold ${
                  pageNumber === currentPage
                    ? "text-black bg-gray-200"
                    : "text-gray-900 bg-gray-50 hover:bg-gray-100  focus:border-indigo-300"
                }`}
              >
                {pageNumber}
              </Link>
            );
          }

          if (Math.abs(currentPage - pageNumber) <= 3) {
            return (
              <span
                key={`ellipsis-${pageNumber}`}
                className="relative flex justify-center items-center rounded-full"
              >
                ...
              </span>
            );
          }

          return null;
        })}
      </div>

      {/* Next button */}
      <Link
        href={`?page=${currentPage}`}
        className={`relative inline-flex items-center sm:px-2 py-2 text-gray-400 text-sm hover:bg-gray-50 focus:z-20  focus:border-indigo-300 ${
          currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={(e) => {
          if (currentPage === totalPages) {
            e.preventDefault();
          } else {
            goToPage(currentPage + 1);
          }
        }}
        aria-disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next</span>
        <span className="hidden sm:mr-3 sm:block">Next </span> <GrLinkNext />
      </Link>
    </nav>
  );
};

export default Pagination;
