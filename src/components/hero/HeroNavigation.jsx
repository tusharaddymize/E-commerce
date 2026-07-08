import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroNavigation = ({ prevSlide, nextSlide }) => {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="
          absolute
          left-6
          top-1/2
          -translate-y-1/2
          w-12
          h-12
          rounded-full
          bg-white
          shadow-lg
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:bg-orange-500
          hover:text-white
        "
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="
          absolute
          right-6
          top-1/2
          -translate-y-1/2
          w-12
          h-12
          rounded-full
          bg-white
          shadow-lg
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:bg-orange-500
          hover:text-white
        "
      >
        <ChevronRight size={24} />
      </button>
    </>
  );
};

export default HeroNavigation;