import { FaCheck } from "react-icons/fa6";

const ProductHighlights = ({ product }) => {
  // ==========================================
  // Get Valid Product Highlights
  // ==========================================

  const highlights = Array.isArray(
    product?.highlights
  )
    ? product.highlights
        .filter(
          (item) =>
            item?.label?.trim() &&
            item?.value?.trim()
        )
        .slice(0, 8)
    : [];

  // ==========================================
  // Don't Show Section If Empty
  // ==========================================

  if (!highlights.length) {
    return null;
  }

  return (
    <section
      className="
        w-full

        border-t
        border-gray-200

        pt-5
        sm:pt-6
      "
    >
      {/* ======================================
          HEADING
      ====================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3

          mb-4
        "
      >
        <h2
          className="
            text-base
            sm:text-lg
            lg:text-xl

            font-bold
            text-gray-900
          "
        >
          Product Highlights
        </h2>

        <span
          className="
            text-[11px]
            sm:text-xs

            font-medium

            text-gray-400
          "
        >
          {highlights.length} Highlights
        </span>
      </div>

      {/* ======================================
          HIGHLIGHTS GRID
      ====================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2

          gap-x-8
          gap-y-2.5
        "
      >
        {highlights.map(
          (item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="
                flex
                items-start

                gap-2.5

                min-w-0

                py-1
              "
            >
              {/* Check Icon */}

              <div
                className="
                  mt-[3px]

                  w-5
                  h-5

                  shrink-0

                  flex
                  items-center
                  justify-center

                  rounded-full

                  bg-green-50

                  text-[var(--primary-color,#355E3B)]
                "
              >
                <FaCheck
                  className="
                    text-[10px]
                  "
                />
              </div>

              {/* Content */}

              <div
                className="
                  min-w-0

                  text-sm
                  sm:text-[14px]

                  leading-5
                "
              >
                <span
                  className="
                    font-semibold
                    text-gray-800
                  "
                >
                  {item.label}
                </span>

                <span className="text-gray-400">
                  {" "}
                  —{" "}
                </span>

                <span
                  className="
                    text-gray-600
                    break-words
                  "
                >
                  {item.value}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default ProductHighlights;