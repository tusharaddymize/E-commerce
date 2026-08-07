import { useMemo, useState } from "react";
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
} from "react-icons/fa";

const DynamicFilter = ({
  filter,
  value,
  onChange,
}) => {
  const type = filter?.type || "checkbox";

 const options = useMemo(() => {
  if (!Array.isArray(filter?.options)) {
    return [];
  }

  return filter.options.map((item) => {
    if (typeof item === "string") {
      return {
        label: item,
        value: item,
      };
    }

    return item;
  });
}, [filter]);

  /* ==========================================
      Local State
  ========================================== */

  const [expanded, setExpanded] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showAll, setShowAll] =
    useState(false);

  const MAX_ITEMS = 6;

  /* ==========================================
      Checkbox
  ========================================== */

  if (type === "checkbox") {
    const selected = Array.isArray(value)
      ? value
      : [];

    const handleToggle = (option) => {
      if (
        selected.includes(option.value)
      ) {
        onChange(
          selected.filter(
            (item) =>
              item !== option.value
          )
        );
      } else {
        onChange([
          ...selected,
          option.value,
        ]);
      }
    };

    const filteredOptions =
      options.filter((item) =>
        item.label
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    const visibleOptions = showAll
      ? filteredOptions
      : filteredOptions.slice(
          0,
          MAX_ITEMS
        );

    return (
      <div className="space-y-4">

        {/* Header */}

        <button
          type="button"
          onClick={() =>
            setExpanded(!expanded)
          }
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
       {filter.label || filter.title}
          </h3>

          {expanded ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </button>

        {expanded && (
          <>

            {/* Search */}

            {options.length > 8 && (
              <div className="relative">

                <FaSearch className="absolute left-3 top-3 text-sm text-gray-400" />

                <input
                  type="text"
                  placeholder={`Search ${filter.label || filter.title}`}
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    py-2
                    pl-9
                    pr-3
                    text-sm
                    outline-none
                    transition
                    focus:border-green-600
                  "
                />

              </div>
            )}

            {/* Options */}

            <div className="space-y-2">

              {visibleOptions.map(
                (option) => (
                  <label
                    key={option.value}
                    className="
                      group
                      flex
                      cursor-pointer
                      items-center
                      justify-between
                      rounded-lg
                      px-2
                      py-2
                      hover:bg-gray-50
                    "
                  >
                    <div className="flex items-center gap-3">

                      <input
                        type="checkbox"
                        checked={selected.includes(
                          option.value
                        )}
                        onChange={() =>
                          handleToggle(
                            option
                          )
                        }
                        className="
                          h-4
                          w-4
                          rounded
                          border-gray-300
                          accent-green-600
                        "
                      />

                      <span className="text-sm text-gray-700 group-hover:text-green-700">
                        {option.label}
                      </span>

                    </div>

                    {option.count && (
                      <span className="text-xs text-gray-400">
                        ({option.count})
                      </span>
                    )}

                  </label>
                )
              )}

            </div>

            {/* Show More */}

            {filteredOptions.length >
              MAX_ITEMS && (
              <button
                type="button"
                onClick={() =>
                  setShowAll(
                    !showAll
                  )
                }
                className="
                  text-sm
                  font-semibold
                  text-pink-600
                  hover:text-pink-700
                "
              >
                {showAll
                  ? "Show Less"
                  : `+ ${
                      filteredOptions.length -
                      MAX_ITEMS
                    } More`}
              </button>
            )}

          </>
        )}

      </div>
    );
  }


    /* ==========================================
      Radio
  ========================================== */

  if (type === "radio") {
    return (
      <div className="space-y-4">

        {/* Header */}

        <button
          type="button"
          onClick={() =>
            setExpanded(!expanded)
          }
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
           {filter.label || filter.title}
          </h3>

          {expanded ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </button>

        {expanded && (
          <div className="space-y-2">

            {options.map((option) => (
              <label
                key={option.value}
                className="group flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">

                  <input
                    type="radio"
                    name={filter.key}
                    checked={
                      value === option.value
                    }
                    onChange={() =>
                      onChange(option.value)
                    }
                    className="h-4 w-4 accent-green-600"
                  />

                  <span className="text-sm text-gray-700 group-hover:text-green-700">
                    {option.label}
                  </span>

                </div>

                {option.count && (
                  <span className="text-xs text-gray-400">
                    ({option.count})
                  </span>
                )}
              </label>
            ))}

          </div>
        )}

      </div>
    );
  }

  /* ==========================================
      Dropdown
  ========================================== */

  if (type === "dropdown") {
    return (
      <div className="space-y-4">

        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
        {filter.label || filter.title}
        </h3>

        <select
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-green-600 focus:outline-none"
        >
          <option value="">
            Select {filter.label || filter.title}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>
    );
  }

  /* ==========================================
      Color
  ========================================== */

  if (type === "color") {
    return (
      <div className="space-y-4">

        <button
          type="button"
          onClick={() =>
            setExpanded(!expanded)
          }
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
           {filter.label || filter.title}
          </h3>

          {expanded ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </button>

        {expanded && (
          <div className="space-y-2">

            {options.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() =>
                  onChange(color.value)
                }
                className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50 ${
                  value === color.value
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full border ${
                    value === color.value
                      ? "ring-2 ring-green-600"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      color.value,
                  }}
                />

                <span className="text-sm text-gray-700">
                  {color.label}
                </span>

              </button>
            ))}

          </div>
        )}

      </div>
    );
  }

  /* ==========================================
      Range
  ========================================== */

  if (type === "range") {
    return (
      <div className="space-y-4">

        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
         {filter.label || filter.title}
        </h3>

        <div className="flex justify-between text-sm text-gray-500">

          <span>
            ₹{filter.min}
          </span>

          <span className="font-semibold">
            ₹{value ?? filter.max}
          </span>

          <span>
            ₹{filter.max}
          </span>

        </div>

        <input
          type="range"
          min={filter.min}
          max={filter.max}
          step={filter.step || 1}
          value={value ?? filter.max}
          onChange={(e) =>
            onChange(
              Number(e.target.value)
            )
          }
          className="w-full accent-green-600"
        />

      </div>
    );
  }

  /* ==========================================
      Rating
  ========================================== */

  if (type === "rating") {
    return (
      <div className="space-y-4">

        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
          {filter.label || filter.title}
        </h3>

        {[5, 4, 3, 2, 1].map(
          (rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50"
            >
              <input
                type="radio"
                name={filter.key}
                checked={
                  value === rating
                }
                onChange={() =>
                  onChange(rating)
                }
                className="accent-green-600"
              />

              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({
                  length: rating,
                }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <span className="text-sm text-gray-600">
                & Up
              </span>

            </label>
          )
        )}

      </div>
    );
  }

  /* ==========================================
      Default
  ========================================== */

  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-5">
      <h3 className="mb-2 font-semibold text-gray-800">
        {filter?.title || "Filter"}
      </h3>

      <p className="text-sm text-gray-500">
        Unsupported Filter :
        <span className="ml-1 font-semibold">
          {filter?.type}
        </span>
      </p>
    </div>
  );
};

export default DynamicFilter;