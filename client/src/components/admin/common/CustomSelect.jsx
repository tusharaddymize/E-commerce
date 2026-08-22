// ==========================================
// CustomSelect.jsx
// Reusable styled dropdown (replaces native <select>)
// ==========================================

import { useEffect, useRef, useState } from "react";

const CustomSelect = ({
  value,
  onChange,
  options, // array of { label, value }
  placeholder = "Select...",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`
          w-full h-12
          flex items-center justify-between
          border border-gray-300
          rounded-xl
          px-4
          bg-white
          text-left
          outline-none
          transition
          ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : "hover:border-green-400"}
          ${open ? "border-green-500 ring-2 ring-green-100" : ""}
        `}
      >
        <span
          className={`text-sm ${
            value ? "text-gray-800 font-medium" : "text-gray-400"
          }`}
        >
          {selectedLabel}
        </span>

        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {open && !disabled && (
        <div
          className="
            absolute z-40 mt-2 w-full
            max-h-64 overflow-y-auto
            bg-white
            border border-gray-200
            rounded-xl
            shadow-lg
            py-1
          "
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`
                  w-full text-left
                  px-4 py-2.5
                  text-sm
                  transition
                  ${
                    isSelected
                      ? "bg-green-50 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;