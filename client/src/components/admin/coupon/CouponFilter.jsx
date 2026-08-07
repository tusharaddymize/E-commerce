const CouponFilter = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
    >
      <option value="all">
        All Coupons
      </option>

      <option value="active">
        Active Coupons
      </option>

      <option value="inactive">
        Inactive Coupons
      </option>

      <option value="expired">
        Expired Coupons
      </option>
    </select>
  );
};

export default CouponFilter;