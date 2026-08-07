
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

  /* ==========================================
      Load Edit Data
  ========================================== */

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description:
          initialData.description || "",
        sortOrder:
          initialData.sortOrder || 1,
        isActive:
          initialData.isActive ?? true,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialData, open]);

  /* ==========================================
      Input Change
  ========================================== */

  const handleChange = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ==========================================
      Submit
  ========================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold">
            {initialData
              ? "Edit Category"
              : "Add Category"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* Name */}

          <div>
            <label className="mb-2 block font-medium">
              Category Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary-color)]"
              placeholder="Fashion"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary-color)]"
              placeholder="Category description..."
            />
          </div>

          {/* Sort */}

          <div>
            <label className="mb-2 block font-medium">
              Sort Order
            </label>

            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                handleChange(
                  "sortOrder",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary-color)]"
            />
          </div>

          {/* Status */}

          <div className="flex items-center gap-3">
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
            />

            <label htmlFor="active">
              Active Category
            </label>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl px-6 py-3 text-white"
              style={{
                background:
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