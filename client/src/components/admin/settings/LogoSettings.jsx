import { FaImage, FaSave, FaTrash } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-hot-toast";

import ImageGuidelines from "../common/ImageGuidelines";

const LogoSettings = ({
  logo,
  favicon,
  logoPreview,
  faviconPreview,
  setLogo,
  setFavicon,
  setLogoPreview,
  setFaviconPreview,
  onSave,
  saving,
}) => {
  /* ===========================================
      Logo Upload
  =========================================== */

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo must be under 5 MB.");
      return;
    }

    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));

    toast.success("Logo selected.");
  };

  /* ===========================================
      Favicon Upload
  =========================================== */

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Favicon must be under 2 MB.");
      return;
    }

    setFavicon(file);
    setFaviconPreview(URL.createObjectURL(file));

    toast.success("Favicon selected.");
  };

  /* ===========================================
      Remove Logo
  =========================================== */

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview("");
  };

  /* ===========================================
      Remove Favicon
  =========================================== */

  const removeFavicon = () => {
    setFavicon(null);
    setFaviconPreview("");
  };

  return (
    <div>

      {/* ===========================================
          GRID: Logo + Favicon
      =========================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* ===========================
            LEFT SIDE
            Logo Upload
        =========================== */}

        <div className="space-y-6">

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Website Logo
            </label>

            <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-6 transition">

              <div className="flex flex-col items-center">

                {logoPreview ? (

                  <div className="relative w-full">

                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-full h-56 object-contain rounded-xl border bg-white"
                    />

                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center"
                    >
                      <FaTrash size={13} />
                    </button>

                  </div>

                ) : (

                  <div className="w-full h-56 rounded-xl bg-gray-100 flex items-center justify-center">

                    <FiUploadCloud className="text-6xl text-gray-400" />

                  </div>

                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="mt-5 w-full cursor-pointer"
                />

                {logo && (

                  <div className="mt-4 w-full rounded-xl border bg-white p-4">

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-600">
                        File Name
                      </span>

                      <span className="font-medium text-gray-800 break-all">
                        {logo.name}
                      </span>

                    </div>

                    <div className="flex justify-between text-sm mt-2">

                      <span className="text-gray-600">
                        File Size
                      </span>

                      <span className="font-medium text-green-600">
                        {(logo.size / 1024).toFixed(1)} KB
                      </span>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

          <ImageGuidelines
            title="Website Logo"
            recommended="300 × 80 px"
            minimum="200 × 60 px"
            ratio="Horizontal"
            format="PNG (Transparent)"
            maxSize="2 MB"
            note="Transparent PNG gives the best appearance on all backgrounds."
          />

        </div>

        {/* ===========================
            RIGHT SIDE
            Favicon Upload
        =========================== */}

        <div className="space-y-6">

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Website Favicon
            </label>

            <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-6 transition">

              <div className="flex flex-col items-center">

                {faviconPreview ? (

                  <div className="relative">

                    <img
                      src={faviconPreview}
                      alt="Favicon Preview"
                      className="w-40 h-40 object-contain rounded-xl border bg-white"
                    />

                    <button
                      type="button"
                      onClick={removeFavicon}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <FaTrash size={12} />
                    </button>

                  </div>

                ) : (

                  <div className="w-40 h-40 rounded-xl bg-gray-100 flex items-center justify-center">

                    <FiUploadCloud className="text-5xl text-gray-400" />

                  </div>

                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFaviconChange}
                  className="mt-5 w-full cursor-pointer"
                />

                {favicon && (

                  <div className="mt-4 w-full rounded-xl border bg-white p-4">

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-600">
                        File Name
                      </span>

                      <span className="font-medium text-gray-800 break-all">
                        {favicon.name}
                      </span>

                    </div>

                    <div className="flex justify-between text-sm mt-2">

                      <span className="text-gray-600">
                        File Size
                      </span>

                      <span className="font-medium text-green-600">
                        {(favicon.size / 1024).toFixed(1)} KB
                      </span>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

          <ImageGuidelines
            title="Website Favicon"
            recommended="64 × 64 px"
            minimum="32 × 32 px"
            ratio="1 : 1 Square"
            format="PNG, ICO"
            maxSize="2 MB"
            note="Use a square transparent favicon for the best browser compatibility."
          />

        </div>

      </div>

      {/* ===========================================
          Save Button
      =========================================== */}

      <div className="mt-10 flex justify-end">

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
              Save Changes
            </>
          )}
        </button>

      </div>

    </div>
  );
};

export default LogoSettings;