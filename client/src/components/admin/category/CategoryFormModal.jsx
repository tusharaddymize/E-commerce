import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const defaultForm = {
  name: "",
  description: "",
  sortOrder: 1,
  isActive: true,
};

const CategoryFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState(defaultForm);

  // ==========================================
  // Load Edit Data
  // ==========================================

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        sortOrder: initialData.sortOrder || 1,
        isActive: initialData.isActive ?? true,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialData, open]);

  // ==========================================
  // Input Change
  // ==========================================

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    onSubmit(form);
  };

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
        p-4
      "
      onClick={onClose}
    >
      {/* ==========================================
          Modal
      ========================================== */}

      <div
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
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
            items-center
            justify-between
            border-b
            border-gray-200
            px-6
            py-5
          "
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData
              ? "Edit Category"
              : "Add Category"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
            aria-label="Close modal"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* ==========================================
            Form
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* ==========================================
              Category Name
          ========================================== */}

          <div>
            <label
              htmlFor="category-name"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Category Name
            </label>

            <input
              id="category-name"
              type="text"
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                placeholder-gray-400
                outline-none
                transition
                focus:border-[var(--primary-color)]
                focus:ring-2
                focus:ring-[var(--primary-color)]/20
              "
              placeholder="Fashion"
            />
          </div>

          {/* ==========================================
              Description
          ========================================== */}

          <div>
            <label
              htmlFor="category-description"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Description
            </label>

            <textarea
              id="category-description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                placeholder-gray-400
                outline-none
                transition
                focus:border-[var(--primary-color)]
                focus:ring-2
                focus:ring-[var(--primary-color)]/20
              "
              placeholder="Category description..."
            />
          </div>

          {/* ==========================================
              Sort Order
          ========================================== */}

          <div>
            <label
              htmlFor="sort-order"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Sort Order
            </label>

            <input
              id="sort-order"
              type="number"
              min="1"
              value={form.sortOrder}
              onChange={(e) =>
                handleChange(
                  "sortOrder",
                  Number(e.target.value)
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                outline-none
                transition
                focus:border-[var(--primary-color)]
                focus:ring-2
                focus:ring-[var(--primary-color)]/20
              "
            />
          </div>

          {/* ==========================================
              Status
          ========================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              px-4
              py-3
            "
          >
            <input
              id="active"
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                handleChange(
                  "isActive",
                  e.target.checked
                )
              }
              className="
                h-4
                w-4
                cursor-pointer
              "
            />

            <label
              htmlFor="active"
              className="
                cursor-pointer
                text-sm
                font-medium
                text-gray-700
              "
            >
              Active Category
            </label>
          </div>

          {/* ==========================================
              Buttons
          ========================================== */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              pt-3
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                px-5
                py-3
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                rounded-xl
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
              style={{
                backgroundColor:
                  "var(--button-color)",
              }}
            >
              {initialData
                ? "Update Category"
                : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;