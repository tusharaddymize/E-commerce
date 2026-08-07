import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const SubCategoryTable = ({
  subCategories,
  loading,
  onEdit,
  onDelete,
}) => {
  /* ==========================================
      Loading
  ========================================== */

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        <p className="text-gray-500">
          Loading sub categories...
        </p>
      </div>
    );
  }

  /* ==========================================
      Empty State
  ========================================== */

  if (!subCategories.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold">
          No Sub Categories Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first sub category.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ==========================================
          Desktop Table
      ========================================== */}

      <div className="hidden overflow-x-auto rounded-2xl bg-white shadow lg:block">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Menu Group
              </th>

              <th className="px-6 py-4 text-center">
                Featured
              </th>

              <th className="px-6 py-4 text-center">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Sort
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {subCategories.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {item.name}
                </td>

                <td className="px-6 py-4">
                  {item.category?.name || "-"}
                </td>

                <td className="px-6 py-4">
                  {item.menuGroup?.name || "-"}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      item.isFeatured
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.isFeatured
                      ? "Featured"
                      : "No"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {item.sortOrder}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(item)
                      }
                      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==========================================
          Mobile Cards
      ========================================== */}

      <div className="grid gap-5 lg:hidden">
        {subCategories.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {item.category?.name || "-"}
                </p>

                <p className="text-sm text-gray-500">
                  {item.menuGroup?.name || "-"}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <p className="text-sm text-gray-500">
                  Featured
                </p>

                <p className="font-medium">
                  {item.isFeatured
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Sort Order
                </p>

                <p className="font-medium">
                  {item.sortOrder}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 rounded-xl bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(item)
                }
                className="flex-1 rounded-xl bg-red-500 py-2 font-medium text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubCategoryTable;