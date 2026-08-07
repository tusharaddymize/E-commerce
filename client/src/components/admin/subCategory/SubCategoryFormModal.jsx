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
          initialData.sortOrder || 1,

        isFeatured:
          initialData.isFeatured ?? false,

        isActive:
          initialData.isActive ?? true,

        image: null,

        banner: null,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialData, open]);

  const filteredMenuGroups = useMemo(() => {
    return menuGroups.filter(
      (group) =>
        (group.category?._id ||
          group.category) === form.category
    );
  }, [menuGroups, form.category]);

  const handleChange = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category) return;

    if (!form.menuGroup) return;

    if (!form.name.trim()) return;

    const data = new FormData();

    data.append("category", form.category);
    data.append("menuGroup", form.menuGroup);
    data.append("name", form.name);
    data.append(
      "description",
      form.description
    );
    data.append(
      "sortOrder",
      form.sortOrder
    );
    data.append(
      "isFeatured",
      form.isFeatured
    );
    data.append(
      "isActive",
      form.isActive
    );

    if (form.image) {
      data.append(
        "image",
        form.image
      );
    }

    if (form.banner) {
      data.append(
        "banner",
        form.banner
      );
    }

    onSubmit(data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">
            {initialData
              ? "Edit Sub Category"
              : "Add Sub Category"}
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
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary-color)]"
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

          {/* Menu Group */}

          <div>
            <label className="mb-2 block font-medium">
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
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="">
                Select Menu Group
              </option>

              {filteredMenuGroups.map(
                (group) => (
                  <option
                    key={group._id}
                    value={group._id}
                  >
                    {group.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Name */}

          <div>
            <label className="mb-2 block font-medium">
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
              placeholder="Shirts"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary-color)]"
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
            />
          </div>

          {/* Uploads */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange(
                    "image",
                    e.target.files[0]
                  )
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Banner
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange(
                    "banner",
                    e.target.files[0]
                  )
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>
          </div>

          {/* Bottom Row */}

          <div className="grid gap-5 md:grid-cols-3">
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
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary-color)]"
              />
            </div>

            <div className="flex items-center pt-8">
              <input
                id="featured"
                type="checkbox"
                checked={
                  form.isFeatured
                }
                onChange={(e) =>
                  handleChange(
                    "isFeatured",
                    e.target.checked
                  )
                }
              />

              <label
                htmlFor="featured"
                className="ml-3"
              >
                Featured
              </label>
            </div>

            <div className="flex items-center pt-8">
              <input
                id="active"
                type="checkbox"
                checked={
                  form.isActive
                }
                onChange={(e) =>
                  handleChange(
                    "isActive",
                    e.target.checked
                  )
                }
              />

              <label
                htmlFor="active"
                className="ml-3"
              >
                Active
              </label>
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3 hover:bg-gray-100"
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