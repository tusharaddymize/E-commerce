import { FaCheck } from "react-icons/fa";

const ColorSelector = ({
  colors = [],
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div className="flex flex-wrap gap-4">

      {colors.map((color) => (

        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition hover:scale-110"
          style={{
            backgroundColor: color,
            borderColor:
              selectedColor === color
                ? "#355E3B"
                : "#e5e7eb",
          }}
        >

          {selectedColor === color && (

            <FaCheck
              className={`text-sm ${
                color === "#FFFFFF" ||
                color === "#ffffff"
                  ? "text-black"
                  : "text-white"
              }`}
            />

          )}

        </button>

      ))}

    </div>
  );
};

export default ColorSelector;