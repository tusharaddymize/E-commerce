import Logo from "./Logo";
import Hamburger from "./Hamburger";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const Navbar = ({ openSidebar }) => {
  return (
    <nav
      className="
        w-full
        bg-white
        border-b
        border-gray-200
        transition-colors
        duration-300
      "
    >
      <div
        className="
          w-full
          max-w-[var(--container-width,1450px)]
          mx-auto
          px-3
          sm:px-5
          lg:px-8
        "
      >
        {/* ====================================== */}
        {/* Main Navbar */}
        {/* ====================================== */}

        <div
          className="
            h-16
            md:h-20
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {/* Left */}

<div className="flex items-center gap-0 md:gap-2 flex-shrink-0">
  <Hamburger onClick={openSidebar} />
  <Logo />
</div>
          {/* Desktop Search */}

          <div className="hidden md:flex flex-1 max-w-4xl">
            <SearchBar />
          </div>

          {/* Right Actions */}

          <UserActions />
        </div>

        {/* ====================================== */}
        {/* Mobile Search */}
        {/* ====================================== */}

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;