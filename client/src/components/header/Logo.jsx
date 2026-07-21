import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center flex-shrink-0"
    >
      <img
        src={logo}
        alt="Naturio"
        className="
        w-14
        h-14
        md:w-20
        md:h-20
        object-contain
        "
      />
    </Link>
  );
};

export default Logo;