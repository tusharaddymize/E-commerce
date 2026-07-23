import { FaHome, FaSave } from "react-icons/fa";

const HomepageSettings = ({
  homepage,
  setHomepage,
  onSave,
  saving,
}) => {

  /* ==========================================
      Input Change
  ========================================== */

  const handleChange = (field, value) => {
    setHomepage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ==========================================
      Homepage Sections
  ========================================== */

  const handleSectionChange = (field, value) => {
    setHomepage((prev) => ({
      ...prev,
      homepageSections: {
        ...prev.homepageSections,
        [field]: value,
      },
    }));
  };

  /* ==========================================
      Validation
  ========================================== */

  const validate = () => {
    return true;
  };

  /* ==========================================
      Save
  ========================================== */

  const handleSave = () => {
    if (!validate()) return;

    onSave();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">

          <FaHome className="text-cyan-600 text-xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Homepage Settings
          </h2>

          <p className="text-sm text-gray-500">
            Manage homepage banners, content and visible sections.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-6">
                {/* Homepage Title */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Homepage Title
          </label>

          <input
            type="text"
            value={homepage.title || ""}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            placeholder="Enter homepage title"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />

        </div>

        {/* Homepage Subtitle */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Homepage Subtitle
          </label>

          <textarea
            rows={4}
            value={homepage.subtitle || ""}
            onChange={(e) =>
              handleChange("subtitle", e.target.value)
            }
            placeholder="Enter homepage subtitle"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />

        </div>

        {/* CTA Button Text */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CTA Button Text
          </label>

          <input
            type="text"
            value={homepage.ctaText || ""}
            onChange={(e) =>
              handleChange("ctaText", e.target.value)
            }
            placeholder="Shop Now"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />

        </div>

        {/* CTA Button Link */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CTA Button Link
          </label>

          <input
            type="text"
            value={homepage.ctaLink || ""}
            onChange={(e) =>
              handleChange("ctaLink", e.target.value)
            }
            placeholder="/products"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />

        </div>

        {/* Hero Section */}

        <div className="border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-lg font-semibold text-gray-800">
                Hero Section
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Enable or disable the homepage hero section.
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                homepage.homepageSections?.hero ?? true
              }
              onChange={(e) =>
                handleSectionChange(
                  "hero",
                  e.target.checked
                )
              }
              className="w-5 h-5 accent-cyan-600"
            />

          </div>

        </div>
                {/* Homepage Sections */}

        <div className="border border-gray-200 rounded-xl p-5">

          <h3 className="text-lg font-semibold text-gray-800 mb-5">
            Homepage Sections
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Featured Products */}

            <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer">

              <span className="font-medium text-gray-700">
                Featured Products
              </span>

              <input
                type="checkbox"
                checked={
                  homepage.homepageSections?.featuredProducts ?? true
                }
                onChange={(e) =>
                  handleSectionChange(
                    "featuredProducts",
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-cyan-600"
              />

            </label>

            {/* Categories */}

            <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer">

              <span className="font-medium text-gray-700">
                Categories
              </span>

              <input
                type="checkbox"
                checked={
                  homepage.homepageSections?.categories ?? true
                }
                onChange={(e) =>
                  handleSectionChange(
                    "categories",
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-cyan-600"
              />

            </label>

            {/* Best Selling */}

            <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer">

              <span className="font-medium text-gray-700">
                Best Selling
              </span>

              <input
                type="checkbox"
                checked={
                  homepage.homepageSections?.bestSelling ?? true
                }
                onChange={(e) =>
                  handleSectionChange(
                    "bestSelling",
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-cyan-600"
              />

            </label>

            {/* New Arrivals */}

            <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer">

              <span className="font-medium text-gray-700">
                New Arrivals
              </span>

              <input
                type="checkbox"
                checked={
                  homepage.homepageSections?.newArrivals ?? true
                }
                onChange={(e) =>
                  handleSectionChange(
                    "newArrivals",
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-cyan-600"
              />

            </label>

            {/* Testimonials */}

            <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer">

              <span className="font-medium text-gray-700">
                Testimonials
              </span>

              <input
                type="checkbox"
                checked={
                  homepage.homepageSections?.testimonials ?? true
                }
                onChange={(e) =>
                  handleSectionChange(
                    "testimonials",
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-cyan-600"
              />

            </label>

            {/* Newsletter */}

            <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer">

              <span className="font-medium text-gray-700">
                Newsletter
              </span>

              <input
                type="checkbox"
                checked={
                  homepage.homepageSections?.newsletter ?? true
                }
                onChange={(e) =>
                  handleSectionChange(
                    "newsletter",
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-cyan-600"
              />

            </label>

            {/* Features */}

            <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer">

              <span className="font-medium text-gray-700">
                Features
              </span>

              <input
                type="checkbox"
                checked={
                  homepage.homepageSections?.features ?? true
                }
                onChange={(e) =>
                  handleSectionChange(
                    "features",
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-cyan-600"
              />

            </label>

          </div>

        </div>
                {/* Products Per Section */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Products Per Section
          </label>

          <input
            type="number"
            min="1"
            max="50"
            value={homepage.productsPerSection || 8}
            onChange={(e) =>
              handleChange("productsPerSection", Number(e.target.value))
            }
            placeholder="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Number of products displayed in each homepage section.
          </p>

        </div>

        {/* Homepage Banner Limit */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Homepage Banner Limit
          </label>

          <input
            type="number"
            min="1"
            max="10"
            value={homepage.bannerLimit || 3}
            onChange={(e) =>
              handleChange("bannerLimit", Number(e.target.value))
            }
            placeholder="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Maximum banners displayed on the homepage.
          </p>

        </div>

      </div>

      {/* Save Button */}

      <div className="mt-8 flex justify-end">

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="text-lg" />
              Save Changes
            </>
          )}
        </button>

      </div>

    </div>
  );
};

export default HomepageSettings;