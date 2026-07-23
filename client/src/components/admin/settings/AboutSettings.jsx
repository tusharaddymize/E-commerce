import { FaInfoCircle, FaSave } from "react-icons/fa";

const AboutSettings = ({
  about,
  setAbout,
  onSave,
  saving,
}) => {

  /* ==========================================
      Input Change
  ========================================== */

  const handleChange = (field, value) => {
    setAbout((prev) => ({
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

        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

          <FaInfoCircle className="text-indigo-600 text-xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            About Us Settings
          </h2>

          <p className="text-sm text-gray-500">
            Manage your website About Us content.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-6">
                {/* About Title */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            About Title
          </label>

          <input
            type="text"
            value={about.title || ""}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            placeholder="Enter About section title"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

        </div>

        {/* About Subtitle */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            About Subtitle
          </label>

          <input
            type="text"
            value={about.subtitle || ""}
            onChange={(e) =>
              handleChange("subtitle", e.target.value)
            }
            placeholder="Enter subtitle"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

        </div>

        {/* About Description */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            About Description
          </label>

          <textarea
            rows={6}
            value={about.description || ""}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            placeholder="Write your About Us description..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

        </div>

        {/* Mission Statement */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mission Statement
          </label>

          <textarea
            rows={4}
            value={about.mission || ""}
            onChange={(e) =>
              handleChange("mission", e.target.value)
            }
            placeholder="Write your company's mission..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

        </div>
                {/* Vision Statement */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Vision Statement
          </label>

          <textarea
            rows={4}
            value={about.vision || ""}
            onChange={(e) =>
              handleChange("vision", e.target.value)
            }
            placeholder="Write your company's vision..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

        </div>

        {/* Experience */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Years of Experience
          </label>

          <input
            type="number"
            min="0"
            value={about.experience || ""}
            onChange={(e) =>
              handleChange("experience", e.target.value)
            }
            placeholder="e.g. 10"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

        </div>

        {/* Happy Customers */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Happy Customers
          </label>

          <input
            type="number"
            min="0"
            value={about.customers || ""}
            onChange={(e) =>
              handleChange("customers", e.target.value)
            }
            placeholder="e.g. 25000"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

        </div>

        {/* Projects Completed */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Projects Completed
          </label>

          <input
            type="number"
            min="0"
            value={about.projects || ""}
            onChange={(e) =>
              handleChange("projects", e.target.value)
            }
            placeholder="e.g. 1200"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

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
              : "bg-indigo-600 hover:bg-indigo-700"
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

export default AboutSettings;