import Logo from "./Logo";
import Hamburger from "./Hamburger";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const Navbar = ({ openSidebar }) => {
  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-[1450px] mx-auto px-6">

        <div className="h-20 flex items-center gap-6">

          {/* Left */}
          <div className="flex items-center gap-3 shrink-0">
            <Hamburger onClick={openSidebar} />
            <Logo />
          </div>

          {/* Center */}
          <div className="flex-1">
            <SearchBar />
          </div>

          {/* Right */}
          <div className="shrink-0">
            <UserActions />
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;