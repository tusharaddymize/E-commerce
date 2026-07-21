import { NavLink } from "react-router-dom";

const NavItem = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `relative pb-4 text-sm font-medium transition-all duration-300 ${
          isActive
            ? "text-[#355E3B]"
            : "text-gray-600 hover:text-[#355E3B]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {item.title}

          {isActive && (
            <span
              className="
              absolute
              left-0
              bottom-0
              w-full
              h-[3px]
              rounded-full
              bg-[#355E3B]
              "
            />
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;