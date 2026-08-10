import { FiAlertTriangle, FiX } from "react-icons/fi";

const DeleteCategoryModal = ({
  open,
  category,
  onClose,
  onConfirm,
}) => {
  if (!open || !category) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* ==========================================
            Header
        ========================================== */}

        <div
          className="
            relative
            border-b
            border-gray-200
            px-6
            py-7
            text-center
          "
        >
          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-4
              top-4
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-800
            "
            style={{
              color: "#6B7280",
            }}
          >
            <FiX size={22} />
          </button>

          {/* Warning Icon */}

          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-red-100
            "
          >
            <FiAlertTriangle
              size={38}
              color="#DC2626"
            />
          </div>

          <h2
            className="
              mt-5
              text-2xl
              font-bold
              text-gray-900
            "
            style={{
              color: "#111827",
            }}
          >
            Delete Category
          </h2>
        </div>

        {/* ==========================================
            Content
        ========================================== */}

        <div
          className="
            px-6
            py-7
            text-center
          "
        >
          <p
            className="
              text-base
              text-gray-600
            "
            style={{
              color: "#4B5563",
            }}
          >
            Are you sure you want to delete
          </p>

          {/* Category Name */}

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-red-600
            "
            style={{
              color: "#DC2626",
            }}
          >
            {category.name}
          </p>

          {/* Warning */}

          <div
            className="
              mt-5
              rounded-xl
              bg-red-50
              px-4
              py-3
              text-left
            "
          >
            <p
              className="
                text-sm
                font-semibold
              "
              style={{
                color: "#B91C1C",
              }}
            >
              ⚠️ This action cannot be undone.
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
              "
              style={{
                color: "#DC2626",
              }}
            >
              Deleting this category will also
              delete its menu groups and
              sub categories.
            </p>
          </div>
        </div>

        {/* ==========================================
            Footer Buttons
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            border-t
            border-gray-200
            bg-gray-50
            px-6
            py-5
          "
        >
          {/* Cancel */}

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-gray-300
              bg-white
              px-6
              py-3
              font-semibold
              transition
              hover:bg-gray-100
            "
            style={{
              color: "#374151",
              backgroundColor: "#FFFFFF",
              borderColor: "#D1D5DB",
            }}
          >
            Cancel
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={onConfirm}
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-red-500
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-600
              active:scale-95
            "
            style={{
              color: "#FFFFFF",
              backgroundColor: "#EF4444",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;