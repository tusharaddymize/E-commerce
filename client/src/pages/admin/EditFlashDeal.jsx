import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getFlashDealById,
  updateFlashDeal,
} from "../../services/flashDealService";

const EditFlashDeal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    endDate: "",
    backgroundColor: "#16a34a",
    isActive: true,
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState("");

  // ==========================================
  // Fetch Flash Deal
  // ==========================================

  useEffect(() => {
    fetchFlashDeal();
  }, []);

  const fetchFlashDeal = async () => {
    try {
      setLoading(true);

      const data = await getFlashDealById(id);

      const deal = data.flashDeal;

      setFormData({
        title: deal.title || "",
        subtitle: deal.subtitle || "",
        buttonText: deal.buttonText || "",
        buttonLink: deal.buttonLink || "",
        endDate: deal.endDate
          ? deal.endDate.substring(0, 10)
          : "",
        backgroundColor:
          deal.backgroundColor || "#16a34a",
        isActive: deal.isActive,
      });

      setPreview(deal.bannerImage || "");

    } catch (error) {

      console.error(error);

      toast.error(
        error.message ||
          "Failed to load Flash Deal."
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // Banner Change
  // ==========================================

  const handleBannerChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBannerImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const submitData = new FormData();

      submitData.append("title", formData.title);
      submitData.append("subtitle", formData.subtitle);
      submitData.append("buttonText", formData.buttonText);
      submitData.append("buttonLink", formData.buttonLink);
      submitData.append("endDate", formData.endDate);
      submitData.append(
        "backgroundColor",
        formData.backgroundColor
      );
      submitData.append(
        "isActive",
        formData.isActive
      );

      if (bannerImage) {
        submitData.append(
          "bannerImage",
          bannerImage
        );
      }

      const data = await updateFlashDeal(
        id,
        submitData
      );

      toast.success(
        data.message ||
          "Flash Deal updated successfully."
      );

      navigate("/admin/flash-deals");

    } catch (error) {

      console.error(error);

      toast.error(
        error.message ||
          "Failed to update Flash Deal."
      );

    } finally {

      setSubmitting(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading Flash Deal...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Edit Flash Deal
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
                      {/* Banner Image */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Banner Image
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full md:w-96 h-52 rounded-xl object-cover border mb-4"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Title */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Flash Deal Title"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Subtitle */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter Subtitle"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Button Text & Button Link */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Button Text
              </label>

              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                placeholder="Shop Now"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Button Link
              </label>

              <input
                type="text"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleChange}
                placeholder="/products"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

          </div>

          {/* End Date & Background Color */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Background Color
              </label>

              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                className="w-24 h-12 rounded-lg border cursor-pointer"
              />

            </div>

          </div>

          {/* Active Status */}

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 accent-green-600"
            />

            <label className="font-medium text-gray-700">
              Active Flash Deal
            </label>

          </div>
                    {/* Action Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition"
            >
              {submitting
                ? "Updating..."
                : "Update Flash Deal"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/flash-deals")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditFlashDeal;