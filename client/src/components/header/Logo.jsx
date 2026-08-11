import { Link } from "react-router-dom";

import defaultLogo from "../../assets/images/logo.png";
import { useTheme } from "../../context/ThemeContext";

const Logo = () => {
  const {
    websiteSettings,
    websiteSettingsLoading,
  } = useTheme();

  // ==========================================
  // Dynamic Logo
  // ==========================================

  const logo =
    websiteSettings?.logo || defaultLogo;

  return (
    <Link
      to="/"
      className="
        flex
        items-center
        shrink-0

        w-[180px]
        h-[70px]

        overflow-visible
      "
    >
      <img
        src={logo}
        alt="Naturio"
        className="
          w-full
          h-full

          object-contain
          object-center

          scale-[2.2]

          transition-opacity
          duration-200
        "
        style={{
          opacity: websiteSettingsLoading
            ? 0.85
            : 1,
        }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultLogo;
        }}
      />
    </Link>
  );
};

export default Logo;