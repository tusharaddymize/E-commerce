import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HeroNavigation = ({
  prevSlide,
  nextSlide,
}) => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor =
      "var(--accent-color)";
    e.currentTarget.style.color = "#ffffff";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor =
      "#ffffff";
    e.currentTarget.style.color = "";
  };

  return (
    <>
      {/* ====================================== */}
      {/* Left Arrow */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={prevSlide}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Previous slide"
        className="
          absolute
          left-2
          sm:left-4
          md:left-6
          top-1/2
          -translate-y-1/2

          z-20

          w-9
          h-9
          sm:w-10
          sm:h-10
          md:w-12
          md:h-12

          rounded-full

          bg-white
          text-gray-800

          shadow-lg

          flex
          items-center
          justify-center

          transition-all
          duration-300

          hover:scale-105
        "
      >
        <ChevronLeft
          className="w-5 h-5 md:w-6 md:h-6"
        />
      </button>

      {/* ====================================== */}
      {/* Right Arrow */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={nextSlide}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Next slide"
        className="
          absolute
          right-2
          sm:right-4
          md:right-6
          top-1/2
          -translate-y-1/2

          z-20

          w-9
          h-9
          sm:w-10
          sm:h-10
          md:w-12
          md:h-12

          rounded-full

          bg-white
          text-gray-800

          shadow-lg

          flex
          items-center
          justify-center

          transition-all
          duration-300

          hover:scale-105
        "
      >
        <ChevronRight
          className="w-5 h-5 md:w-6 md:h-6"
        />
      </button>
    </>
  );
};

export default HeroNavigation;