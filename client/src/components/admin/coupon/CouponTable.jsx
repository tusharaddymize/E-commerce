import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const CouponTable = ({
  coupons = [],
  loading,
  filter,
  onEdit,
  onDelete,
  onToggle,
}) => {
  // ==========================================
  // Filter Coupons
  // ==========================================

  const filteredCoupons = coupons.filter((coupon) => {
    if (filter === "all") return true;

    if (filter === "active") return coupon.isActive;

    if (filter === "inactive") return !coupon.isActive;

    if (filter === "expired")
      return new Date(coupon.expiryDate) < new Date();

    return true;
  });

  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-16 text-center shadow-sm">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

        <p className="text-gray-500">
          Loading coupons...
        </p>
      </div>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (filteredCoupons.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-16 text-center shadow-sm">
        <div className="text-6xl mb-4">
          🎟️
        </div>

        <h2 className="text-2xl font-semibold">
          No Coupons Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first coupon to start
          offering discounts.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ================================
            Desktop Table
      ================================= */}

      <div className="hidden overflow-x-auto rounded-xl border bg-white shadow-sm lg:block">
        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Coupon
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Type
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Discount
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Minimum Order
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Usage
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Expiry
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {/* Rows will continue in Part 6B */}
                        {filteredCoupons.map((coupon) => {
              const expired =
                new Date(coupon.expiryDate) < new Date();

              return (
                <tr
                  key={coupon._id}
                  className="hover:bg-gray-50 transition"
                >
                  {/* Coupon */}

                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-800">
                      {coupon.code}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      {coupon.description || "-"}
                    </div>
                  </td>

                  {/* Type */}

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        coupon.discountType === "percentage"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {coupon.discountType === "percentage"
                        ? "Percentage"
                        : "Fixed"}
                    </span>

                  </td>

                  {/* Discount */}

                  <td className="px-5 py-4 font-semibold">

                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `₹${coupon.discountValue}`}

                  </td>

                  {/* Minimum Order */}

                  <td className="px-5 py-4">

                    ₹{coupon.minOrderAmount}

                  </td>

                  {/* Usage */}

                  <td className="px-5 py-4">

                    <div className="font-medium">

                      {coupon.usedCount} / {coupon.usageLimit}

                    </div>

                  </td>

                  {/* Expiry */}

                  <td className="px-5 py-4">

                    <div>

                      {new Date(
                        coupon.expiryDate
                      ).toLocaleDateString()}

                    </div>

                    {expired && (
                      <span className="text-xs font-semibold text-red-600">
                        Expired
                      </span>
                    )}

                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">

                    <button
                      onClick={() => onToggle(coupon._id)}
                      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition ${
                        coupon.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {coupon.isActive ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTimesCircle />
                      )}

                      {coupon.isActive
                        ? "Active"
                        : "Inactive"}
                    </button>

                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onEdit(coupon)}
                        className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onDelete(coupon._id)}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* =====================================
            Mobile / Tablet Cards
      ===================================== */}

      <div className="grid gap-4 lg:hidden">

        {filteredCoupons.map((coupon) => {
          const expired =
            new Date(coupon.expiryDate) < new Date();

          return (
            <div
              key={coupon._id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >

              {/* Remaining mobile layout continues in Part 6C */}
                            <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold">
                    {coupon.code}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {coupon.description || "No description"}
                  </p>

                </div>

                <button
                  onClick={() => onToggle(coupon._id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    coupon.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {coupon.isActive ? "Active" : "Inactive"}
                </button>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                <div>

                  <p className="text-gray-500">
                    Discount
                  </p>

                  <p className="font-semibold">

                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `₹${coupon.discountValue}`}

                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Type
                  </p>

                  <p className="font-semibold capitalize">
                    {coupon.discountType}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Minimum Order
                  </p>

                  <p className="font-semibold">
                    ₹{coupon.minOrderAmount}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Usage
                  </p>

                  <p className="font-semibold">
                    {coupon.usedCount} / {coupon.usageLimit}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Expiry
                  </p>

                  <p
                    className={`font-semibold ${
                      expired
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {new Date(
                      coupon.expiryDate
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => onEdit(coupon)}
                  className="flex-1 rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(coupon._id)}
                  className="flex-1 rounded-lg bg-red-600 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </>
  );
};

export default CouponTable;