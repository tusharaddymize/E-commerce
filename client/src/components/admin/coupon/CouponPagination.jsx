const CouponPagination = ({
  pagination,
  page,
  setPage,
}) => {
  const totalPages =
    pagination?.totalPages || 1;

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-3">

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-semibold">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() =>
          setPage(page + 1)
        }
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default CouponPagination;