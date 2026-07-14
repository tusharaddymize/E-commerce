const SizeSelector = ({
  sizes = [],
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="flex flex-wrap gap-3">

      {sizes.map((size) => (

        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`
            w-12
            h-12
            rounded-xl
            border
            font-semibold
            transition

            ${
              selectedSize === size
                ? "bg-[#355E3B] text-white border-[#355E3B]"
                : "bg-white border-gray-300 hover:border-[#355E3B]"
            }
          `}
        >
          {size}
        </button>

      ))}

    </div>
  );
};

export default SizeSelector;