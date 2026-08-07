const HeroDots = ({
  slides = [],
  current,
  setCurrent,
}) => {
  return (
    <div
      className="
        absolute
        bottom-3
        sm:bottom-5
        md:bottom-8
        left-1/2
        -translate-x-1/2

        z-20

        flex
        items-center
        gap-2
        sm:gap-3
      "
    >
      {slides.map((_, index) => {
        const isActive = current === index;

        return (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              rounded-full

              transition-all
              duration-300

              ${
                isActive
                  ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-[var(--accent-color)]"
                  : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 hover:bg-[var(--accent-color)] hover:opacity-70"
              }
            `}
          />
        );
      })}
    </div>
  );
};

export default HeroDots;