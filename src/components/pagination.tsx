import { PiCaretLeftThin, PiCaretRightThin } from "react-icons/pi";

import { PaginationProps } from "@/types";

export const Pagination = ({ setPage, page, totalPage, isNumber = false }: PaginationProps) => {
  const maxVisiblePages = 5;

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPage));
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    pages.push(1);

    if (page > half + 2) {
      pages.push("...");
    }

    const start = Math.max(2, page - half);
    const end = Math.min(totalPage - 1, page + half);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page + half < totalPage - 1) {
      pages.push("...");
    }

    // Add last page
    if (totalPage > 1) {
      pages.push(totalPage);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {/* Previous button */}
      <button className={`pagination-button group ${page === 1 ? "border-gray" : `border-secondary hover:bg-primary`}`} type="button" onClick={handlePreviousPage} disabled={page === 1}>
        <PiCaretLeftThin size={24} className={`duration-300 ${page === 1 ? "fill-gray" : `fill-secondary group-hover:fill-light`}`} />
      </button>

      {/* Pagination with ellipses */}
      {isNumber &&
        getPageNumbers().map((numberPage, index) =>
          typeof numberPage === "number" ? (
            <button key={index} type="button" onClick={() => setPage(numberPage)} className={`pagination-number ${numberPage === page ? `bg-secondary text-light` : "bg-light text-dark"}`}>
              {numberPage}
            </button>
          ) : (
            <span key={index} className="p-0 text-3xl sm:p-1">
              {numberPage}
            </span>
          )
        )}

      {/* Next button */}
      <button className={`pagination-button group ${page === totalPage ? "border-gray" : `border-secondary hover:bg-primary`}`} type="button" onClick={handleNextPage} disabled={page === totalPage}>
        <PiCaretRightThin size={24} className={`duration-300 ${page === totalPage ? "fill-gray" : `fill-secondary group-hover:fill-light`}`} />
      </button>
    </div>
  );
};
