const SortDropdown = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e)=>
        onChange(e.target.value)
      }
      className="
      border
      rounded-xl
      px-4
      py-2
      "
    >
      <option value="latest">
        Latest
      </option>

      <option value="popular">
        Popular
      </option>

      <option value="priceLow">
        Price Low To High
      </option>

      <option value="priceHigh">
        Price High To Low
      </option>

      <option value="rating">
        Highest Rating
      </option>

    </select>
  );
};

export default SortDropdown;