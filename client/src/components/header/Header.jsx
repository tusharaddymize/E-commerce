import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Navigation from "./Navigation";
import Overlay from "./Overlay";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  // ==========================================
  // Sticky Header
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 10);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // ==========================================
  // Render
  // ==========================================

  return (
    <>
      {/* ======================================
          Fixed Header
      ====================================== */}

      <header
        className={`
          fixed
          top-0
          left-0
          right-0

          z-50

          transition-all
          duration-300

          ${
            sticky
              ? "bg-white/95 backdrop-blur-md shadow-lg"
              : "bg-white"
          }
        `}
        style={{
          borderBottomColor:
            "var(--color-primary, #355E3B)",
        }}
      >
        {/* ====================================
            Main Navbar
        ==================================== */}

        <Navbar
          openSidebar={() =>
            setSidebarOpen(true)
          }
        />

        {/* ====================================
            Desktop Navigation
        ==================================== */}

        <Navigation />
      </header>

      {/* ======================================
          Header Spacer

          Important:
          Header is fixed, so this spacer
          prevents homepage content from
          going behind the navbar.
      ====================================== */}

      <div
        className="
          w-full

          h-[120px]

          sm:h-[125px]

          md:h-[136px]

          lg:h-[190px]

          xl:h-[195px]
        "
        aria-hidden="true"
      />

      {/* ======================================
          Mobile Overlay
      ====================================== */}

      <Overlay
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* ======================================
          Mobile Sidebar
      ====================================== */}

      <MobileSidebar
        open={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />
    </>
  );
};

export default Header;