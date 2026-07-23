import { FaSearch, FaSave } from "react-icons/fa";

const SEOSettings = ({
  seo,
  setSeo,
  onSave,
  saving,
}) => {

  /* ==========================================
      Input Change
  ========================================== */

  const handleChange = (field, value) => {
    setSeo((prev) => ({
      ...prev,
      [field]: value,
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

        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

          <FaSearch className="text-emerald-600 text-xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            SEO Settings
          </h2>

          <p className="text-sm text-gray-500">
            Configure search engine optimization settings for your website.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-6">
                {/* Website Title */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website Title
          </label>

          <input
            type="text"
            value={seo.title || ""}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            placeholder="Enter website title"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            This title appears in browser tabs and search engine results.
          </p>

        </div>

        {/* Meta Description */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Meta Description
          </label>

          <textarea
            rows={5}
            value={seo.description || ""}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            placeholder="Enter meta description..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Recommended length: 150–160 characters.
          </p>

        </div>

        {/* Meta Keywords */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Meta Keywords
          </label>

          <textarea
            rows={4}
            value={seo.keywords || ""}
            onChange={(e) =>
              handleChange("keywords", e.target.value)
            }
            placeholder="e.g. ecommerce, fashion, shopping, electronics"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Separate keywords using commas (,).
          </p>

        </div>
                {/* Open Graph Image URL */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Open Graph Image URL
          </label>

          <input
            type="url"
            value={seo.ogImage || ""}
            onChange={(e) =>
              handleChange("ogImage", e.target.value)
            }
            placeholder="https://example.com/og-image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Used when your website is shared on Facebook, WhatsApp and LinkedIn.
          </p>

        </div>

        {/* Canonical URL */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Canonical URL
          </label>

          <input
            type="url"
            value={seo.canonicalUrl || ""}
            onChange={(e) =>
              handleChange("canonicalUrl", e.target.value)
            }
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Prevents duplicate content issues for search engines.
          </p>

        </div>

        {/* Robots Meta Tag */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Robots Meta Tag
          </label>

          <select
            value={seo.robots || "index,follow"}
            onChange={(e) =>
              handleChange("robots", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="index,follow">
              index, follow
            </option>

            <option value="noindex,follow">
              noindex, follow
            </option>

            <option value="index,nofollow">
              index, nofollow
            </option>

            <option value="noindex,nofollow">
              noindex, nofollow
            </option>
          </select>

          <p className="mt-2 text-xs text-gray-500">
            Controls how search engines crawl and index your website.
          </p>

        </div>

        {/* Google Analytics ID */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Google Analytics ID
          </label>

          <input
            type="text"
            value={seo.googleAnalyticsId || ""}
            onChange={(e) =>
              handleChange("googleAnalyticsId", e.target.value)
            }
            placeholder="G-XXXXXXXXXX"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Enter your Google Analytics Measurement ID.
          </p>

        </div>

        {/* Google Search Console Verification */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Google Search Console Verification
          </label>

          <textarea
            rows={4}
            value={seo.searchConsoleVerification || ""}
            onChange={(e) =>
              handleChange(
                "searchConsoleVerification",
                e.target.value
              )
            }
            placeholder="Paste your Google Search Console verification code..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            Used to verify ownership of your website in Google Search Console.
          </p>

        </div>
              {/* Save Button */}

      </div>

      <div className="mt-8 flex justify-end">

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
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

export default SEOSettings;