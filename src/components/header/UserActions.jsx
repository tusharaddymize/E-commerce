import LoginButton from "./LoginButton";
import WishlistIcon from "./WishlistIcon";
import CartIcon from "./CartIcon";

const UserActions = () => {
  return (
    <div className="flex items-center gap-6 shrink-0">
      <LoginButton />
      <WishlistIcon />
      <CartIcon />
    </div>
  );
};

export default UserActions;