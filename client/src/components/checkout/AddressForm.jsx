import { FiMapPin } from "react-icons/fi";

const AddressForm = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Mobile only numbers (10 digits max)
    if (name === "mobile") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Pincode only numbers (6 digits max)
    if (name === "pincode") {
      updatedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setForm({
      ...form,
      [name]: updatedValue,
    });
  };

  const emailValid =
    form.email === "" ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const mobileValid =
    form.mobile === "" ||
    /^[6-9]\d{9}$/.test(form.mobile);

  const pincodeValid =
    form.pincode === "" ||
    /^\d{6}$/.test(form.pincode);

  return (
    <div className="bg-white rounded-3xl shadow-lg border p-8">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-full bg-[#355E3B]/10 flex items-center justify-center">

          <FiMapPin className="text-[#355E3B] text-xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Delivery Address
          </h2>

          <p className="text-gray-500">
            Enter your shipping details
          </p>

        </div>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Full Name */}

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className={`w-full h-14 rounded-xl border px-4 outline-none ${
              form.fullName === ""
                ? "border-gray-300"
                : "border-[#355E3B]"
            }`}
          />

          {form.fullName === "" && (
            <p className="text-red-500 text-sm mt-1">
              Full Name is required
            </p>
          )}
        </div>

        {/* Mobile */}

        <div>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className={`w-full h-14 rounded-xl border px-4 outline-none ${
              mobileValid
                ? "border-gray-300"
                : "border-red-500"
            }`}
          />

          {!mobileValid && (
            <p className="text-red-500 text-sm mt-1">
              Enter valid 10 digit mobile number
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className={`w-full h-14 rounded-xl border px-4 outline-none ${
              emailValid
                ? "border-gray-300"
                : "border-red-500"
            }`}
          />

          {!emailValid && (
            <p className="text-red-500 text-sm mt-1">
              Enter valid email
            </p>
          )}
        </div>

        {/* Country */}

        <div>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full h-14 rounded-xl border px-4 outline-none"
          />
        </div>

        {/* State */}

        <div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full h-14 rounded-xl border px-4 outline-none"
          />

          {form.state === "" && (
            <p className="text-red-500 text-sm mt-1">
              State is required
            </p>
          )}
        </div>

        {/* City */}

        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full h-14 rounded-xl border px-4 outline-none"
          />

          {form.city === "" && (
            <p className="text-red-500 text-sm mt-1">
              City is required
            </p>
          )}
        </div>

        {/* Pincode */}

        <div>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className={`w-full h-14 rounded-xl border px-4 outline-none ${
              pincodeValid
                ? "border-gray-300"
                : "border-red-500"
            }`}
          />

          {!pincodeValid && (
            <p className="text-red-500 text-sm mt-1">
              Enter valid 6 digit pincode
            </p>
          )}
        </div>

      </div>

      {/* Address */}

      <div className="mt-5">

        <textarea
          rows="5"
          name="address"
          placeholder="House No, Street, Area, Landmark..."
          value={form.address}
          onChange={handleChange}
          className="w-full rounded-xl border p-4 resize-none outline-none"
        />

        {form.address === "" && (
          <p className="text-red-500 text-sm mt-1">
            Address is required
          </p>
        )}

      </div>

      {/* Save Address */}

      <div className="mt-6 flex items-center gap-3">

        <input
          id="saveAddress"
          type="checkbox"
          className="w-5 h-5 accent-[#355E3B]"
        />

        <label
          htmlFor="saveAddress"
          className="text-gray-600"
        >
          Save this address for future orders
        </label>

      </div>

    </div>
  );
};

export default AddressForm;