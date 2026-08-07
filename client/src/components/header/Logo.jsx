import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import defaultLogo from "../../assets/images/logo.png";
import { getWebsiteSettings } from "../../services/websiteSettingService";

const Logo = () => {
  const [logo, setLogo] = useState(defaultLogo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await getWebsiteSettings();

        /*
          WebsiteSettings admin page me:
          const res = await getWebsiteSettings();
          const data = res.data;

          Isliye actual settings response.data me hai.
        */

        const settings = response?.data;

        if (settings?.logo) {
          setLogo(settings.logo);
        }
      } catch (error) {
        console.error(
          "Failed to load website logo:",
          error
        );

        // API fail hone par local logo rahega
        setLogo(defaultLogo);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return (
<Link
  to="/"
  className="flex items-center flex-shrink-0 -ml-2 md:ml-0"
>
<img
  src={logo}
  alt="Website Logo"
  className={`
    w-[120px]
    sm:w-[145px]
    md:w-[175px]
    lg:w-[210px]
    xl:w-[230px]

    h-auto
    object-contain

    transition-opacity
    duration-300

    ${loading ? "opacity-70" : "opacity-100"}
  `}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = defaultLogo;
  }}
/>
    </Link>
  );
};

export default Logo;