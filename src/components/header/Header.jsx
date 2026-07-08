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
      setSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full top-0 z-50 transition-all duration-300 ${
        sticky
          ? "fixed bg-white shadow-lg"
          : "relative bg-white"
      }`}
    >
      <Navbar openSidebar={() => setSidebarOpen(true)} />

      <Navigation />

      <Overlay
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <MobileSidebar
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
    </header>
  );
};

export default Header;