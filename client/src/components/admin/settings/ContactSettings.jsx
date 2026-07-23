import { FaPhoneAlt, FaSave } from "react-icons/fa";
import {
  MdEmail,
  MdLocationOn,
  MdAccessTime,
} from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { toast } from "react-hot-toast";

const ContactSettings = ({
  contact,
  setContact,
  onSave,
  saving,
}) => {
  /* ===========================================
      Handle Input Change
  =========================================== */

  const handleChange = (field, value) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ===========================================
      Validation
  =========================================== */

  const validate = () => {
    if (!contact.companyName?.trim()) {
      toast.error("Company name is required.");
      return false;
    }

    if (!contact.email?.trim()) {
      toast.error("Email is required.");
      return false;
    }

    if (!contact.phone?.trim()) {
      toast.error("Phone number is required.");
      return false;
    }

    return true;
  };

  /* ===========================================
      Save
  =========================================== */

  const handleSave = () => {
    if (!validate()) return;

    onSave();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

  {/* Header */}

  <div className="flex items-center gap-3 mb-8">

    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

      <FaPhoneAlt className="text-blue-600 text-xl" />

    </div>

    <div>

      <h2 className="text-2xl font-bold text-gray-800">
        Contact Settings
      </h2>

      <p className="text-sm text-gray-500">
        Manage your business contact information.
      </p>

    </div>

  </div>

  {/* Contact Form */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Company Name */}

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Company Name
      </label>

      <div className="relative">

        <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          value={contact.companyName || ""}
          onChange={(e) =>
            handleChange("companyName", e.target.value)
          }
          placeholder="ABC Pvt. Ltd."
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

      </div>

    </div>

    {/* Email */}

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Email Address
      </label>

      <div className="relative">

        <MdEmail className="absolute left-4 top-4 text-gray-400 text-lg" />

        <input
          type="email"
          value={contact.email || ""}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
          placeholder="support@example.com"
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

      </div>

    </div>

    {/* Phone */}

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Phone Number
      </label>

      <div className="relative">

        <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          value={contact.phone || ""}
          onChange={(e) =>
            handleChange("phone", e.target.value)
          }
          placeholder="+91 9876543210"
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

      </div>

    </div>

    {/* WhatsApp */}

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        WhatsApp Number
      </label>

      <div className="relative">

        <BsWhatsapp className="absolute left-4 top-4 text-green-600 text-lg" />

        <input
          type="text"
          value={contact.whatsapp || ""}
          onChange={(e) =>
            handleChange("whatsapp", e.target.value)
          }
          placeholder="+91 9876543210"
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

      </div>

    </div>

    {/* Address */}

    <div className="md:col-span-2">

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Business Address
      </label>

      <div className="relative">

        <MdLocationOn className="absolute left-4 top-4 text-gray-400 text-xl" />

        <textarea
          rows={4}
          value={contact.address || ""}
          onChange={(e) =>
            handleChange("address", e.target.value)
          }
          placeholder="Enter complete business address..."
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

      </div>

    </div>


      {/* Google Maps */}

    <div className="md:col-span-2">

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Google Maps Embed URL
      </label>

      <input
        type="text"
        value={contact.googleMap || ""}
        onChange={(e) =>
          handleChange("googleMap", e.target.value)
        }
        placeholder="https://www.google.com/maps/embed?..."
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <p className="text-xs text-gray-500 mt-2">
        Paste your Google Maps Embed URL.
      </p>

    </div>

    {/* Business Hours */}

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Business Hours
      </label>

      <div className="relative">

        <MdAccessTime className="absolute left-4 top-4 text-gray-400 text-lg" />

        <input
          type="text"
          value={contact.businessHours || ""}
          onChange={(e) =>
            handleChange("businessHours", e.target.value)
          }
          placeholder="Mon - Sat : 9:00 AM - 7:00 PM"
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

      </div>

    </div>

    {/* Support Timing */}

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Customer Support Timing
      </label>

      <div className="relative">

        <MdAccessTime className="absolute left-4 top-4 text-gray-400 text-lg" />

        <input
          type="text"
          value={contact.supportHours || ""}
          onChange={(e) =>
            handleChange("supportHours", e.target.value)
          }
          placeholder="24 × 7 Support"
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

      </div>

    </div>

    {/* Contact Page Heading */}

    <div className="md:col-span-2">

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Contact Page Heading
      </label>

      <input
        type="text"
        value={contact.heading || ""}
        onChange={(e) =>
          handleChange("heading", e.target.value)
        }
        placeholder="Get In Touch"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

    </div>

    {/* Contact Description */}

    <div className="md:col-span-2">

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Contact Description
      </label>

      <textarea
        rows={5}
        value={contact.description || ""}
        onChange={(e) =>
          handleChange("description", e.target.value)
        }
        placeholder="Write a short description for your Contact page..."
        className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

    </div>

  </div>
        {/* Save Button */}

      <div className="flex justify-end mt-8">

        <button
          type="button"
          onClick={handleSave}
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
              Save Contact Settings
            </>
          )}
        </button>

      </div>

    </div>
  );
};

export default ContactSettings;