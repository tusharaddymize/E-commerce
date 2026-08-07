import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  successToast,
  infoToast,
} from "../utils/toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // ===========================
  // Add To Wishlist
  // ===========================

  const addWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      infoToast("Product already in wishlist");
      return;
    }

    setWishlist((prev) => [...prev, product]);

    successToast(
      `${product.name || "Product"} added to wishlist`
    );
  };

  // ===========================
  // Remove From Wishlist
  // ===========================

  const removeWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );

    successToast("Product removed from wishlist");
  };

  // ===========================
  // Check Wishlist
  // ===========================

  const isInWishlist = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addWishlist,
        removeWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);