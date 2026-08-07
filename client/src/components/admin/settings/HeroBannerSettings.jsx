import {
  FaImages,
  FaPlus,
  FaTrash,
  FaSave,
  FaLink,
} from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-hot-toast";

import ImageGuidelines from "../common/ImageGuidelines";

const HeroBannerSettings = ({
  heroBanners,
  setHeroBanners,
  onSave,
  saving,
}) => {
  // ==========================================
  // Upload Banner Image
  // ==========================================

  const handleBannerImage = (index, e) => {
    const file = e.target.files?.[0];

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

  // ==========================================
  // Input Change
  // ==========================================

  const handleChange = (index, field, value) => {
    const updated = [...heroBanners];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setHeroBanners(updated);
  };

  // ==========================================
  // Add Banner
  // ==========================================

  const addBanner = () => {
    setHeroBanners([
      ...heroBanners,
      {
        image: null,
        preview: "",
        buttonLink: "",
        active: true,
        order: heroBanners.length,
      },
    ]);
  };

  // ==========================================
  // Delete Banner
  // ==========================================

  const removeBanner = (index) => {
    const updated = heroBanners.filter(
      (_, i) => i !== index
    );

    setHeroBanners(updated);

    toast.success("Banner removed.");
  };

  return (
    <div className="w-full">
      {/* Top Action */}

      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={addBanner}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
            transition
          "
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
            className="
              border
              border-gray-200
              rounded-2xl
              p-4
              sm:p-6
              bg-gray-50
            "
          >
            {/* Banner Header */}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Banner {index + 1}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Upload banner image and select where
                  users should go after clicking it.
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeBanner(index)}
                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-50
                  text-red-600
                  hover:bg-red-100
                  hover:text-red-700
                  transition
                "
                title="Delete Banner"
              >
                <FaTrash size={17} />
              </button>
            </div>

            {/* Main Grid */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* =================================
                  LEFT - IMAGE
              ================================= */}

              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-3">
                    Banner Image
                  </label>

                  <div
                    className="
                      border-2
                      border-dashed
                      border-gray-300
                      hover:border-green-500
                      rounded-2xl
                      p-4
                      sm:p-6
                      transition
                      bg-white
                    "
                  >
                    <div className="flex flex-col items-center">
                      {/* Preview */}

                      {banner.preview ? (
                        <img
                          src={banner.preview}
                          alt={`Banner ${index + 1}`}
                          className="
                            w-full
                            h-auto
                            max-h-[320px]
                            rounded-xl
                            object-cover
                            border
                            bg-gray-50
                          "
                        />
                      ) : (
                        <div
                          className="
                            w-full
                            h-52
                            sm:h-60
                            rounded-xl
                            bg-gray-100
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3
                          "
                        >
                          <FiUploadCloud className="text-6xl text-gray-400" />

                          <p className="text-sm text-gray-500">
                            Upload Hero Banner
                          </p>
                        </div>
                      )}

                      {/* File Input */}

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) =>
                          handleBannerImage(index, e)
                        }
                        className="
                          mt-5
                          w-full
                          text-sm
                          text-gray-600

                          file:mr-4
                          file:rounded-lg
                          file:border-0
                          file:bg-green-600
                          file:px-4
                          file:py-2
                          file:text-white
                          file:font-medium

                          hover:file:bg-green-700
                        "
                      />

                      {/* New File Information */}

                      {banner.image instanceof File && (
                        <div className="mt-4 w-full rounded-xl bg-gray-50 border p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                            <span className="font-medium text-gray-500">
                              File Name
                            </span>

                            <span className="text-gray-800 break-all">
                              {banner.image.name}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm mt-3">
                            <span className="font-medium text-gray-500">
                              File Size
                            </span>

                            <span className="text-gray-800">
                              {(
                                banner.image.size / 1024
                              ).toFixed(1)}{" "}
                              KB
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

                {/* Guidelines */}

                <ImageGuidelines
                  title="Hero Banner"
                  recommended="1920 × 700 px"
                  minimum="1600 × 600 px"
                  ratio="16 : 6"
                  format="JPG, PNG, WebP"
                  maxSize="5 MB"
                  note="Use a banner that already contains any promotional text/design you want visible."
                />
              </div>

              {/* =================================
                  RIGHT - LINK + STATUS
              ================================= */}

              <div className="space-y-6">
                {/* Banner Link */}

                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-green-100
                        text-green-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaLink />
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Banner Link
                      </h4>

                      <p className="text-sm text-gray-500">
                        Page to open when banner is clicked.
                      </p>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={banner.buttonLink || ""}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "buttonLink",
                        e.target.value
                      )
                    }
                    placeholder="/category/electronics"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      focus:ring-2
                      focus:ring-green-500
                      focus:border-green-500
                      focus:outline-none
                    "
                  />

                  <div className="mt-4 rounded-xl bg-gray-50 border p-4">
                    <p className="text-sm font-medium text-gray-700">
                      Examples:
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <p>/category/electronics</p>
                      <p>/category/men</p>
                      <p>/product/PRODUCT_ID</p>
                      <p>/search/shoes</p>
                    </div>
                  </div>
                </div>

                {/* Banner Status */}

                <div
                  className="
                    border
                    border-gray-200
                    rounded-2xl
                    bg-white
                    p-5
                    flex
                    items-center
                    justify-between
                    gap-5
                  "
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Banner Status
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {banner.active ?? true
                        ? "Banner is visible on the website."
                        : "Banner is hidden from the website."}
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={banner.active ?? true}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "active",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />

                    <div
                      className="
                        w-12
                        h-7
                        rounded-full
                        bg-gray-300
                        peer-checked:bg-green-600
                        transition-all
                        duration-300
                      "
                    />

                    <div
                      className="
                        absolute
                        left-1
                        top-1
                        w-5
                        h-5
                        rounded-full
                        bg-white
                        shadow
                        transition-all
                        duration-300
                        peer-checked:translate-x-5
                      "
                    />
                  </label>
                </div>

                {/* Information */}

                <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
                  <h4 className="font-semibold text-green-800">
                    How this banner works
                  </h4>

                  <p className="text-sm text-green-700 mt-2 leading-6">
                    The banner image will appear directly on
                    the homepage. No additional title,
                    subtitle or button will be placed over
                    the image.
                  </p>

                  <p className="text-sm text-green-700 mt-2 leading-6">
                    When a customer clicks the banner, they
                    will be redirected to the Banner Link
                    entered above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}

      {heroBanners.length === 0 && (
        <div
          className="
            border-2
            border-dashed
            border-gray-300
            rounded-2xl
            bg-gray-50
            p-8
            sm:p-12
            text-center
          "
        >
          <FaImages className="mx-auto text-6xl text-gray-400 mb-5" />

          <h3 className="text-2xl font-bold text-gray-700">
            No Hero Banners Found
          </h3>

          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Add a banner image and link it to a category,
            product or another page.
          </p>

          <button
            type="button"
            onClick={addBanner}
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              bg-green-600
              hover:bg-green-700
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            <FaPlus />

            Add First Banner
          </button>
        </div>
      )}

      {/* Save */}

      {heroBanners.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              bg-green-600
              hover:bg-green-700
              disabled:bg-green-400
              disabled:cursor-not-allowed
              text-white
              font-semibold
              px-6
              py-3
              rounded-xl
              transition
            "
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
      )}
    </div>
  );
};

export default HeroBannerSettings;