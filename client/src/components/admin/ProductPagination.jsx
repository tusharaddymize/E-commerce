import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductPagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          page - 1,
          page,
          page + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`
          flex items-center gap-2
          rounded-lg
          border
          px-4
          py-2
          transition
          ${
            page === 1
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white hover:bg-green-600 hover:text-white"
          }
        `}
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((item, index) =>
        item === "..." ? (
          <span
            key={index}
            className="px-2 text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(item)}
            className={`
              h-10
              w-10
              rounded-lg
              border
              font-medium
              transition
              ${
                page === item
                  ? "border-green-600 bg-green-600 text-white"
                  : "bg-white hover:bg-green-50"
              }
            `}
          >
            {item}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`
          flex items-center gap-2
          rounded-lg
          border
          px-4
          py-2
          transition
          ${
            page === totalPages
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white hover:bg-green-600 hover:text-white"
          }
        `}
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ProductPagination;