import { FiUser } from "react-icons/fi";

const LoginButton = () => {
  return (
    <button className="hidden xl:flex items-center gap-2">
      <FiUser size={20} />

      <span className="text-sm font-medium">
        Login / Register
      </span>
    </button>
  );
};

export default LoginButton;