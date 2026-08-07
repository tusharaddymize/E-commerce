import React from "react";

const DynamicAttributes = ({
  filters = [],
  attributes = {},
  onChange,
}) => {
  // ==========================================
  // No Attributes
  // ==========================================

  if (!filters.length) {
    return (
      <div className="md:col-span-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-800">
            Product Attributes
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Select a sub category to load product attributes.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render Input According To Filter Type
  // ==========================================

  const renderField = (filter) => {
    const key = filter.key;
    const value = attributes[key] ?? "";

    // Dropdown
    if (filter.type === "dropdown") {
      return (
        <select
          value={value}
          onChange={(e) =>
            onChange(key, e.target.value)
          }
          required={filter.isRequired}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">
            Select {filter.title}
          </option>

          {(filter.options || [])
            .filter((option) => option.isActive !== false)
            .sort(
              (a, b) =>
                (a.sortOrder || 0) -
                (b.sortOrder || 0)
            )
            .map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
        </select>
      );
    }

    // Radio
    if (filter.type === "radio") {
      return (
        <div className="flex flex-wrap gap-3">
          {(filter.options || [])
            .filter((option) => option.isActive !== false)
            .map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-3"
              >
                <input
                  type="radio"
                  name={`attribute-${key}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() =>
                    onChange(key, option.value)
                  }
                />

                <span>{option.label}</span>
              </label>
            ))}
        </div>
      );
    }

    // Checkbox - multiple values
    if (filter.type === "checkbox") {
      const selectedValues = Array.isArray(value)
        ? value
        : value
          ? [value]
          : [];

      const handleCheckbox = (
        optionValue,
        checked
      ) => {
        let updated;

        if (checked) {
          updated = [
            ...new Set([
              ...selectedValues,
              optionValue,
            ]),
          ];
        } else {
          updated = selectedValues.filter(
            (item) => item !== optionValue
          );
        }

        onChange(key, updated);
      };

      return (
        <div className="flex flex-wrap gap-3">
          {(filter.options || [])
            .filter((option) => option.isActive !== false)
            .map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(
                    option.value
                  )}
                  onChange={(e) =>
                    handleCheckbox(
                      option.value,
                      e.target.checked
                    )
                  }
                />

                <span>{option.label}</span>
              </label>
            ))}
        </div>
      );
    }

    // Color
    if (filter.type === "color") {
      return (
        <div className="flex flex-wrap gap-3">
          {(filter.options || [])
            .filter((option) => option.isActive !== false)
            .map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  onChange(key, option.value)
                }
                className={`rounded-xl border px-4 py-3 ${
                  value === option.value
                    ? "ring-2 ring-green-500"
                    : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  {option.color && (
                    <span
                      className="h-5 w-5 rounded-full border"
                      style={{
                        backgroundColor:
                          option.color,
                      }}
                    />
                  )}

                  {option.label}
                </span>
              </button>
            ))}
        </div>
      );
    }

    // Range
    if (filter.type === "range") {
      return (
        <div>
          <input
            type="range"
            min={filter.min ?? 0}
            max={filter.max ?? 100}
            step={filter.step ?? 1}
            value={
              value === ""
                ? filter.min ?? 0
                : value
            }
            onChange={(e) =>
              onChange(key, e.target.value)
            }
            className="w-full"
          />

          <p className="mt-2 text-sm font-semibold text-gray-700">
            {value || filter.min || 0}
          </p>
        </div>
      );
    }

    // Rating
    if (filter.type === "rating") {
      return (
        <select
          value={value}
          onChange={(e) =>
            onChange(key, e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 bg-white p-3"
        >
          <option value="">
            Select Rating
          </option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      );
    }

    // Fallback
    return (
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(key, e.target.value)
        }
        placeholder={`Enter ${filter.title}`}
        required={filter.isRequired}
        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    );
  };

  return (
    <div className="md:col-span-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Product Attributes
          </h2>

          <p className="mt-2 text-gray-500">
            Attributes are loaded automatically according
            to the selected sub category.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[...filters]
            .sort(
              (a, b) =>
                (a.sortOrder || 0) -
                (b.sortOrder || 0)
            )
            .map((filter) => (
              <div
                key={filter._id || filter.key}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <label className="mb-3 block font-semibold text-gray-800">
                  {filter.title}

                  {filter.isRequired && (
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  )}
                </label>

                {renderField(filter)}
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default DynamicAttributes;