import { FaSave } from "react-icons/fa";

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
    <div>
      {/* ====================================== */}
      {/* Theme Settings Grid */}
      {/* ====================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ==================================== */}
        {/* Primary Color */}
        {/* ==================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Color
          </label>

          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.primaryColor || "#355E3B"}
              onChange={(e) =>
                handleChange(
                  "primaryColor",
                  e.target.value
                )
              }
              className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer flex-shrink-0"
            />

            <input
              type="text"
              value={theme.primaryColor || "#355E3B"}
              onChange={(e) =>
                handleChange(
                  "primaryColor",
                  e.target.value
                )
              }
              placeholder="#355E3B"
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ==================================== */}
        {/* Secondary Color */}
        {/* ==================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Secondary Color
          </label>

          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.secondaryColor || "#1E3422"}
              onChange={(e) =>
                handleChange(
                  "secondaryColor",
                  e.target.value
                )
              }
              className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer flex-shrink-0"
            />

            <input
              type="text"
              value={theme.secondaryColor || "#1E3422"}
              onChange={(e) =>
                handleChange(
                  "secondaryColor",
                  e.target.value
                )
              }
              placeholder="#1E3422"
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ==================================== */}
        {/* Accent Color */}
        {/* ==================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Accent Color
          </label>

          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.accentColor || "#f59e0b"}
              onChange={(e) =>
                handleChange(
                  "accentColor",
                  e.target.value
                )
              }
              className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer flex-shrink-0"
            />

            <input
              type="text"
              value={theme.accentColor || "#f59e0b"}
              onChange={(e) =>
                handleChange(
                  "accentColor",
                  e.target.value
                )
              }
              placeholder="#f59e0b"
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ==================================== */}
        {/* Button Color */}
        {/* ==================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Button Color
          </label>

          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.buttonColor || "#355E3B"}
              onChange={(e) =>
                handleChange(
                  "buttonColor",
                  e.target.value
                )
              }
              className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer flex-shrink-0"
            />

            <input
              type="text"
              value={theme.buttonColor || "#355E3B"}
              onChange={(e) =>
                handleChange(
                  "buttonColor",
                  e.target.value
                )
              }
              placeholder="#355E3B"
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ==================================== */}
        {/* Theme Preview */}
        {/* ==================================== */}

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Theme Preview
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Primary */}

            <div>
              <div
                className="h-16 rounded-xl border border-gray-200 shadow-sm"
                style={{
                  backgroundColor:
                    theme.primaryColor || "#355E3B",
                }}
              />

              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700">
                  Primary
                </p>

                <p className="text-xs text-gray-500">
                  {theme.primaryColor || "#355E3B"}
                </p>
              </div>
            </div>

            {/* Secondary */}

            <div>
              <div
                className="h-16 rounded-xl border border-gray-200 shadow-sm"
                style={{
                  backgroundColor:
                    theme.secondaryColor || "#1E3422",
                }}
              />

              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700">
                  Secondary
                </p>

                <p className="text-xs text-gray-500">
                  {theme.secondaryColor || "#1E3422"}
                </p>
              </div>
            </div>

            {/* Accent */}

            <div>
              <div
                className="h-16 rounded-xl border border-gray-200 shadow-sm"
                style={{
                  backgroundColor:
                    theme.accentColor || "#f59e0b",
                }}
              />

              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700">
                  Accent
                </p>

                <p className="text-xs text-gray-500">
                  {theme.accentColor || "#f59e0b"}
                </p>
              </div>
            </div>

            {/* Button */}

            <div>
              <div
                className="h-16 rounded-xl border border-gray-200 shadow-sm"
                style={{
                  backgroundColor:
                    theme.buttonColor || "#355E3B",
                }}
              />

              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700">
                  Button
                </p>

                <p className="text-xs text-gray-500">
                  {theme.buttonColor || "#355E3B"}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Preview of your selected website theme colors.
          </p>
        </div>

 

        {/* ==================================== */}
        {/* Font Family */}
        {/* ==================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Font Family
          </label>

          <select
            value={theme.fontFamily || "Inter"}
            onChange={(e) =>
              handleChange(
                "fontFamily",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="Inter">
              Inter
            </option>

            <option value="Poppins">
              Poppins
            </option>

            <option value="Roboto">
              Roboto
            </option>

            <option value="Montserrat">
              Montserrat
            </option>

            <option value="Open Sans">
              Open Sans
            </option>

            <option value="Lato">
              Lato
            </option>

            <option value="Nunito">
              Nunito
            </option>
          </select>
        </div>

        {/* ==================================== */}
        {/* Border Radius */}
        {/* ==================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Border Radius
          </label>

          <select
            value={theme.borderRadius || "12px"}
            onChange={(e) =>
              handleChange(
                "borderRadius",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="0px">
              None
            </option>

            <option value="4px">
              Small - 4px
            </option>

            <option value="8px">
              Medium - 8px
            </option>

            <option value="12px">
              Large - 12px
            </option>

            <option value="16px">
              Extra Large - 16px
            </option>

            <option value="9999px">
              Fully Rounded
            </option>
          </select>
        </div>

        {/* ==================================== */}
        {/* Container Width */}
        {/* ==================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Container Width
          </label>

          <select
            value={
              theme.containerWidth || "1280px"
            }
            onChange={(e) =>
              handleChange(
                "containerWidth",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="1024px">
              1024px
            </option>

            <option value="1280px">
              1280px
            </option>

            <option value="1440px">
              1440px
            </option>

            <option value="1536px">
              1536px
            </option>

            <option value="100%">
              Full Width
            </option>
          </select>
        </div>
      </div>

      {/* ====================================== */}
      {/* Save Button */}
      {/* ====================================== */}

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

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