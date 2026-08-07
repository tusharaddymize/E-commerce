import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const CategoryTable = ({
  categories,
  loading,
  onEdit,
  onDelete,
}) => {
  /* ==========================================
      Loading
  ========================================== */

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow text-center">
        <p className="text-gray-500">
          Loading categories...
        </p>
      </div>
    );
  }

  /* ==========================================
      Empty State
  ========================================== */

  if (!categories.length) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow text-center">
        <h2 className="text-xl font-semibold">
          No Categories Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first category.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ==========================================
          Desktop Table
      ========================================== */}

      <div className="hidden lg:block overflow-x-auto rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Slug
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
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {category.name}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {category.slug}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {category.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {category.sortOrder}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() =>
                        onEdit(category)
                      }
                      className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(category)
                      }
                      className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
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
          Mobile + Tablet Cards
      ========================================== */}

      <div className="grid gap-5 lg:hidden">
        {categories.map((category) => (
          <div
            key={category._id}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {category.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {category.slug}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  category.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {category.isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Sort Order
              </p>

              <p className="font-semibold">
                {category.sortOrder}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() =>
                  onEdit(category)
                }
                className="flex-1 rounded-xl bg-blue-500 py-2 text-white hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(category)
                }
                className="flex-1 rounded-xl bg-red-500 py-2 text-white hover:bg-red-600"
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

export default CategoryTable;