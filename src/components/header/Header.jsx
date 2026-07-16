import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Navigation from "./Navigation";
import Overlay from "./Overlay";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
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
      >
        <Navbar
          openSidebar={() =>
            setSidebarOpen(true)
          }
        />

        <Navigation />
      </header>

      {/* Header Spacer */}

      <div className="h-[120px] md:h-[136px]" />

      {/* Overlay */}

      <Overlay
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* Sidebar */}

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