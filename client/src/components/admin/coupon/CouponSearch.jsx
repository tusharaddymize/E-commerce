import { FaSearch } from "react-icons/fa";

const CouponSearch = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full">

      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={16}
      />

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search coupon by code..."
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
      />

    </div>
  );
};

export default CouponSearch;