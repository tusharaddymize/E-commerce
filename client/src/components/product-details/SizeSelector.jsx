const SizeSelector = ({
  sizes = [],
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="flex flex-wrap gap-3">

      {sizes.map((size) => {
        const isSelected =
          selectedSize === size;

        return (
          <button
            key={size}
            type="button"
            onClick={() =>
              setSelectedSize(size)
            }
            className={`
              w-12
              h-12

              rounded-[var(--border-radius,12px)]

              border

              font-semibold

              flex
              items-center
              justify-center

              transition-all
              duration-300

              ${
                isSelected
                  ? `
                    bg-[var(--color-primary,#355E3B)]
                    text-white
                    border-[var(--color-primary,#355E3B)]
                  `
                  : `
                    bg-white
                    text-gray-700
                    border-gray-300

                    hover:border-[var(--color-primary,#355E3B)]
                    hover:text-[var(--color-primary,#355E3B)]
                  `
              }
            `}
          >
            {size}
          </button>
        );
      })}

    </div>
  );
};

export default SizeSelector;