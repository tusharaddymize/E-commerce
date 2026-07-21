import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="
      fixed
      bottom-6
      right-6
      w-14
      h-14
      rounded-full
      bg-[#355E3B]
      text-white
      shadow-xl
      hover:scale-110
      transition
      z-50
      flex
      items-center
      justify-center
      "
    >
      <FiArrowUp size={22} />
    </button>
  );
};

export default ScrollToTopButton;