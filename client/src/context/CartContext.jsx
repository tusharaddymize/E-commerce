import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  successToast,
  infoToast,
} from "../utils/toast";

import { useAuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ==========================================
  // Current Logged In User
  // ==========================================

  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useAuthContext();

  const [cartItems, setCartItems] = useState([]);

  const [cartLoaded, setCartLoaded] =
    useState(false);

  // ==========================================
  // Get Current User ID
  // ==========================================

  const userId =
    user?._id || user?.id || null;

  // ==========================================
  // User Specific Cart Key
  // Example: cart_67abc123
  // ==========================================

  const cartKey = userId
    ? `cart_${userId}`
    : null;

  // ==========================================
  // Load Cart When User Changes / Logs In
  // ==========================================

  useEffect(() => {
    // Wait until AuthContext finishes checking user
    if (authLoading) {
      return;
    }

    // User logout / not logged in
    if (!isAuthenticated || !cartKey) {
      setCartItems([]);
      setCartLoaded(false);
      return;
    }

    try {
      const savedCart =
        localStorage.getItem(cartKey);

      const parsedCart = savedCart
        ? JSON.parse(savedCart)
        : [];

      setCartItems(
        Array.isArray(parsedCart)
          ? parsedCart
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      setCartItems([]);
    } finally {
      setCartLoaded(true);
    }
  }, [
    authLoading,
    isAuthenticated,
    cartKey,
  ]);

  // ==========================================
  // Save Current User Cart
  // ==========================================

  useEffect(() => {
    if (
      authLoading ||
      !isAuthenticated ||
      !cartKey ||
      !cartLoaded
    ) {
      return;
    }

    try {
      localStorage.setItem(
        cartKey,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [
    cartItems,
    authLoading,
    isAuthenticated,
    cartKey,
    cartLoaded,
  ]);

  // ==========================================
  // Add To Cart
  // ==========================================

  const addToCart = (product) => {
    if (!isAuthenticated) {
      infoToast(
        "Please login to add products to cart"
      );
      return;
    }

    let isExisting = false;

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize ===
            product.selectedSize &&
          item.selectedColor ===
            product.selectedColor
      );

      // Same Product + Size + Color
      if (existingItem) {
        isExisting = true;

        return prev.map((item) =>
          item.id === product.id &&
          item.selectedSize ===
            product.selectedSize &&
          item.selectedColor ===
            product.selectedColor
            ? {
                ...item,
                quantity:
                  item.quantity +
                  (product.quantity || 1),
              }
            : item
        );
      }

      // New Product
      return [
        ...prev,
        {
          ...product,

          quantity:
            product.quantity || 1,

          selectedSize:
            product.selectedSize || "",

          selectedColor:
            product.selectedColor || "",
        },
      ];
    });

    if (isExisting) {
      infoToast(
        "Cart quantity updated"
      );
    } else {
      successToast(
        `${
          product.title || "Product"
        } added to cart`
      );
    }
  };

  // ==========================================
  // Remove From Cart
  // ==========================================

  const removeFromCart = (
    id,
    selectedSize,
    selectedColor
  ) => {
    if (!isAuthenticated) return;

    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize ===
              selectedSize &&
            item.selectedColor ===
              selectedColor
          )
      )
    );

    successToast(
      "Product removed from cart"
    );
  };

  // ==========================================
  // Increase Quantity
  // ==========================================

  const increaseQuantity = (
    id,
    selectedSize,
    selectedColor
  ) => {
    if (!isAuthenticated) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.selectedSize ===
          selectedSize &&
        item.selectedColor ===
          selectedColor
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );

    infoToast("Quantity Updated");
  };

  // ==========================================
  // Decrease Quantity
  // ==========================================

  const decreaseQuantity = (
    id,
    selectedSize,
    selectedColor
  ) => {
    if (!isAuthenticated) return;

    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id &&
          item.selectedSize ===
            selectedSize &&
          item.selectedColor ===
            selectedColor
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );

    infoToast("Quantity Updated");
  };

  // ==========================================
  // Clear Cart
  // ==========================================

  const clearCart = () => {
    if (!isAuthenticated) return;

    setCartItems([]);

    successToast("Cart Cleared");
  };

  // ==========================================
  // Cart Count
  // ==========================================

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  // ==========================================
  // Sub Total
  // ==========================================

  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  // ==========================================
  // Shipping
  // ==========================================

  const shipping =
    cartItems.length === 0
      ? 0
      : subTotal > 999
      ? 0
      : 99;

  // ==========================================
  // GST
  // ==========================================

  const gst = Math.round(
    subTotal * 0.18
  );

  // ==========================================
  // Total
  // ==========================================

  const total =
    subTotal + shipping + gst;

  // ==========================================
  // Provider
  // ==========================================

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,
        removeFromCart,

        increaseQuantity,
        decreaseQuantity,

        clearCart,

        cartCount,
        subTotal,
        shipping,
        gst,
        total,

        cartLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);