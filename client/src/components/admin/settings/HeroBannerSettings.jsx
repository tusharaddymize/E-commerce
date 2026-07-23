import { FaImages, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ImageGuidelines from "../common/ImageGuidelines";

const HeroBannerSettings = ({
  heroBanners,
  setHeroBanners,
  onSave,
  saving,
}) => {
  /* ===========================================
      Upload Banner Image
  =========================================== */

  const handleBannerImage = (index, e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }

    const updated = [...heroBanners];

    updated[index] = {
      ...updated[index],
      image: file,
      preview: URL.createObjectURL(file),
    };

    setHeroBanners(updated);

    toast.success("Banner image selected.");
  };

  /* ===========================================
      Input Change
  =========================================== */

  const handleChange = (index, field, value) => {
    const updated = [...heroBanners];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setHeroBanners(updated);
  };

  /* ===========================================
      Add Banner
  =========================================== */

  const addBanner = () => {
    setHeroBanners([
      ...heroBanners,
      {
        image: null,
        preview: "",
        title: "",
        subtitle: "",
        buttonText: "",
        buttonLink: "",
        active: true,
      },
    ]);
  };

  /* ===========================================
      Delete Banner
  =========================================== */

  const removeBanner = (index) => {
    const updated = heroBanners.filter((_, i) => i !== index);

    setHeroBanners(updated);

    toast.success("Banner removed.");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

            <FaImages className="text-blue-600 text-xl" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Hero Banners
            </h2>

            <p className="text-sm text-gray-500">
              Manage homepage hero banners with professional image guidelines.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={addBanner}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
        >
          <FaPlus />
          Add Banner
        </button>

      </div>

      {/* Banner List */}

      <div className="space-y-8">

        {heroBanners.map((banner, index) => (

          <div
            key={index}
            className="border rounded-2xl p-6 bg-gray-50"
          >

            <div className="flex items-center justify-between mb-6">

              <h3 className="font-bold text-lg text-gray-700">
                Banner {index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeBanner(index)}
                className="text-red-600 hover:text-red-700"
              >
                <FaTrash size={18} />
              </button>

            </div>
                        {/* Upload Section */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* Left Side */}

              <div className="space-y-6">

                {/* Banner Image */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-3">
                    Banner Image
                  </label>

                  <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-6 transition">

                    <div className="flex flex-col items-center">

                      {banner.preview ? (

                        <img
                          src={banner.preview}
                          alt="Banner Preview"
                          className="w-full h-60 rounded-xl object-cover border bg-white"
                        />

                      ) : (

                        <div className="w-full h-60 rounded-xl bg-gray-100 flex items-center justify-center">

                          <FiUploadCloud className="text-6xl text-gray-400" />

                        </div>

                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleBannerImage(index, e)}
                        className="mt-5 w-full cursor-pointer"
                      />

                      {banner.image && (

                        <div className="mt-4 w-full rounded-lg bg-white border p-4">

                          <div className="flex justify-between text-sm">

                            <span className="font-medium text-gray-600">
                              File Name
                            </span>

                            <span className="text-gray-800">
                              {banner.image.name}
                            </span>

                          </div>

                          <div className="flex justify-between text-sm mt-2">

                            <span className="font-medium text-gray-600">
                              File Size
                            </span>

                            <span className="text-gray-800">
                              {(banner.image.size / 1024).toFixed(1)} KB
                            </span>

                          </div>

                          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3">

                            <p className="text-sm text-green-700 font-medium">

                              ✓ Image selected successfully

                            </p>

                          </div>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

                {/* Image Guidelines */}

                <ImageGuidelines
                  title="Hero Banner"
                  recommended="1920 × 700 px"
                  minimum="1600 × 600 px"
                  ratio="16 : 6"
                  format="JPG, PNG, WebP"
                  maxSize="3 MB"
                  note="High quality banners improve homepage appearance and loading experience."
                />

              </div>

              {/* Right Side */}

              <div className="space-y-5">

                {/* Banner Title */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Banner Title
                  </label>

                  <input
                    type="text"
                    value={banner.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    placeholder="Enter banner title"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />

                </div>

                {/* Banner Subtitle */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Banner Subtitle
                  </label>

                  <textarea
                    rows={4}
                    value={banner.subtitle}
                    onChange={(e) =>
                      handleChange(index, "subtitle", e.target.value)
                    }
                    placeholder="Enter banner subtitle"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                                {/* Button Text */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Button Text
                  </label>

                  <input
                    type="text"
                    value={banner.buttonText}
                    onChange={(e) =>
                      handleChange(index, "buttonText", e.target.value)
                    }
                    placeholder="Shop Now"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />

                </div>

                {/* Button Link */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Button Link
                  </label>

                  <input
                    type="text"
                    value={banner.buttonLink}
                    onChange={(e) =>
                      handleChange(index, "buttonLink", e.target.value)
                    }
                    placeholder="/products"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />

                </div>

                {/* Banner Status */}

                <div className="border rounded-xl bg-white p-4 flex items-center justify-between">

                  <div>

                    <h4 className="font-semibold text-gray-800">
                      Banner Status
                    </h4>

                    <p className="text-sm text-gray-500">
                      Enable or disable this banner.
                    </p>

                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">

                    <input
                      type="checkbox"
                      checked={banner.active ?? true}
                      onChange={(e) =>
                        handleChange(index, "active", e.target.checked)
                      }
                      className="sr-only peer"
                    />

                    <div className="w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-blue-600 transition"></div>

                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>

                  </label>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Empty State */}

      {heroBanners.length === 0 && (

        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 p-12 text-center">

          <FaImages className="mx-auto text-6xl text-gray-400 mb-5" />

          <h3 className="text-2xl font-bold text-gray-700">
            No Hero Banners Found
          </h3>

          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Add your first homepage hero banner to showcase promotions,
            offers or featured products.
          </p>

          <button
            type="button"
            onClick={addBanner}
            className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            <FaPlus />
            Add First Banner
          </button>

        </div>

      )}
            {/* Save Button */}

      <div className="mt-8 flex justify-end">

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
        >

          {saving ? (

            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />

              </svg>

              Saving...

            </>

          ) : (

            <>
              <FaSave />
              Save Hero Banners
            </>

          )}

        </button>

      </div>

    </div>
  );
};

export default HeroBannerSettings;