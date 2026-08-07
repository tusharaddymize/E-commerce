import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import MenuGroupTable from "../../components/admin/menuGroup/MenuGroupTable";
import MenuGroupFormModal from "../../components/admin/menuGroup/MenuGroupFormModal";
import DeleteMenuGroupModal from "../../components/admin/menuGroup/DeleteMenuGroupModal";

import {
  getMenuGroups,
  createMenuGroup,
  updateMenuGroup,
  deleteMenuGroup,
} from "../../services/menuGroupService";

import { getCategories } from "../../services/categoryService";

const AdminMenuGroups = () => {
  /* =========================
      States
  ========================== */

  const [menuGroups, setMenuGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedMenuGroup, setSelectedMenuGroup] =
    useState(null);

  /* =========================
      Fetch Data
  ========================== */

  const fetchData = async () => {
    try {
      setLoading(true);

      const [groupRes, categoryRes] =
        await Promise.all([
          getMenuGroups(),
          getCategories(),
        ]);

      setMenuGroups(groupRes.data || []);

      setCategories(categoryRes.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load menu groups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================
      Search
  ========================== */

  const filteredMenuGroups = useMemo(() => {
    return menuGroups.filter((group) =>
      group.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [menuGroups, search]);

  /* =========================
      Create
  ========================== */

  const handleCreate = async (payload) => {
    try {
      await createMenuGroup(payload);

      toast.success(
        "Menu group created successfully."
      );

      fetchData();

      setOpenForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create menu group."
      );
    }
  };

  /* =========================
      Update
  ========================== */

  const handleUpdate = async (payload) => {
    try {
      await updateMenuGroup(
        selectedMenuGroup._id,
        payload
      );

      toast.success(
        "Menu group updated successfully."
      );

      fetchData();

      setSelectedMenuGroup(null);

      setOpenForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update menu group."
      );
    }
  };

  /* =========================
      Delete
  ========================== */

  const handleDelete = async () => {
    try {
      await deleteMenuGroup(
        selectedMenuGroup._id
      );

      toast.success(
        "Menu group deleted successfully."
      );

      fetchData();

      setDeleteModal(false);

      setSelectedMenuGroup(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete menu group."
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
                Menu Group Management
              </h1>

              <p className="mt-1 text-gray-500">
                Organize menu groups under categories.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedMenuGroup(null);
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

              Add Menu Group
            </button>
          </div>

          {/* ==========================================
              Search
          ========================================== */}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search menu group..."
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

          <MenuGroupTable
            menuGroups={filteredMenuGroups}
            loading={loading}
            onEdit={(group) => {
              setSelectedMenuGroup(group);
              setOpenForm(true);
            }}
            onDelete={(group) => {
              setSelectedMenuGroup(group);
              setDeleteModal(true);
            }}
          />
        </main>
      </div>

      {/* ==========================================
          Form Modal
      ========================================== */}

      <MenuGroupFormModal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedMenuGroup(null);
        }}
        initialData={selectedMenuGroup}
        categories={categories}
        onSubmit={
          selectedMenuGroup
            ? handleUpdate
            : handleCreate
        }
      />

      {/* ==========================================
          Delete Modal
      ========================================== */}

      <DeleteMenuGroupModal
        open={deleteModal}
        menuGroup={selectedMenuGroup}
        onClose={() => {
          setDeleteModal(false);
          setSelectedMenuGroup(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminMenuGroups;