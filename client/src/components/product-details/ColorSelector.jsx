import { FaCheck } from "react-icons/fa";

const ColorSelector = ({
  colors = [],
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div className="flex flex-wrap gap-4">

      {colors.map((color) => {
        const isSelected =
          selectedColor === color;

        const isWhite =
          color?.toLowerCase() === "#ffffff" ||
          color?.toLowerCase() === "#fff" ||
          color?.toLowerCase() === "white";

        return (
          <button
            key={color}
            type="button"
            onClick={() =>
              setSelectedColor(color)
            }
            aria-label={`Select color ${color}`}
            className={`
              w-11
              h-11

              rounded-full

              border-2

              flex
              items-center
              justify-center

              transition-all
              duration-300

              hover:scale-110

              ${
                isSelected
                  ? "ring-2 ring-[var(--color-primary,#355E3B)] ring-offset-2"
                  : ""
              }
            `}
            style={{
              backgroundColor: color,

              borderColor: isSelected
                ? "var(--color-primary, #355E3B)"
                : "#e5e7eb",
            }}
          >
            {isSelected && (
              <FaCheck
                className={`
                  text-sm

                  ${
                    isWhite
                      ? "text-black"
                      : "text-white"
                  }
                `}
              />
            )}
          </button>
        );
      })}

    </div>
  );
};

export default ColorSelector;