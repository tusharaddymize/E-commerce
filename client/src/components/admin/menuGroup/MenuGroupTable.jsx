import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const MenuGroupTable = ({
  menuGroups,
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
          Loading menu groups...
        </p>
      </div>
    );
  }

  /* ==========================================
      Empty State
  ========================================== */

  if (!menuGroups.length) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow text-center">
        <h2 className="text-xl font-semibold">
          No Menu Groups Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first menu group.
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
            {menuGroups.map((group) => (
              <tr
                key={group._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {group.name}
                </td>

                <td className="px-6 py-4">
                  {group.category?.name || "-"}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {group.slug}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      group.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {group.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {group.sortOrder}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() =>
                        onEdit(group)
                      }
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(group)
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
        {menuGroups.map((group) => (
          <div
            key={group._id}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {group.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {group.category?.name || "-"}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  group.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {group.isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <p className="text-sm text-gray-500">
                  Slug
                </p>

                <p>{group.slug}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Sort Order
                </p>

                <p>{group.sortOrder}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() =>
                  onEdit(group)
                }
                className="flex-1 rounded-xl bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(group)
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

export default MenuGroupTable;