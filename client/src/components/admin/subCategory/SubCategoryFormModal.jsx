import { useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";

const defaultForm = {
  category: "",
  menuGroup: "",
  name: "",
  description: "",
  sortOrder: 1,
  isFeatured: false,
  isActive: true,
  image: null,
  banner: null,
};

const SubCategoryFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  categories = [],
  menuGroups = [],
}) => {
  const [form, setForm] = useState(defaultForm);

  // ==========================================
  // Load Edit Data
  // ==========================================

  useEffect(() => {
    if (initialData) {
      setForm({
        category:
          initialData.category?._id ||
          initialData.category ||
          "",

        menuGroup:
          initialData.menuGroup?._id ||
          initialData.menuGroup ||
          "",

        name: initialData.name || "",

        description:
          initialData.description || "",

        sortOrder:
          initialData.sortOrder ?? 1,

        isFeatured:
          initialData.isFeatured ?? false,

        isActive:
          initialData.isActive ?? true,

        image: null,
        banner: null,
      });
    } else {
      setForm({ ...defaultForm });
    }
  }, [initialData, open]);

  // ==========================================
  // Filter Menu Groups By Category
  // ==========================================

  const filteredMenuGroups = useMemo(() => {
    if (!form.category) return [];

    return menuGroups.filter(
      (group) =>
        (group.category?._id ||
          group.category) === form.category
    );
  }, [menuGroups, form.category]);

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

    if (!form.category) {
      return;
    }

    if (!form.menuGroup) {
      return;
    }

    if (!form.name.trim()) {
      return;
    }

    const data = new FormData();

    data.append("category", form.category);
    data.append("menuGroup", form.menuGroup);
    data.append("name", form.name.trim());
    data.append("description", form.description);
    data.append("sortOrder", form.sortOrder);
    data.append("isFeatured", form.isFeatured);
    data.append("isActive", form.isActive);

    if (form.image) {
      data.append("image", form.image);
    }

    if (form.banner) {
      data.append("banner", form.banner);
    }

    onSubmit(data);
  };

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/60
        p-3
        sm:p-5
        overflow-y-auto
      "
    >
      {/* ==========================================
          MODAL
      ========================================== */}

      <div
        className="
          relative
          z-[10000]
          w-full
          max-w-3xl
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
         bg-white !text-black
          shadow-2xl
        "
      >
        {/* ==========================================
            Header
        ========================================== */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            border-b
            border-gray-200
            bg-white
            px-4
            py-4
            sm:px-6
            sm:py-5
          "
        >
          <div>
            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                !text-gray-900
              "
            >
              {initialData
                ? "Edit Sub Category"
                : "Add Sub Category"}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-600
              "
            >
              Manage your sub category details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-600
              transition
              hover:bg-gray-100
              hover:!text-gray-900
            "
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* ==========================================
            FORM
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            space-y-5
            bg-white
            p-4
            sm:p-6
          "
        >
          {/* ==========================================
              Category
          ========================================== */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
               !text-gray-900
              "
            >
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) => {
                handleChange(
                  "category",
                  e.target.value
                );

                handleChange(
                  "menuGroup",
                  ""
                );
              }}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                !text-gray-900
                outline-none
                transition
                focus:border-[var(--primary-color)]
                focus:ring-2
                focus:ring-[var(--primary-color)]/20
              "
            >
              <option
                value=""
                className="text-gray-500"
              >
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="!text-gray-900"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* ==========================================
              Menu Group
          ========================================== */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
              !text-gray-900
              "
            >
              Menu Group
            </label>

            <select
              value={form.menuGroup}
              onChange={(e) =>
                handleChange(
                  "menuGroup",
                  e.target.value
                )
              }
              disabled={!form.category}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                !text-gray-900
                outline-none
                transition
                disabled:cursor-not-allowed
                disabled:bg-gray-100
                disabled:text-gray-400
                focus:border-[var(--primary-color)]
                focus:ring-2
                focus:ring-[var(--primary-color)]/20
              "
            >
              <option
                value=""
                className="text-gray-500"
              >
                {form.category
                  ? "Select Menu Group"
                  : "Select Category First"}
              </option>

              {filteredMenuGroups.map(
                (group) => (
                  <option
                    key={group._id}
                    value={group._id}
                    className="!text-gray-900"
                  >
                    {group.name}
                  </option>
                )
              )}
            </select>

            {form.category &&
              filteredMenuGroups.length === 0 && (
                <p className="mt-2 text-xs text-red-500">
                  No menu groups found for this
                  category.
                </p>
              )}
          </div>

          {/* ==========================================
              Sub Category Name
          ========================================== */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                !text-gray-900
              "
            >
              Sub Category Name
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
              placeholder="e.g. T-Shirts"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                !text-gray-900
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-[var(--primary-color)]
                focus:ring-2
                focus:ring-[var(--primary-color)]/20
              "
            />
          </div>

          {/* ==========================================
              Description
          ========================================== */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
               !text-gray-900
              "
            >
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
              placeholder="Sub category description..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                !text-gray-900
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-[var(--primary-color)]
                focus:ring-2
                focus:ring-[var(--primary-color)]/20
              "
            />
          </div>

          {/* ==========================================
              Image + Banner
          ========================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            {/* Image */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                 !text-gray-900
                "
              >
                Sub Category Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange(
                    "image",
                    e.target.files?.[0] || null
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-3
                  py-3
                  text-sm
                  !text-gray-900
                  file:mr-3
                  file:rounded-lg
                  file:border-0
                  file:bg-gray-100
                  file:px-3
                  file:py-2
                  file:text-sm
                  file:font-medium
                  file:!text-gray-900
                  hover:file:bg-gray-200
                "
              />
            </div>

            {/* Banner */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  !text-gray-900
                "
              >
                Sub Category Banner
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange(
                    "banner",
                    e.target.files?.[0] || null
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-3
                  py-3
                  text-sm
                  !text-gray-900
                  file:mr-3
                  file:rounded-lg
                  file:border-0
                  file:bg-gray-100
                  file:px-3
                  file:py-2
                  file:text-sm
                  file:font-medium
                  file:!text-gray-900
                  hover:file:bg-gray-200
                "
              />
            </div>
          </div>

          {/* ==========================================
              Sort + Featured + Active
          ========================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-3
            "
          >
            {/* Sort */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  !text-gray-900
                "
              >
                Sort Order
              </label>

              <input
                type="number"
                min="0"
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
                  text-sm
                  !text-gray-900
                  outline-none
                  focus:border-[var(--primary-color)]
                  focus:ring-2
                  focus:ring-[var(--primary-color)]/20
                "
              />
            </div>

            {/* Featured */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                transition
                hover:bg-gray-100
              "
            >
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) =>
                  handleChange(
                    "isFeatured",
                    e.target.checked
                  )
                }
                className="
                  h-5
                  w-5
                  cursor-pointer
                  accent-green-600
                "
              />

              <span className="text-sm font-medium !text-gray-900">
                Featured
              </span>
            </label>

            {/* Active */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                transition
                hover:bg-gray-100
              "
            >
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  handleChange(
                    "isActive",
                    e.target.checked
                  )
                }
                className="
                  h-5
                  w-5
                  cursor-pointer
                  accent-green-600
                "
              />

              <span className="text-sm font-medium !text-gray-900">
                Active
              </span>
            </label>
          </div>

          {/* ==========================================
              Footer Buttons
          ========================================== */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-gray-200
              pt-5
              sm:flex-row
              sm:justify-end
            "
          >
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
                text-sm
                font-semibold
                !text-gray-900
                transition
                hover:bg-gray-100
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                w-full
                rounded-xl
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:opacity-90
                sm:w-auto
              "
              style={{
                backgroundColor:
                  "var(--button-color)",
              }}
            >
              {initialData
                ? "Update Sub Category"
                : "Create Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryFormModal;