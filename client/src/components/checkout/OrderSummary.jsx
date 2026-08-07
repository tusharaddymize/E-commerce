import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import { placeOrder } from "../../services/orderService";

const OrderSummary = ({ form, coupon }) => {
  const navigate = useNavigate();

  const [isPlacingOrder, setIsPlacingOrder] =
    useState(false);

  const {
    addOrder,
    setLoading,
    setError,
  } = useOrder();

  const {
    cartItems,
    cartCount,
    subTotal,
    shipping,
    gst,
    clearCart,
  } = useCart();

  // ==========================================
  // Price Calculation
  // ==========================================

  const discountAmount = coupon?.discount
    ? (subTotal * coupon.discount) / 100
    : 0;

  const finalTotal =
    subTotal +
    shipping +
    gst -
    discountAmount;

  // ==========================================
  // Validation
  // ==========================================

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.email
    );

  const isMobileValid =
    /^[6-9]\d{9}$/.test(form.mobile);

  const isPincodeValid =
    /^\d{6}$/.test(form.pincode);

  // ==========================================
  // Place Order
  // ==========================================

  const handlePlaceOrder = async () => {
    if (
      !form.fullName.trim() ||
      !form.mobile.trim() ||
      !form.email.trim() ||
      !form.country.trim() ||
      !form.state.trim() ||
      !form.city.trim() ||
      !form.pincode.trim() ||
      !form.address.trim()
    ) {
      toast.error(
        "Please fill all delivery details."
      );
      return;
    }

    if (!isEmailValid) {
      toast.error(
        "Please enter a valid email address."
      );
      return;
    }

    if (!isMobileValid) {
      toast.error(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    if (!isPincodeValid) {
      toast.error(
        "Please enter a valid 6 digit pincode."
      );
      return;
    }

    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is empty.");
      return;
    }

    // ========================================
    // Payment Method
    // ========================================

    const paymentMethod =
      form.paymentMethod === "Credit / Debit Card"
        ? "Credit Card"
        : form.paymentMethod;

    // ========================================
    // Order Data
    // ========================================

    const orderData = {
      items: cartItems,

      shippingAddress: form,

      paymentMethod,

      subtotal: subTotal,

      shipping,

      gst,

      discount: discountAmount,

      total: finalTotal,
    };

    try {
      setLoading(true);
      setIsPlacingOrder(true);

      const response =
        await placeOrder(orderData);

      addOrder(response.order);

      toast.success(
        "Order placed successfully 🎉"
      );

      clearCart();

      navigate("/order-success");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Order Failed";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
      setIsPlacingOrder(false);
    }
  };

  return (
    <div
      className="
        bg-white
        shadow-lg
        border
        border-gray-200
        p-6
        sticky
        top-24
      "
      style={{
        borderRadius:
          "var(--border-radius, 24px)",
      }}
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      {/* ====================================== */}
      {/* Products */}
      {/* ====================================== */}

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
            className="flex gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="
                w-20
                h-20
                object-cover
                border
                border-gray-200
              "
              style={{
                borderRadius:
                  "var(--border-radius, 12px)",
              }}
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Qty : {item.quantity}
              </p>

              <p className="text-sm text-gray-500">
                Size : {item.selectedSize || "-"}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">
                  Color :
                </span>

                <div
                  className="
                    w-5
                    h-5
                    rounded-full
                    border
                    border-gray-300
                  "
                  style={{
                    backgroundColor:
                      item.selectedColor ||
                      "#ffffff",
                  }}
                />
              </div>
            </div>

            <div className="font-bold whitespace-nowrap">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}

      <div className="border-t my-6" />

      {/* ====================================== */}
      {/* Price Details */}
      {/* ====================================== */}

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{cartCount}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span>
            {shipping === 0
              ? "FREE"
              : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>
          <span>₹{gst}</span>
        </div>

        {/* Discount */}

        {coupon?.discount > 0 && (
          <div className="flex justify-between text-green-600 font-semibold">
            <span>
              Discount ({coupon.code})
            </span>

            <span>
              -₹{discountAmount.toFixed(0)}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}

      <div className="border-t my-6" />

      {/* ====================================== */}
      {/* Grand Total */}
      {/* ====================================== */}

      <div className="flex justify-between items-center gap-4">
        <h3 className="text-xl font-bold">
          Grand Total
        </h3>

        <span
          className="
            text-3xl
            font-black
          "
          style={{
            color:
              "var(--primary-color, #355E3B)",
          }}
        >
          ₹{finalTotal.toFixed(0)}
        </span>
      </div>

      {/* ====================================== */}
      {/* Place Order */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={
          cartItems.length === 0 ||
          isPlacingOrder
        }
        className={`
          w-full
          h-14
          mt-8
          text-white
          font-bold
          flex
          items-center
          justify-center
          gap-3
          transition
          duration-300

          ${
            cartItems.length === 0 ||
            isPlacingOrder
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:opacity-90"
          }
        `}
        style={{
          borderRadius:
            "var(--border-radius, 16px)",

          ...(
            cartItems.length === 0 ||
            isPlacingOrder
              ? {}
              : {
                  backgroundColor:
                    "var(--primary-color, #355E3B)",
                }
          ),
        }}
      >
        {isPlacingOrder ? (
          <>
            <FaSpinner className="animate-spin" />

            <span>
              Placing Order...
            </span>
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
};

export default OrderSummary;