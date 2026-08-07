import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

const ProductGallery = ({
  images = [],
}) => {
  // ==========================================
  // Prepare Gallery Images
  // ==========================================

  const galleryImages =
    useMemo(() => {
      const validImages = (
        Array.isArray(images)
          ? images
          : []
      )
        .filter(Boolean)
        .filter(
          (
            image,
            index,
            array
          ) =>
            array.indexOf(
              image
            ) === index
        )
        .slice(0, 5);

      return validImages.length
        ? validImages
        : ["/placeholder.png"];
    }, [images]);

  // ==========================================
  // Selected Image Index
  // ==========================================

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  const selectedImage =
    galleryImages[
      selectedIndex
    ] ||
    galleryImages[0];

  // ==========================================
  // Reset When Product Changes
  // ==========================================

  useEffect(() => {
    setSelectedIndex(0);
  }, [galleryImages]);

  // ==========================================
  // Previous Image
  // ==========================================

  const handlePrevious = () => {
    setSelectedIndex(
      (current) =>
        current === 0
          ? galleryImages.length -
            1
          : current - 1
    );
  };

  // ==========================================
  // Next Image
  // ==========================================

  const handleNext = () => {
    setSelectedIndex(
      (current) =>
        current ===
        galleryImages.length -
          1
          ? 0
          : current + 1
    );
  };

  return (
    <div className="w-full min-w-0">
      <div
        className="
          flex
          flex-col

          lg:flex-row

          gap-3
          sm:gap-4
        "
      >
        {/* ====================================
            THUMBNAILS
        ==================================== */}

        <div
          className="
            order-2
            lg:order-1

            w-full
            lg:w-auto

            flex
            lg:flex-col

            gap-2
            sm:gap-3

            overflow-x-auto
            lg:overflow-visible

            pb-1
            lg:pb-0

            scrollbar-hide
          "
        >
          {galleryImages.map(
            (image, index) => {
              const isActive =
                selectedIndex ===
                index;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      index
                    )
                  }
                  aria-label={`View product image ${
                    index + 1
                  }`}
                  className={`
                    relative

                    flex-shrink-0

                    w-[64px]
                    h-[64px]

                    sm:w-[72px]
                    sm:h-[72px]

                    lg:w-[70px]
                    lg:h-[70px]

                    xl:w-[76px]
                    xl:h-[76px]

                    rounded-lg

                    border-2

                    bg-white

                    overflow-hidden

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          border-[var(--color-primary,#355E3B)]
                          shadow-sm
                        `
                        : `
                          border-gray-200
                          hover:border-gray-400
                        `
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`Product view ${
                      index + 1
                    }`}
                    loading="lazy"
                    onError={(
                      e
                    ) => {
                      e.currentTarget.src =
                        "/placeholder.png";
                    }}
                    className="
                      w-full
                      h-full

                      object-contain

                      p-1.5

                      bg-white
                    "
                  />

                  {/* Active indicator */}

                  {isActive && (
                    <span
                      className="
                        absolute
                        bottom-0
                        left-0

                        w-full
                        h-[3px]

                        bg-[var(--color-primary,#355E3B)]
                      "
                    />
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* ====================================
            MAIN IMAGE AREA
        ==================================== */}

        <div
          className="
            order-1
            lg:order-2

            min-w-0
            flex-1
          "
        >
          <div
            className="
              relative

              w-full

              h-[330px]

              sm:h-[420px]

              md:h-[500px]

              lg:h-[510px]

              xl:h-[560px]

              2xl:h-[600px]

              flex
              items-center
              justify-center

              bg-white

              border
              border-gray-200

              rounded-xl
              sm:rounded-2xl

              overflow-hidden
            "
          >
            {/* ==================================
                MAIN IMAGE
            ================================== */}

            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={
                productImageAlt(
                  selectedIndex
                )
              }
              draggable="false"
              loading="eager"
              initial={{
                opacity: 0,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.18,
              }}
              onError={(e) => {
                e.currentTarget.src =
                  "/placeholder.png";
              }}
              className="
                w-full
                h-full

                object-contain

                p-3

                sm:p-5

                md:p-6

                lg:p-7

                xl:p-8

                select-none
              "
            />

            {/* ==================================
                MOBILE/TABLET ARROWS
            ================================== */}

            {galleryImages.length >
              1 && (
              <>
                <button
                  type="button"
                  onClick={
                    handlePrevious
                  }
                  aria-label="Previous product image"
                  className="
                    absolute

                    left-2
                    sm:left-3

                    top-1/2
                    -translate-y-1/2

                    w-9
                    h-9

                    sm:w-10
                    sm:h-10

                    lg:hidden

                    flex
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-gray-200

                    bg-white/90

                    text-gray-700

                    shadow-sm

                    backdrop-blur

                    active:scale-95

                    transition
                  "
                >
                  <FaChevronLeft className="text-xs" />
                </button>

                <button
                  type="button"
                  onClick={
                    handleNext
                  }
                  aria-label="Next product image"
                  className="
                    absolute

                    right-2
                    sm:right-3

                    top-1/2
                    -translate-y-1/2

                    w-9
                    h-9

                    sm:w-10
                    sm:h-10

                    lg:hidden

                    flex
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-gray-200

                    bg-white/90

                    text-gray-700

                    shadow-sm

                    backdrop-blur

                    active:scale-95

                    transition
                  "
                >
                  <FaChevronRight className="text-xs" />
                </button>
              </>
            )}

            {/* ==================================
                IMAGE COUNTER
            ================================== */}

            {galleryImages.length >
              1 && (
              <div
                className="
                  absolute

                  right-3
                  bottom-3

                  sm:right-4
                  sm:bottom-4

                  px-3
                  py-1.5

                  rounded-full

                  bg-black/70

                  text-white

                  text-[11px]
                  sm:text-xs

                  font-semibold

                  backdrop-blur-sm
                "
              >
                {selectedIndex + 1}
                {" / "}
                {
                  galleryImages.length
                }
              </div>
            )}
          </div>

          {/* ====================================
              MOBILE DOT INDICATORS
          ==================================== */}

          {galleryImages.length >
            1 && (
            <div
              className="
                flex
                lg:hidden

                items-center
                justify-center

                gap-1.5

                mt-3
              "
            >
              {galleryImages.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        index
                      )
                    }
                    aria-label={`Go to product image ${
                      index + 1
                    }`}
                    className={`
                      h-1.5

                      rounded-full

                      transition-all

                      ${
                        selectedIndex ===
                        index
                          ? `
                            w-6
                            bg-[var(--color-primary,#355E3B)]
                          `
                          : `
                            w-1.5
                            bg-gray-300
                          `
                      }
                    `}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Image Alt Helper
// ==========================================

const productImageAlt = (
  index
) => {
  const names = [
    "Main product view",
    "Product side view",
    "Product back view",
    "Product detail view",
    "Product alternate view",
  ];

  return (
    names[index] ||
    `Product image ${index + 1}`
  );
};

export default ProductGallery;