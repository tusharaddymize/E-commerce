import { FaFileContract, FaSave } from "react-icons/fa";

const PolicySettings = ({
  policies,
  setPolicies,
  onSave,
  saving,
}) => {

  /* ==========================================
      Input Change
  ========================================== */

  const handleChange = (field, value) => {
    setPolicies((prev) => ({
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
    <div >



      <div className="grid grid-cols-1 gap-6">
                {/* Privacy Policy */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Privacy Policy
          </label>

          <textarea
            rows={10}
            value={policies.privacyPolicy || ""}
            onChange={(e) =>
              handleChange("privacyPolicy", e.target.value)
            }
            placeholder="Write your Privacy Policy..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-y focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            This content will appear on the Privacy Policy page.
          </p>

        </div>

        {/* Terms & Conditions */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Terms & Conditions
          </label>

          <textarea
            rows={10}
            value={policies.termsConditions || ""}
            onChange={(e) =>
              handleChange("termsConditions", e.target.value)
            }
            placeholder="Write your Terms & Conditions..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-y focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            This content will appear on the Terms & Conditions page.
          </p>

        </div>
                {/* Refund Policy */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Refund Policy
          </label>

          <textarea
            rows={10}
            value={policies.refundPolicy || ""}
            onChange={(e) =>
              handleChange("refundPolicy", e.target.value)
            }
            placeholder="Write your Refund Policy..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-y focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            This content will appear on the Refund Policy page.
          </p>

        </div>

        {/* Shipping Policy */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Shipping Policy
          </label>

          <textarea
            rows={10}
            value={policies.shippingPolicy || ""}
            onChange={(e) =>
              handleChange("shippingPolicy", e.target.value)
            }
            placeholder="Write your Shipping Policy..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-y focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            This content will appear on the Shipping Policy page.
          </p>

        </div>

        {/* Cancellation Policy */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cancellation Policy
          </label>

          <textarea
            rows={10}
            value={policies.cancellationPolicy || ""}
            onChange={(e) =>
              handleChange("cancellationPolicy", e.target.value)
            }
            placeholder="Write your Cancellation Policy..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-y focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">
            This content will appear on the Cancellation Policy page.
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
              : "bg-green-600 hover:bg-green-700"
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

export default PolicySettings;