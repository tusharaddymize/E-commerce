import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaWhatsapp,
  FaTelegram,
  FaSave,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { toast } from "react-hot-toast";

const SocialSettings = ({
  social,
  setSocial,
  onSave,
  saving,
}) => {
  /* ==========================================
      Input Change
  ========================================== */

  const handleChange = (field, value) => {
    setSocial((prev) => ({
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

        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

          <FaFacebook className="text-blue-600 text-xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Social Media Settings
          </h2>

          <p className="text-sm text-gray-500">
            Manage your website social media links.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Facebook */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Facebook URL
          </label>

          <div className="relative">

            <FaFacebook className="absolute left-4 top-4 text-blue-600 text-lg" />

            <input
              type="url"
              value={social.facebook || ""}
              onChange={(e) =>
                handleChange("facebook", e.target.value)
              }
              placeholder="https://facebook.com/yourpage"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Instagram */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Instagram URL
          </label>

          <div className="relative">

            <FaInstagram className="absolute left-4 top-4 text-pink-600 text-lg" />

            <input
              type="url"
              value={social.instagram || ""}
              onChange={(e) =>
                handleChange("instagram", e.target.value)
              }
              placeholder="https://instagram.com/yourprofile"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

          </div>

        </div>

        {/* X (Twitter) */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            X (Twitter) URL
          </label>

          <div className="relative">

            <FaXTwitter className="absolute left-4 top-4 text-gray-800 text-lg" />

            <input
              type="url"
              value={social.twitter || ""}
              onChange={(e) =>
                handleChange("twitter", e.target.value)
              }
              placeholder="https://x.com/yourprofile"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />

          </div>

        </div>

        {/* LinkedIn */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            LinkedIn URL
          </label>

          <div className="relative">

            <FaLinkedin className="absolute left-4 top-4 text-blue-700 text-lg" />

            <input
              type="url"
              value={social.linkedin || ""}
              onChange={(e) =>
                handleChange("linkedin", e.target.value)
              }
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />

          </div>

        </div>
                {/* YouTube */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            YouTube URL
          </label>

          <div className="relative">

            <FaYoutube className="absolute left-4 top-4 text-red-600 text-lg" />

            <input
              type="url"
              value={social.youtube || ""}
              onChange={(e) =>
                handleChange("youtube", e.target.value)
              }
              placeholder="https://youtube.com/@yourchannel"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
            />

          </div>

        </div>

        {/* WhatsApp */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            WhatsApp Link
          </label>

          <div className="relative">

            <FaWhatsapp className="absolute left-4 top-4 text-green-600 text-lg" />

            <input
              type="url"
              value={social.whatsapp || ""}
              onChange={(e) =>
                handleChange("whatsapp", e.target.value)
              }
              placeholder="https://wa.me/919876543210"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Telegram */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Telegram URL
          </label>

          <div className="relative">

            <FaTelegram className="absolute left-4 top-4 text-sky-500 text-lg" />

            <input
              type="url"
              value={social.telegram || ""}
              onChange={(e) =>
                handleChange("telegram", e.target.value)
              }
              placeholder="https://t.me/yourchannel"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />

          </div>

        </div>

        {/* GitHub */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GitHub URL
          </label>

          <div className="relative">

            <FaGithub className="absolute left-4 top-4 text-gray-800 text-lg" />

            <input
              type="url"
              value={social.github || ""}
              onChange={(e) =>
                handleChange("github", e.target.value)
              }
              placeholder="https://github.com/yourusername"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />

          </div>

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
              : "bg-blue-600 hover:bg-blue-700"
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

export default SocialSettings;