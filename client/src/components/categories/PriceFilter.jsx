const PriceFilter = ({
  value,
  onChange,
}) => {
  return (
    <div>

      <h3 className="font-semibold mb-4">
        Max Price
      </h3>

      <input
        type="range"
        min="0"
        max="10000"
        step="500"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full"
      />

      <p className="mt-2">

        ₹ {value}

      </p>

    </div>
  );
};

export default PriceFilter;