import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Tag,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllFlashDeals,
  deleteFlashDeal,
} from "../../services/flashDealService";

const FlashDealList = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [flashDeals, setFlashDeals] = useState([]);

  // ==========================================
  // Fetch Flash Deals
  // ==========================================

  const fetchFlashDeals = async () => {
    try {
      setLoading(true);

      const data = await getAllFlashDeals();

      setFlashDeals(data.flashDeals || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to load Flash Deals."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashDeals();
  }, []);

  // ==========================================
  // Search
  // ==========================================

  const filteredDeals = flashDeals.filter((deal) =>
    deal.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================================
  // Edit
  // ==========================================

  const handleEdit = (id) => {
    navigate(`/admin/edit-flash-deal/${id}`);
  };

  // ==========================================
  // Delete
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Flash Deal?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteFlashDeal(id);

      toast.success(
        data.message || "Flash Deal deleted successfully."
      );

      fetchFlashDeals();
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to delete Flash Deal."
      );
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading Flash Deals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* ======================================
          Back Button
      ====================================== */}

      <button
        type="button"
        onClick={() => navigate("/admin/dashboard")}
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-2.5
          text-sm
          font-semibold
          text-gray-700
          shadow-sm
          transition-all
          duration-200
          hover:border-green-500
          hover:bg-green-50
          hover:text-green-700
        "
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* ======================================
          Header
      ====================================== */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Flash Deals
          </h1>

          <p className="mt-1 text-gray-500">
            Manage Homepage Flash Deals
          </p>
        </div>

        <Link
          to="/admin/add-flash-deal"
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-600
            px-5
            py-3
            text-white
            shadow
            transition
            hover:bg-green-700
          "
        >
          <Plus size={20} />
          Add Flash Deal
        </Link>
      </div>

      {/* ======================================
          Search
      ====================================== */}

      <div className="mb-6 rounded-xl bg-white p-4 shadow">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search Flash Deals..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              py-3
              pl-12
              pr-4
              outline-none
              focus:ring-2
              focus:ring-green-500
            "
          />
        </div>
      </div>

      {/* ======================================
          Desktop Table
      ====================================== */}

      <div className="hidden overflow-hidden rounded-xl bg-white shadow lg:block">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 text-left">
                Banner
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Subtitle
              </th>

              <th className="p-4 text-left">
                End Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <tr
                  key={deal._id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={deal.bannerImage}
                      alt={deal.title}
                      className="h-20 w-28 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4 font-semibold text-gray-800">
                    {deal.title}
                  </td>

                  <td className="p-4 text-gray-600">
                    {deal.subtitle || "-"}
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(
                      deal.endDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {deal.isActive ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">

                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(deal._id)
                        }
                        className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                        title="Edit Flash Deal"
                      >
                        <Edit size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(deal._id)
                        }
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                        title="Delete Flash Deal"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center font-medium text-gray-500"
                >
                  No Flash Deals Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ======================================
          Mobile + Tablet Cards
      ====================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <div
              key={deal._id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <img
                src={deal.bannerImage}
                alt={deal.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {deal.title}
                </h2>

                <p className="mt-2 text-gray-500">
                  {deal.subtitle || "-"}
                </p>

                <div className="mt-4 flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />

                  {new Date(
                    deal.endDate
                  ).toLocaleDateString()}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Tag size={18} />

                  {deal.isActive ? (
                    <span className="font-semibold text-green-600">
                      Active
                    </span>
                  ) : (
                    <span className="font-semibold text-red-600">
                      Inactive
                    </span>
                  )}
                </div>

                <div className="mt-6 flex gap-3">

                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(deal._id)
                    }
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-500
                      py-3
                      text-white
                      transition
                      hover:bg-blue-600
                    "
                  >
                    <Edit size={18} />
                    Edit
                  </button>

                  {/* Delete */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(deal._id)
                    }
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-red-500
                      py-3
                      text-white
                      transition
                      hover:bg-red-600
                    "
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-xl bg-white p-10 text-center font-medium text-gray-500 shadow">
            No Flash Deals Found.
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDealList;