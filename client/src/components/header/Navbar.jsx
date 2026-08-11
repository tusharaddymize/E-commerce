import Logo from "./Logo";
import Hamburger from "./Hamburger";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const Navbar = ({ openSidebar }) => {
  return (
    <nav className="bg-white">
      {/* ====================================== */}
      {/* Main Navbar */}
      {/* ====================================== */}

      <div
        className="
          relative
          w-full

          h-20
          md:h-24

          flex
          items-center

          px-4
          sm:px-6
          lg:px-10
          xl:px-16
        "
      >
        {/* ====================================== */}
        {/* LEFT - Hamburger + Logo */}
        {/* ====================================== */}

<div
  className="
    flex
    items-center

    gap-1
    sm:gap-1
    md:gap-2

    flex-shrink-0
  "
>
          {/* Mobile Hamburger */}

<div className="lg:hidden -mr-1">
  <Hamburger onClick={openSidebar} />
</div>

          {/* Logo */}

          <Logo />
        </div>

        {/* ====================================== */}
        {/* CENTER - Search */}
        {/* ====================================== */}

        <div
          className="
            hidden
            md:block

            absolute
            left-1/2
            -translate-x-1/2

            w-[45%]
            lg:w-[50%]
            xl:w-[52%]

            max-w-[900px]
          "
        >
          <SearchBar />
        </div>

        {/* ====================================== */}
        {/* RIGHT - Login Wishlist Cart */}
        {/* ====================================== */}

        <div
          className="
            ml-auto
            flex-shrink-0
          "
        >
          <UserActions />
        </div>
      </div>

      {/* ====================================== */}
      {/* Mobile Search */}
      {/* ====================================== */}

      <div
        className="
          md:hidden

          px-4
          pb-3
        "
      >
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;