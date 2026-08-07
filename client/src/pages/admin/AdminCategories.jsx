import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import CategoryTable from "../../components/admin/category/CategoryTable";
import CategoryFormModal from "../../components/admin/category/CategoryFormModal";
import DeleteCategoryModal from "../../components/admin/category/DeleteCategoryModal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

const AdminCategories = () => {
  /* ==========================================
      States
  ========================================== */

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  /* ==========================================
      Load Categories
  ========================================== */

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await getCategories();

      setCategories(res.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ==========================================
      Search
  ========================================== */

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  /* ==========================================
      Add Category
  ========================================== */

  const handleCreate = async (payload) => {
    try {
      await createCategory(payload);

      toast.success(
        "Category created successfully."
      );

      fetchCategories();

      setOpenForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create category."
      );
    }
  };

  /* ==========================================
      Update Category
  ========================================== */

  const handleUpdate = async (payload) => {
    try {
      await updateCategory(
        selectedCategory._id,
        payload
      );

      toast.success(
        "Category updated successfully."
      );

      fetchCategories();

      setSelectedCategory(null);

      setOpenForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update category."
      );
    }
  };

  /* ==========================================
      Delete Category
  ========================================== */

  const handleDelete = async () => {
    try {
      await deleteCategory(
        selectedCategory._id
      );

      toast.success(
        "Category deleted successfully."
      );

      fetchCategories();

      setDeleteModal(false);

      setSelectedCategory(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete category."
      );
    }
  };
    return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ==========================================
          Sidebar
      ========================================== */}

      <AdminSidebar />

      {/* ==========================================
          Main Content
      ========================================== */}

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* ==========================================
              Header
          ========================================== */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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
                  transition-colors
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
                Manage all product categories.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setOpenForm(true);
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

                transition-all
                duration-300

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

          {/* ==========================================
              Search
          ========================================== */}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search category..."
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

                outline-none

                focus:border-[var(--primary-color)]
              "
            />
          </div>

          {/* ==========================================
              Table
          ========================================== */}

          <CategoryTable
            categories={filteredCategories}
            loading={loading}
            onEdit={(category) => {
              setSelectedCategory(category);
              setOpenForm(true);
            }}
            onDelete={(category) => {
              setSelectedCategory(category);
              setDeleteModal(true);
            }}
          />
        </main>
      </div>

      {/* ==========================================
          Form Modal
      ========================================== */}

      <CategoryFormModal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedCategory(null);
        }}
        initialData={selectedCategory}
        onSubmit={
          selectedCategory
            ? handleUpdate
            : handleCreate
        }
      />

      {/* ==========================================
          Delete Modal
      ========================================== */}

      <DeleteCategoryModal
        open={deleteModal}
        category={selectedCategory}
        onClose={() => {
          setDeleteModal(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminCategories;