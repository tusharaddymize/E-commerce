import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const defaultForm = {
  category: "",
  name: "",
  description: "",
  sortOrder: 1,
  isActive: true,
};

const MenuGroupFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  categories = [],
}) => {
  const [form, setForm] = useState(defaultForm);

  /* ==========================================
      Load Edit Data
  ========================================== */

  useEffect(() => {
    if (initialData) {
      setForm({
        category:
          initialData.category?._id ||
          initialData.category ||
          "",
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

  const handleChange = (field, value) => {
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

    if (!form.category) return;

    if (!form.name.trim()) return;

    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">
            {initialData
              ? "Edit Menu Group"
              : "Add Menu Group"}
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
          {/* Category */}

          <div>
            <label className="mb-2 block font-medium">
              Parent Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                outline-none
                focus:border-[var(--primary-color)]
              "
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}

          <div>
            <label className="mb-2 block font-medium">
              Menu Group Name
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
              placeholder="Men"
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                outline-none
                focus:border-[var(--primary-color)]
              "
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
              placeholder="Description..."
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                outline-none
                focus:border-[var(--primary-color)]
              "
            />
          </div>

          {/* Bottom Row */}

          <div className="grid gap-5 md:grid-cols-2">

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
                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  outline-none
                  focus:border-[var(--primary-color)]
                "
              />
            </div>

            {/* Status */}

            <div className="flex items-center pt-8">
              <input
                id="activeMenuGroup"
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  handleChange(
                    "isActive",
                    e.target.checked
                  )
                }
              />

              <label
                htmlFor="activeMenuGroup"
                className="ml-3"
              >
                Active Menu Group
              </label>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                px-6
                py-3
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
                text-white
              "
              style={{
                background:
                  "var(--button-color)",
              }}
            >
              {initialData
                ? "Update Menu Group"
                : "Create Menu Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuGroupFormModal;