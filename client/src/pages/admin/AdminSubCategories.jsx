import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import SubCategoryTable from "../../components/admin/subCategory/SubCategoryTable";
import SubCategoryFormModal from "../../components/admin/subCategory/SubCategoryFormModal";
import DeleteSubCategoryModal from "../../components/admin/subCategory/DeleteSubCategoryModal";

import {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../services/subCategoryService";

import { getCategories } from "../../services/categoryService";
import { getMenuGroups } from "../../services/menuGroupService";

const AdminSubCategories = () => {
  /* ==========================================
      States
  ========================================== */

  const [subCategories, setSubCategories] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [menuGroups, setMenuGroups] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [openForm, setOpenForm] =
    useState(false);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedSubCategory, setSelectedSubCategory] =
    useState(null);

  /* ==========================================
      Fetch Data
  ========================================== */

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        subRes,
        categoryRes,
        groupRes,
      ] = await Promise.all([
        getSubCategories(),
        getCategories(),
        getMenuGroups(),
      ]);

      setSubCategories(subRes.data || []);

      setCategories(categoryRes.data || []);

      setMenuGroups(groupRes.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load sub categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ==========================================
      Search
  ========================================== */

  const filteredSubCategories =
    useMemo(() => {
      return subCategories.filter((item) =>
        item.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [subCategories, search]);

  /* ==========================================
      Create
  ========================================== */

  const handleCreate = async (payload) => {
    try {
      await createSubCategory(payload);

      toast.success(
        "Sub category created successfully."
      );

      fetchData();

      setOpenForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create sub category."
      );
    }
  };

  /* ==========================================
      Update
  ========================================== */

  const handleUpdate = async (payload) => {
    try {
      await updateSubCategory(
        selectedSubCategory._id,
        payload
      );

      toast.success(
        "Sub category updated successfully."
      );

      fetchData();

      setSelectedSubCategory(null);

      setOpenForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update sub category."
      );
    }
  };

  /* ==========================================
      Delete
  ========================================== */

  const handleDelete = async () => {
    try {
      await deleteSubCategory(
        selectedSubCategory._id
      );

      toast.success(
        "Sub category deleted successfully."
      );

      fetchData();

      setDeleteModal(false);

      setSelectedSubCategory(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete sub category."
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

      <div className="flex flex-1 flex-col">
        <AdminNavbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* ==========================================
              Header
          ========================================== */}

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
                  transition-colors
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
                Sub Category Management
              </h1>

              <p className="mt-1 text-gray-500">
                Manage sub categories under menu groups.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedSubCategory(null);
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
              Add Sub Category
            </button>
          </div>

          {/* ==========================================
              Search
          ========================================== */}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search sub category..."
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

          <SubCategoryTable
            subCategories={filteredSubCategories}
            loading={loading}
            onEdit={(subCategory) => {
              setSelectedSubCategory(subCategory);
              setOpenForm(true);
            }}
            onDelete={(subCategory) => {
              setSelectedSubCategory(subCategory);
              setDeleteModal(true);
            }}
          />
        </main>
      </div>

      {/* ==========================================
          Form Modal
      ========================================== */}

      <SubCategoryFormModal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedSubCategory(null);
        }}
        initialData={selectedSubCategory}
        categories={categories}
        menuGroups={menuGroups}
        onSubmit={
          selectedSubCategory
            ? handleUpdate
            : handleCreate
        }
      />

      {/* ==========================================
          Delete Modal
      ========================================== */}

      <DeleteSubCategoryModal
        open={deleteModal}
        subCategory={selectedSubCategory}
        onClose={() => {
          setDeleteModal(false);
          setSelectedSubCategory(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminSubCategories;