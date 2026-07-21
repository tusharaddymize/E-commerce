const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "Levis",
  "Roadster",
];

const BrandFilter = ({
  value,
  onChange,
}) => {
  return (
    <div>

      <h3 className="font-semibold mb-4">
        Brand
      </h3>

      <div className="space-y-2">

        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              checked={value === brand}
              onChange={() =>
                onChange(brand)
              }
            />

            {brand}

          </label>
        ))}

      </div>

    </div>
  );
};

export default BrandFilter;