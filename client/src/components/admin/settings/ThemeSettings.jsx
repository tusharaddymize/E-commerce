import { FaPalette, FaSave } from "react-icons/fa";

const ThemeSettings = ({
  theme,
  setTheme,
  onSave,
  saving,
}) => {

  /* ==========================================
      Input Change
  ========================================== */

  const handleChange = (field, value) => {
    setTheme((prev) => ({
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

        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">

          <FaPalette className="text-violet-600 text-xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Theme Settings
          </h2>

          <p className="text-sm text-gray-500">
            Customize your website appearance and branding.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Color */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Color
          </label>

          <div className="flex items-center gap-4">

            <input
              type="color"
              value={theme.primaryColor || "#2563eb"}
              onChange={(e) =>
                handleChange("primaryColor", e.target.value)
              }
              className="w-16 h-12 border rounded-lg cursor-pointer"
            />

            <input
              type="text"
              value={theme.primaryColor || "#2563eb"}
              onChange={(e) =>
                handleChange("primaryColor", e.target.value)
              }
              placeholder="#2563eb"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Secondary Color */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Secondary Color
          </label>

          <div className="flex items-center gap-4">

            <input
              type="color"
              value={theme.secondaryColor || "#1e293b"}
              onChange={(e) =>
                handleChange("secondaryColor", e.target.value)
              }
              className="w-16 h-12 border rounded-lg cursor-pointer"
            />

            <input
              type="text"
              value={theme.secondaryColor || "#1e293b"}
              onChange={(e) =>
                handleChange("secondaryColor", e.target.value)
              }
              placeholder="#1e293b"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Accent Color */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Accent Color
          </label>

          <div className="flex items-center gap-4">

            <input
              type="color"
              value={theme.accentColor || "#f59e0b"}
              onChange={(e) =>
                handleChange("accentColor", e.target.value)
              }
              className="w-16 h-12 border rounded-lg cursor-pointer"
            />

            <input
              type="text"
              value={theme.accentColor || "#f59e0b"}
              onChange={(e) =>
                handleChange("accentColor", e.target.value)
              }
              placeholder="#f59e0b"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Color Preview */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Theme Preview
          </label>

          <div className="flex gap-4">

            <div
              className="flex-1 h-16 rounded-xl border"
              style={{
                backgroundColor:
                  theme.primaryColor || "#2563eb",
              }}
            />

            <div
              className="flex-1 h-16 rounded-xl border"
              style={{
                backgroundColor:
                  theme.secondaryColor || "#1e293b",
              }}
            />

            <div
              className="flex-1 h-16 rounded-xl border"
              style={{
                backgroundColor:
                  theme.accentColor || "#f59e0b",
              }}
            />

          </div>

          <p className="mt-2 text-xs text-gray-500">
            Preview of your selected theme colors.
          </p>

        </div>
                {/* Dark Mode */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dark Mode
          </label>

          <label className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl cursor-pointer">

            <span className="text-gray-700 font-medium">
              Enable Dark Mode
            </span>

            <input
              type="checkbox"
              checked={theme.darkMode || false}
              onChange={(e) =>
                handleChange("darkMode", e.target.checked)
              }
              className="w-5 h-5 accent-violet-600"
            />

          </label>

        </div>

        {/* Font Family */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Font Family
          </label>

          <select
            value={theme.fontFamily || "Inter"}
            onChange={(e) =>
              handleChange("fontFamily", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
          >
            <option value="Inter">Inter</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
            <option value="Nunito">Nunito</option>
          </select>

        </div>

        {/* Border Radius */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Border Radius
          </label>

          <select
            value={theme.borderRadius || "12px"}
            onChange={(e) =>
              handleChange("borderRadius", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
          >
            <option value="0px">None</option>
            <option value="4px">Small</option>
            <option value="8px">Medium</option>
            <option value="12px">Large</option>
            <option value="16px">Extra Large</option>
            <option value="9999px">Fully Rounded</option>
          </select>

        </div>

        {/* Container Width */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Container Width
          </label>

          <select
            value={theme.containerWidth || "1280px"}
            onChange={(e) =>
              handleChange("containerWidth", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
          >
            <option value="1024px">1024px</option>
            <option value="1280px">1280px</option>
            <option value="1440px">1440px</option>
            <option value="1536px">1536px</option>
            <option value="100%">Full Width</option>
          </select>

        </div>
              {/* Close Grid */}
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
              : "bg-violet-600 hover:bg-violet-700"
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

export default ThemeSettings;