import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Tag,
} from "lucide-react";

const FlashDealList = () => {
  const [search, setSearch] = useState("");

  // Temporary Dummy Data
  const flashDeals = [
    {
      _id: "1",
      title: "Big Billion Sale",
      subtitle: "Up to 70% OFF",
      bannerImage:
        "https://via.placeholder.com/120x80",
      endDate: "2026-12-31",
      isActive: true,
    },
    {
      _id: "2",
      title: "Mega Electronics Sale",
      subtitle: "Flat 50% OFF",
      bannerImage:
        "https://via.placeholder.com/120x80",
      endDate: "2026-11-25",
      isActive: false,
    },
  ];

  const filteredDeals = flashDeals.filter((deal) =>
    deal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Flash Deals
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Homepage Flash Deals
          </p>
        </div>

        <Link
          to="/admin/add-flash-deal"
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow transition"
        >
          <Plus size={20} />
          Add Flash Deal
        </Link>

      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <div className="relative">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search Flash Deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>
              <th className="p-4 text-left">Banner</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Subtitle</th>
              <th className="p-4 text-left">End Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredDeals.map((deal) => (

              <tr
                key={deal._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  <img
                    src={deal.bannerImage}
                    alt={deal.title}
                    className="w-28 h-20 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-semibold">
                  {deal.title}
                </td>

                <td className="p-4">
                  {deal.subtitle}
                </td>

                <td className="p-4">
                  {deal.endDate}
                </td>

                <td className="p-4">

                  {deal.isActive ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      Inactive
                    </span>
                  )}

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                      <Edit size={18} />
                    </button>

                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile + Tablet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">

        {filteredDeals.map((deal) => (

          <div
            key={deal._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            <img
              src={deal.bannerImage}
              alt={deal.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {deal.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {deal.subtitle}
              </p>

              <div className="flex items-center gap-2 mt-4 text-gray-600">
                <Calendar size={18} />
                {deal.endDate}
              </div>

              <div className="flex items-center gap-2 mt-2">

                <Tag size={18} />

                {deal.isActive ? (
                  <span className="text-green-600 font-semibold">
                    Active
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Inactive
                  </span>
                )}

              </div>

              <div className="flex gap-3 mt-6">

                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2">
                  <Edit size={18} />
                  Edit
                </button>

                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2">
                  <Trash2 size={18} />
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default FlashDealList;