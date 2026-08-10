import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

import AdminNavbar from "../../components/admin/AdminNavbar";

import CategoryTable from "../../components/admin/category/CategoryTable";
import CategoryFormModal from "../../components/admin/category/CategoryFormModal";
import DeleteCategoryModal from "../../components/admin/category/DeleteCategoryModal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,

  getMenuGroups,
  createMenuGroup,
  updateMenuGroup,
  deleteMenuGroup,

  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../services/categoryService";

// ==================================================
// ADMIN CATEGORIES
// ==================================================

const AdminCategories = () => {
  // ==================================================
  // CATEGORY STATES
  // ==================================================

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] =
    useState(true);

  const [search, setSearch] = useState("");

  const [openCategoryForm, setOpenCategoryForm] =
    useState(false);

  const [deleteCategoryModal, setDeleteCategoryModal] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  // ==================================================
  // MENU GROUP STATES
  // ==================================================

  const [menuGroups, setMenuGroups] = useState([]);
  const [menuGroupLoading, setMenuGroupLoading] =
    useState(false);

  const [openMenuGroupForm, setOpenMenuGroupForm] =
    useState(false);

  const [selectedMenuGroup, setSelectedMenuGroup] =
    useState(null);

  const [menuGroupParentCategory, setMenuGroupParentCategory] =
    useState(null);

  // ==================================================
  // SUB CATEGORY STATES
  // ==================================================

  const [subCategories, setSubCategories] =
    useState([]);

  const [subCategoryLoading, setSubCategoryLoading] =
    useState(false);

  const [openSubCategoryForm, setOpenSubCategoryForm] =
    useState(false);

  const [selectedSubCategory, setSelectedSubCategory] =
    useState(null);

  const [subCategoryParentGroup, setSubCategoryParentGroup] =
    useState(null);

  // ==================================================
  // LOAD CATEGORIES
  // ==================================================

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);

      const res = await getCategories();

      setCategories(
        Array.isArray(res?.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch Categories Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load categories."
      );

      setCategories([]);
    } finally {
      setCategoryLoading(false);
    }
  };

  // ==================================================
  // LOAD MENU GROUPS
  // ==================================================

  const fetchMenuGroups = async () => {
    try {
      setMenuGroupLoading(true);

      const res = await getMenuGroups();

      setMenuGroups(
        Array.isArray(res?.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch Menu Groups Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load menu groups."
      );

      setMenuGroups([]);
    } finally {
      setMenuGroupLoading(false);
    }
  };

  // ==================================================
  // LOAD SUB CATEGORIES
  // ==================================================

  const fetchSubCategories = async () => {
    try {
      setSubCategoryLoading(true);

      const res = await getSubCategories();

      setSubCategories(
        Array.isArray(res?.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch Sub Categories Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load sub categories."
      );

      setSubCategories([]);
    } finally {
      setSubCategoryLoading(false);
    }
  };

  // ==================================================
  // LOAD ALL DATA
  // ==================================================

  const fetchAllData = async () => {
    await Promise.allSettled([
      fetchCategories(),
      fetchMenuGroups(),
      fetchSubCategories(),
    ]);
  };

  // ==================================================
  // INITIAL LOAD
  // ==================================================

  useEffect(() => {
    fetchAllData();
  }, []);

  // ==================================================
  // SEARCH
  // ==================================================

  const filteredCategories = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return categories;
    }

    return categories.filter((category) => {
      const categoryMatch =
        category.name
          ?.toLowerCase()
          .includes(searchValue);

      const categorySlugMatch =
        category.slug
          ?.toLowerCase()
          .includes(searchValue);

      const relatedGroups =
        menuGroups.filter((group) => {
          const categoryId =
            group.category?._id ||
            group.category;

          return (
            categoryId === category._id
          );
        });

      const groupMatch =
        relatedGroups.some((group) =>
          group.name
            ?.toLowerCase()
            .includes(searchValue)
        );

      const relatedGroupIds =
        relatedGroups.map(
          (group) => group._id
        );

      const subCategoryMatch =
        subCategories.some(
          (subCategory) => {
            const groupId =
              subCategory.menuGroup?._id ||
              subCategory.menuGroup;

            return (
              relatedGroupIds.includes(
                groupId
              ) &&
              subCategory.name
                ?.toLowerCase()
                .includes(searchValue)
            );
          }
        );

      return (
        categoryMatch ||
        categorySlugMatch ||
        groupMatch ||
        subCategoryMatch
      );
    });
  }, [
    categories,
    menuGroups,
    subCategories,
    search,
  ]);

  // ==================================================
  // CREATE CATEGORY
  // ==================================================

  const handleCreateCategory = async (
    payload
  ) => {
    try {
      await createCategory(payload);

      toast.success(
        "Category created successfully."
      );

      await fetchCategories();

      setOpenCategoryForm(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error(
        "Create Category Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to create category."
      );
    }
  };

  // ==================================================
  // UPDATE CATEGORY
  // ==================================================

  const handleUpdateCategory = async (
    payload
  ) => {
    try {
      if (!selectedCategory?._id) {
        toast.error(
          "Category ID is missing."
        );
        return;
      }

      await updateCategory(
        selectedCategory._id,
        payload
      );

      toast.success(
        "Category updated successfully."
      );

      await fetchCategories();

      setOpenCategoryForm(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error(
        "Update Category Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update category."
      );
    }
  };

  // ==================================================
  // DELETE CATEGORY
  // ==================================================

  const handleDelete = async () => {
    try {
      if (!selectedCategory?._id) {
        toast.error(
          "Category ID is missing."
        );
        return;
      }

      console.log(
        "Deleting category:",
        selectedCategory._id
      );

      const response =
        await deleteCategory(
          selectedCategory._id
        );

      console.log(
        "Delete response:",
        response
      );

      toast.success(
        response?.message ||
          "Category deleted successfully."
      );

      // IMPORTANT:
      // Correct state name
      setDeleteCategoryModal(false);
      setSelectedCategory(null);

      // Reload complete hierarchy
      await Promise.allSettled([
        fetchCategories(),
        fetchMenuGroups(),
        fetchSubCategories(),
      ]);
    } catch (error) {
      console.error(
        "DELETE CATEGORY ERROR:",
        error
      );

      console.error(
        "DELETE RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete category."
      );
    }
  };

  // ==================================================
  // ADD MENU GROUP
  // ==================================================

  const handleAddMenuGroup = (
    category
  ) => {
    setSelectedMenuGroup(null);

    setMenuGroupParentCategory(
      category
    );

    setOpenMenuGroupForm(true);
  };

  // ==================================================
  // EDIT MENU GROUP
  // ==================================================

  const handleEditMenuGroup = (
    group
  ) => {
    setSelectedMenuGroup(group);

    const categoryId =
      group.category?._id ||
      group.category;

    const category =
      categories.find(
        (item) =>
          item._id === categoryId
      );

    setMenuGroupParentCategory(
      category || null
    );

    setOpenMenuGroupForm(true);
  };

  // ==================================================
  // CREATE MENU GROUP
  // ==================================================

  const handleCreateMenuGroup = async (
    payload
  ) => {
    try {
      await createMenuGroup(payload);

      toast.success(
        "Menu group created successfully."
      );

      await Promise.allSettled([
        fetchMenuGroups(),
        fetchSubCategories(),
      ]);

      setOpenMenuGroupForm(false);
      setSelectedMenuGroup(null);
      setMenuGroupParentCategory(null);
    } catch (error) {
      console.error(
        "Create Menu Group Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to create menu group."
      );
    }
  };

  // ==================================================
  // UPDATE MENU GROUP
  // ==================================================

  const handleUpdateMenuGroup = async (
    payload
  ) => {
    try {
      if (!selectedMenuGroup?._id) {
        toast.error(
          "Menu group ID is missing."
        );
        return;
      }

      await updateMenuGroup(
        selectedMenuGroup._id,
        payload
      );

      toast.success(
        "Menu group updated successfully."
      );

      await Promise.allSettled([
        fetchMenuGroups(),
        fetchSubCategories(),
      ]);

      setOpenMenuGroupForm(false);
      setSelectedMenuGroup(null);
      setMenuGroupParentCategory(null);
    } catch (error) {
      console.error(
        "Update Menu Group Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update menu group."
      );
    }
  };

  // ==================================================
  // DELETE MENU GROUP
  // ==================================================

  const handleDeleteMenuGroup = async (
    group
  ) => {
    try {
      if (!group?._id) {
        toast.error(
          "Menu group ID is missing."
        );
        return;
      }

      const relatedSubCategories =
        subCategories.filter(
          (subCategory) => {
            const groupId =
              subCategory.menuGroup?._id ||
              subCategory.menuGroup;

            return groupId === group._id;
          }
        );

      if (
        relatedSubCategories.length > 0
      ) {
        toast.error(
          "Delete sub categories first."
        );
        return;
      }

      const confirmed =
        window.confirm(
          `Delete menu group "${group.name}"?`
        );

      if (!confirmed) {
        return;
      }

      await deleteMenuGroup(
        group._id
      );

      toast.success(
        "Menu group deleted successfully."
      );

      await fetchMenuGroups();
    } catch (error) {
      console.error(
        "Delete Menu Group Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete menu group."
      );
    }
  };

  // ==================================================
  // ADD SUB CATEGORY
  // ==================================================

  const handleAddSubCategory = (
    group
  ) => {
    setSelectedSubCategory(null);

    setSubCategoryParentGroup(
      group
    );

    setOpenSubCategoryForm(true);
  };

  // ==================================================
  // EDIT SUB CATEGORY
  // ==================================================

  const handleEditSubCategory = (
    subCategory
  ) => {
    setSelectedSubCategory(
      subCategory
    );

    const groupId =
      subCategory.menuGroup?._id ||
      subCategory.menuGroup;

    const group =
      menuGroups.find(
        (item) =>
          item._id === groupId
      );

    setSubCategoryParentGroup(
      group || null
    );

    setOpenSubCategoryForm(true);
  };

  // ==================================================
  // CREATE SUB CATEGORY
  // ==================================================

  const handleCreateSubCategory =
    async (payload) => {
      try {
        await createSubCategory(
          payload
        );

        toast.success(
          "Sub category created successfully."
        );

        await fetchSubCategories();

        setOpenSubCategoryForm(false);
        setSelectedSubCategory(null);
        setSubCategoryParentGroup(null);
      } catch (error) {
        console.error(
          "Create Sub Category Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to create sub category."
        );
      }
    };

  // ==================================================
  // UPDATE SUB CATEGORY
  // ==================================================

  const handleUpdateSubCategory =
    async (payload) => {
      try {
        if (
          !selectedSubCategory?._id
        ) {
          toast.error(
            "Sub category ID is missing."
          );
          return;
        }

        await updateSubCategory(
          selectedSubCategory._id,
          payload
        );

        toast.success(
          "Sub category updated successfully."
        );

        await fetchSubCategories();

        setOpenSubCategoryForm(false);
        setSelectedSubCategory(null);
        setSubCategoryParentGroup(null);
      } catch (error) {
        console.error(
          "Update Sub Category Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to update sub category."
        );
      }
    };

  // ==================================================
  // DELETE SUB CATEGORY
  // ==================================================

  const handleDeleteSubCategory =
    async (subCategory) => {
      try {
        if (!subCategory?._id) {
          toast.error(
            "Sub category ID is missing."
          );
          return;
        }

        const confirmed =
          window.confirm(
            `Delete sub category "${subCategory.name}"?`
          );

        if (!confirmed) {
          return;
        }

        await deleteSubCategory(
          subCategory._id
        );

        toast.success(
          "Sub category deleted successfully."
        );

        await fetchSubCategories();
      } catch (error) {
        console.error(
          "Delete Sub Category Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to delete sub category."
        );
      }
    };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="p-4 md:p-6 lg:p-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <Link
              to="/admin/dashboard"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-gray-500
                hover:text-[var(--primary-color)]
              "
            >
              <FiArrowLeft />
              Back to Dashboard
            </Link>

            <h1
              className="
                mt-2
                text-3xl
                font-bold
                text-[var(--primary-color)]
              "
            >
              Category Management
            </h1>

            <p className="mt-1 text-gray-500">
              Manage categories, menu groups and
              sub categories.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory(null);
              setOpenCategoryForm(true);
            }}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-5
              py-3
              font-semibold
              text-white
              shadow-sm
              transition
              hover:scale-105
            "
            style={{
              backgroundColor:
                "var(--button-color)",
            }}
          >
            <FiPlus />
            Add Category
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search category, menu group or sub category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
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
              focus:border-[var(--primary-color)]
              focus:ring-2
              focus:ring-[var(--primary-color)]/20
            "
          />
        </div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Categories
            </p>
<p className="mt-1 text-3xl font-bold text-slate-900">
  {categories.length}
</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Menu Groups
            </p>

<p className="mt-1 text-3xl font-bold text-slate-900">
  {menuGroups.length}
</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Sub Categories
            </p>

<p className="mt-1 text-3xl font-bold text-slate-900">
  {subCategories.length}
</p>
          </div>

        </div>

        {/* TABLE */}
        <CategoryTable
          categories={filteredCategories}
          loading={
            categoryLoading ||
            menuGroupLoading ||
            subCategoryLoading
          }
          menuGroups={menuGroups}
          subCategories={subCategories}

          onEdit={(category) => {
            setSelectedCategory(category);
            setOpenCategoryForm(true);
          }}

          onDelete={(category) => {
            setSelectedCategory(category);
            setDeleteCategoryModal(true);
          }}

          onAddMenuGroup={
            handleAddMenuGroup
          }

          onEditMenuGroup={
            handleEditMenuGroup
          }

          onDeleteMenuGroup={
            handleDeleteMenuGroup
          }

          onAddSubCategory={
            handleAddSubCategory
          }

          onEditSubCategory={
            handleEditSubCategory
          }

          onDeleteSubCategory={
            handleDeleteSubCategory
          }
        />

      </main>

      {/* CATEGORY FORM */}
      <CategoryFormModal
        open={openCategoryForm}
        onClose={() => {
          setOpenCategoryForm(false);
          setSelectedCategory(null);
        }}
        initialData={selectedCategory}
        onSubmit={
          selectedCategory
            ? handleUpdateCategory
            : handleCreateCategory
        }
      />

      {/* DELETE CATEGORY */}
      <DeleteCategoryModal
        open={deleteCategoryModal}
        category={selectedCategory}
        onClose={() => {
          setDeleteCategoryModal(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
      />

      {/* MENU GROUP */}
      <MenuGroupFormModal
        open={openMenuGroupForm}
        onClose={() => {
          setOpenMenuGroupForm(false);
          setSelectedMenuGroup(null);
          setMenuGroupParentCategory(null);
        }}
        initialData={selectedMenuGroup}
        category={menuGroupParentCategory}
        categories={categories}
        onSubmit={
          selectedMenuGroup
            ? handleUpdateMenuGroup
            : handleCreateMenuGroup
        }
      />

      {/* SUB CATEGORY */}
      <SubCategoryFormModal
        open={openSubCategoryForm}
        onClose={() => {
          setOpenSubCategoryForm(false);
          setSelectedSubCategory(null);
          setSubCategoryParentGroup(null);
        }}
        initialData={selectedSubCategory}
        menuGroup={subCategoryParentGroup}
        categories={categories}
        menuGroups={menuGroups}
        onSubmit={
          selectedSubCategory
            ? handleUpdateSubCategory
            : handleCreateSubCategory
        }
      />
    </div>
  );
};

// ==================================================
// MENU GROUP FORM MODAL
// ==================================================

const MenuGroupFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  category,
  categories,
}) => {
  const [form, setForm] = useState({
    category: "",
    name: "",
    description: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      category:
        initialData?.category?._id ||
        initialData?.category ||
        category?._id ||
        "",

      name:
        initialData?.name || "",

      description:
        initialData?.description || "",

      sortOrder:
        initialData?.sortOrder ?? 0,

      isActive:
        initialData?.isActive ?? true,
    });
  }, [
    open,
    initialData,
    category,
  ]);

  if (!open) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category) {
      toast.error(
        "Please select a category."
      );
      return;
    }

    if (!form.name.trim()) {
      toast.error(
        "Menu group name is required."
      );
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      sortOrder: Number(
        form.sortOrder
      ),
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[110]
        flex
        items-center
        justify-center
        bg-black/60
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {initialData
                ? "Edit Menu Group"
                : "Add Menu Group"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Category:{" "}
              <span className="font-semibold">
                {category?.name || "Select category"}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            <FiX size={22} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* CATEGORY */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  category:
                    e.target.value,
                }))
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
              "
            >
              <option value="">
                Select Category
              </option>

              {categories.map(
                (item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Menu Group Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name:
                    e.target.value,
                }))
              }
              placeholder="Men"
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
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Description
            </label>

            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description:
                    e.target.value,
                }))
              }
              placeholder="Menu group description..."
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
                outline-none
              "
            />
          </div>

          {/* SORT */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Sort Order
            </label>

            <input
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sortOrder:
                    Number(
                      e.target.value
                    ),
                }))
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
              "
            />
          </div>

          {/* ACTIVE */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 p-4">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isActive:
                    e.target.checked,
                }))
              }
              className="h-4 w-4"
            />

            <span className="font-medium">
              Active Menu Group
            </span>
          </label>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-3
                font-semibold
                text-gray-700
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
                hover:opacity-90
              "
              style={{
                backgroundColor:
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

// ==================================================
// SUB CATEGORY FORM MODAL
// ==================================================

// ==================================================
// SUB CATEGORY FORM MODAL
// ==================================================

const SubCategoryFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  menuGroup,
  categories,
  menuGroups,
}) => {
  const [form, setForm] = useState({
    category: "",
    menuGroup: "",
    name: "",
    description: "",
    image: "",
    banner: "",
    sortOrder: 0,
    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      category:
        initialData?.category?._id ||
        initialData?.category ||
        menuGroup?.category?._id ||
        menuGroup?.category ||
        "",

      menuGroup:
        initialData?.menuGroup?._id ||
        initialData?.menuGroup ||
        menuGroup?._id ||
        "",

      name: initialData?.name || "",

      description: initialData?.description || "",

      image: initialData?.image || "",

      banner: initialData?.banner || "",

      sortOrder: initialData?.sortOrder ?? 0,

      isFeatured: initialData?.isFeatured ?? false,

      isActive: initialData?.isActive ?? true,
    });
  }, [open, initialData, menuGroup]);

  if (!open) {
    return null;
  }

  const availableGroups = menuGroups.filter((group) => {
    if (!form.category) {
      return true;
    }

    const categoryId =
      group.category?._id ||
      group.category;

    return categoryId === form.category;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category) {
      toast.error("Please select a category.");
      return;
    }

    if (!form.menuGroup) {
      toast.error("Please select a menu group.");
      return;
    }

    if (!form.name.trim()) {
      toast.error("Sub category name is required.");
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      sortOrder: Number(form.sortOrder),
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        flex
        items-center
        justify-center
        bg-black/60
        p-4
      "
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="
          relative
          flex
          w-full
          max-w-2xl
          max-h-[90vh]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* ==============================
            HEADER
        ============================== */}
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-gray-200
            bg-white
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {initialData
                ? "Edit Sub Category"
                : "Add Sub Category"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Menu Group:{" "}
              <span className="font-semibold text-gray-800">
                {menuGroup?.name || "Select menu group"}
              </span>
            </p>
          </div>

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
          >
            <FiX size={22} />
          </button>
        </div>

        {/* ==============================
            FORM
        ============================== */}
        <form
          onSubmit={handleSubmit}
          className="
            flex-1
            overflow-y-auto
            space-y-5
            bg-white
            p-6
          "
        >

          {/* CATEGORY */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  category: e.target.value,
                  menuGroup: "",
                }))
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
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* MENU GROUP */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Menu Group
            </label>

            <select
              value={form.menuGroup}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  menuGroup: e.target.value,
                }))
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
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            >
              <option value="">
                Select Menu Group
              </option>

              {availableGroups.map((group) => (
                <option
                  key={group._id}
                  value={group._id}
                >
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUB CATEGORY NAME */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Sub Category Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="T-Shirts"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label
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
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
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
                text-gray-900
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* IMAGE */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Image URL
            </label>

            <input
              type="text"
              value={form.image}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
              placeholder="https://..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* BANNER */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Banner URL
            </label>

            <input
              type="text"
              value={form.banner}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  banner: e.target.value,
                }))
              }
              placeholder="https://..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* SORT ORDER */}
          <div>
            <label
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
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sortOrder: Number(e.target.value),
                }))
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
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* FEATURED */}
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              bg-gray-50
              p-4
              text-gray-800
            "
          >
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isFeatured: e.target.checked,
                }))
              }
              className="h-4 w-4"
            />

            <span className="font-medium">
              Featured Sub Category
            </span>
          </label>

          {/* ACTIVE */}
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              bg-gray-50
              p-4
              text-gray-800
            "
          >
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
              className="h-4 w-4"
            />

            <span className="font-medium">
              Active Sub Category
            </span>
          </label>

          {/* BUTTONS */}
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
                ? "Update Sub Category"
                : "Create Sub Category"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminCategories;