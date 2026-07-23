import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import { createFlashDeal } from "../../services/flashDealService";

const AddFlashDeal = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    bannerImage: "",
    buttonText: "View All Deals",
    buttonLink: "/flash-deals",
    endDate: "",
    backgroundColor: "#355E3B",
    isActive: true,
  });

  // ======================================
  // Handle Input Change
  // ======================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ======================================
  // Image Upload Preview
  // ======================================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      bannerImage: file,
    }));
  };
  // ======================================
// Submit Form
// ======================================
useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);
const handleSubmit = async (e) => {
  e.preventDefault();

 if (!formData.title.trim()) {
  toast.error("Flash Deal title is required.");
  return;
}

if (!formData.endDate) {
  toast.error("Please select end date.");
  return;
}

try {
  setLoading(true);

    const data = new FormData();

    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("buttonText", formData.buttonText);
    data.append("buttonLink", formData.buttonLink);
    data.append("endDate", formData.endDate);
    data.append(
      "backgroundColor",
      formData.backgroundColor
    );
    data.append("isActive", formData.isActive);

    if (formData.bannerImage) {
      data.append(
        "bannerImage",
        formData.bannerImage
      );
    }

    const response =
      await createFlashDeal(data);

    if (response.success) {
      toast.success(response.message);

      navigate("/admin/flash-deals");
    }
  } catch (error) {
toast.error(
  error?.message ||
  error?.response?.data?.message ||
  "Something went wrong."
);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-green-700 hover:text-green-800 mb-3"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-3xl font-bold text-gray-800">
              Add Flash Deal
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new homepage Flash Deal.
            </p>

          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Side */}

          <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Flash Deal Details
            </h2>

            {/* ===========
                FORM START
               =========== */}

<form
  onSubmit={handleSubmit}
  className="space-y-6"
>

  {/* Title & Subtitle */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div>
      <label className="block mb-2 font-semibold text-gray-700">
        Flash Deal Title
      </label>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Big Billion Sale"
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block mb-2 font-semibold text-gray-700">
        Subtitle
      </label>

      <input
        type="text"
        name="subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        placeholder="Up to 70% OFF"
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>

  </div>

  {/* Banner Upload */}

  <div>

    <label className="block mb-2 font-semibold text-gray-700">
      Banner Image
    </label>

    <label className="border-2 border-dashed border-green-400 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition">

      <Upload size={40} className="text-green-600 mb-3" />

      <p className="font-medium text-gray-700">
        Click to Upload Banner
      </p>

      <p className="text-sm text-gray-500 mt-1">
        JPG, PNG, WEBP
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />

    </label>

  </div>

  {/* Button Details */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div>

      <label className="block mb-2 font-semibold text-gray-700">
        Button Text
      </label>

      <input
        type="text"
        name="buttonText"
        value={formData.buttonText}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />

    </div>

    <div>

      <label className="block mb-2 font-semibold text-gray-700">
        Button Link
      </label>

      <input
        type="text"
        name="buttonLink"
        value={formData.buttonLink}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />

    </div>

  </div>

  {/* Date & Color */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div>

      <label className="block mb-2 font-semibold text-gray-700">
        End Date & Time
      </label>

      <input
        type="datetime-local"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />

    </div>

    <div>

      <label className="block mb-2 font-semibold text-gray-700">
        Background Color
      </label>

      <div className="flex items-center gap-4">

        <input
          type="color"
          name="backgroundColor"
          value={formData.backgroundColor}
          onChange={handleChange}
          className="w-16 h-12 rounded-lg cursor-pointer"
        />

        <input
          type="text"
          name="backgroundColor"
          value={formData.backgroundColor}
          onChange={handleChange}
          className="flex-1 border rounded-xl px-4 py-3"
        />

      </div>

    </div>

  </div>

  {/* Status */}

  <div className="flex items-center justify-between border rounded-xl p-4">

    <div>

      <h3 className="font-semibold">
        Flash Deal Status
      </h3>

      <p className="text-sm text-gray-500">
        Enable or disable this Flash Deal.
      </p>

    </div>

    <label className="inline-flex items-center cursor-pointer">

      <input
        type="checkbox"
        name="isActive"
        checked={formData.isActive}
        onChange={handleChange}
        className="w-5 h-5 accent-green-600"
      />

    </label>

  </div>

  {/* Submit Button */}

  <div className="flex justify-end">

<button
  type="submit"
  disabled={loading}
  className="
    bg-green-600
    hover:bg-green-700
    disabled:bg-green-400
    text-white
    px-8
    py-3
    rounded-xl
    font-semibold
    transition
    w-full
    sm:w-auto
  "
>
  {loading ? "Creating..." : "Create Flash Deal"}
</button>

  </div>

</form>

          </div>

          {/* Right Preview */}

          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-5">

            <h2 className="text-xl font-bold mb-5">
              Live Preview
            </h2>

            <div
              className="rounded-2xl overflow-hidden text-white"
              style={{
                background: formData.backgroundColor,
              }}
            >
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={60}
                    className="text-gray-500"
                  />
                )}

              </div>

              <div className="p-5">

                <h3 className="text-xl font-bold">

                  {formData.title || "Flash Deal Title"}

                </h3>

                <p className="mt-2 text-white/90">

                  {formData.subtitle ||
                    "Flash Deal Subtitle"}

                </p>

                <button
                  type="button"
                  className="mt-5 bg-white text-green-700 px-5 py-3 rounded-xl font-semibold"
                >
                  {formData.buttonText}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddFlashDeal;