import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <a href="/" className="flex items-center shrink-0">
      <img
        src={logo}
        alt="Naturio"
        className="w-20 h-20 object-contain"
      />
    </a>
  );
};

export default Logo;