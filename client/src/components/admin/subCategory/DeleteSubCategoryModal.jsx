import { FiAlertTriangle } from "react-icons/fi";

const DeleteSubCategoryModal = ({
  open,
  subCategory,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* ==========================================
            Header
        ========================================== */}

        <div className="flex flex-col items-center border-b px-6 py-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <FiAlertTriangle
              size={34}
              className="text-red-600"
            />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Delete Sub Category
          </h2>
        </div>

        {/* ==========================================
            Body
        ========================================== */}

        <div className="px-6 py-5 text-center">
          <p className="text-gray-600">
            Are you sure you want to delete this
            sub category?
          </p>

          <h3 className="mt-3 text-xl font-semibold text-red-600">
            {subCategory?.name}
          </h3>

          {subCategory?.category?.name && (
            <p className="mt-2 text-sm text-gray-500">
              Category : {subCategory.category.name}
            </p>
          )}

          {subCategory?.menuGroup?.name && (
            <p className="mt-1 text-sm text-gray-500">
              Menu Group : {subCategory.menuGroup.name}
            </p>
          )}

          <p className="mt-4 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        {/* ==========================================
            Footer
        ========================================== */}

        <div className="flex flex-col gap-3 border-t px-6 py-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-gray-300
              px-6
              py-3
              font-medium
              transition
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              rounded-xl
              bg-red-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-red-700
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubCategoryModal;