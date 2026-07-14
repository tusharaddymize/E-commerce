import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // ===========================
  // Add To Cart (Updated)
  // ===========================

  const addToCart = (product) => {

    setCartItems((prev) => {

      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      // Same Product + Same Size + Same Color

      if (existingItem) {

        return prev.map((item) =>

          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor

            ? {
                ...item,

                quantity:
                  item.quantity +
                  product.quantity,
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

  };
    // ===========================
  // Remove From Cart
  // ===========================

  const removeFromCart = (
    id,
    selectedSize,
    selectedColor
  ) => {

    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );

  };

  // ===========================
  // Increase Quantity
  // ===========================

  const increaseQuantity = (
    id,
    selectedSize,
    selectedColor
  ) => {

    setCartItems((prev) =>
      prev.map((item) =>

        item.id === id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor

          ? {
              ...item,
              quantity: item.quantity + 1,
            }

          : item

      )
    );

  };

  // ===========================
  // Decrease Quantity
  // ===========================

  const decreaseQuantity = (
    id,
    selectedSize,
    selectedColor
  ) => {

    setCartItems((prev) =>

      prev
        .map((item) =>

          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor

            ? {
                ...item,
                quantity: item.quantity - 1,
              }

            : item

        )
        .filter((item) => item.quantity > 0)

    );

  };

  // ===========================
  // Clear Cart
  // ===========================

  const clearCart = () => {
    setCartItems([]);
  };

  // ===========================
  // Cart Count
  // ===========================

  const cartCount = useMemo(() => {

    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

  }, [cartItems]);

  // ===========================
  // Sub Total
  // ===========================

  const subTotal = useMemo(() => {

    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

  }, [cartItems]);

  // ===========================
  // Shipping
  // ===========================

  const shipping =
    subTotal > 999 ? 0 : 99;

  // ===========================
  // GST
  // ===========================

  const gst = Math.round(
    subTotal * 0.18
  );

  // ===========================
  // Total
  // ===========================

  const total =
    subTotal + shipping + gst;

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

      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () =>useContext(CartContext);