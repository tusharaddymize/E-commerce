import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  // ==========================================
  // Show / Hide Button
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // ==========================================
  // Scroll To Top
  // ==========================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // Hidden
  // ==========================================

  if (!show) return null;

  // ==========================================
  // Button
  // ==========================================

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="
        fixed

        bottom-4
        right-4

        sm:bottom-6
        sm:right-6

        w-12
        h-12

        sm:w-14
        sm:h-14

        rounded-full

        bg-[var(--button-color)]
        text-white

        shadow-xl

        flex
        items-center
        justify-center

        z-50

        transition-all
        duration-300

        hover:scale-110
        hover:opacity-90

        active:scale-95
      "
    >
      <FiArrowUp
        className="
          w-5
          h-5

          sm:w-[22px]
          sm:h-[22px]
        "
      />
    </button>
  );
};

export default ScrollToTopButton;