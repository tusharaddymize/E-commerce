import { FiAlertTriangle } from "react-icons/fi";

const DeleteCategoryModal = ({
  open,
  category,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        py-6
      "
      onClick={onClose}
    >
      {/* ==========================================
          Modal
      ========================================== */}

      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          bg-white
          text-gray-900
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==========================================
            Header
        ========================================== */}

        <div
          className="
            flex
            flex-col
            items-center
            border-b
            border-gray-200
            px-6
            py-6
          "
        >
          {/* Warning Icon */}

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-100
            "
          >
            <FiAlertTriangle
              size={32}
              className="text-red-600"
            />
          </div>

          {/* Title */}

          <h2
            className="
              mt-4
              text-2xl
              font-bold
              text-gray-900
            "
          >
            Delete Category
          </h2>
        </div>

        {/* ==========================================
            Body
        ========================================== */}

        <div
          className="
            px-6
            py-6
            text-center
          "
        >
          <p className="text-base text-gray-600">
            Are you sure you want to delete
          </p>

          {/* Category Name */}

          <h3
            className="
              mt-3
              text-xl
              font-bold
              text-red-600
            "
          >
            {category?.name}
          </h3>

          {/* Warning */}

          <p
            className="
              mt-4
              text-sm
              text-gray-500
            "
          >
            This action cannot be undone.
          </p>
        </div>

        {/* ==========================================
            Footer / Buttons
        ========================================== */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-gray-200
            bg-white
            px-6
            py-5

            sm:flex-row
            sm:justify-end
          "
        >
          {/* ======================================
              Cancel
          ====================================== */}

          <button
            type="button"
            onClick={onClose}
            className="
              w-full
              rounded-xl

              border
              border-gray-300

              bg-white

              px-6
              py-3

              font-semibold
              text-gray-700

              transition-all
              duration-200

              hover:bg-gray-100
              hover:text-gray-900

              active:scale-[0.98]

              cursor-pointer

              sm:w-auto
            "
          >
            Cancel
          </button>

          {/* ======================================
              Delete
          ====================================== */}

          <button
            type="button"
            onClick={onConfirm}
            className="
              w-full
              rounded-xl

              bg-red-600

              px-6
              py-3

              font-semibold
              text-white

              transition-all
              duration-200

              hover:bg-red-700

              active:scale-[0.98]

              cursor-pointer

              sm:w-auto
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
