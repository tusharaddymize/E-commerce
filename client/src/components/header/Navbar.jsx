import Logo from "./Logo";
import Hamburger from "./Hamburger";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const Navbar = ({ openSidebar }) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1450px] mx-auto px-3 sm:px-5 lg:px-8">

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

          <div className="flex items-center gap-3 flex-shrink-0">

            <Hamburger onClick={openSidebar} />

            <Logo />

          </div>

          {/* Search */}

          <div className="hidden md:flex flex-1 max-w-4xl">

            <SearchBar />

          </div>

          {/* Right */}

          <UserActions />

        </div>

        {/* Mobile Search */}

        <div className="md:hidden pb-3">

          <SearchBar />

        </div>

      </div>
    </nav>
  );
};

export default Navbar;