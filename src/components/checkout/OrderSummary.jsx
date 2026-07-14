import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../services/orderService";
import { useOrder } from "../../context/OrderContext";

const OrderSummary = ({ form, coupon }) => {

  const navigate = useNavigate();

  const { addOrder, setLoading, setError } = useOrder();

  const {
    cartItems,
    cartCount,
    subTotal,
    shipping,
    gst,
    clearCart,
  } = useCart();

  const discountAmount = coupon?.discount
    ? (subTotal * coupon.discount) / 100
    : 0;

  const finalTotal =
    subTotal + shipping + gst - discountAmount;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    form.email
  );

  const isMobileValid = /^[6-9]\d{9}$/.test(
    form.mobile
  );

  const isPincodeValid = /^\d{6}$/.test(
    form.pincode
  );

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
      alert("⚠ Please fill all delivery details.");
      return;
    }

    if (!isEmailValid) {
      alert("⚠ Please enter a valid email address.");
      return;
    }

    if (!isMobileValid) {
      alert("⚠ Please enter a valid 10 digit mobile number.");
      return;
    }

    if (!isPincodeValid) {
      alert("⚠ Please enter a valid 6 digit pincode.");
      return;
    }

    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty.");
      return;
    }


const orderData = {
  items: cartItems,

  shippingAddress: form,

  paymentMethod: "COD",

  subtotal: subTotal,

  shipping,

  gst,

  discount: discountAmount,

  total: finalTotal,
};

try {

  setLoading(true);

  const response = await placeOrder(orderData);

  addOrder(response.order);

  clearCart();

  navigate("/order-success");

} catch (error) {

  console.error(error);

  setError(
    error.response?.data?.message || "Order Failed"
  );

  alert("Failed to place order.");

} finally {

  setLoading(false);

}


  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      p-6
      sticky
      top-24
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      {/* Products */}

      <div className="space-y-5">

        {cartItems.map((item) => (

          <div
            key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
            className="flex gap-4"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-xl object-cover border"
            />

            <div className="flex-1">

              <h3 className="font-semibold">
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
                  className="w-5 h-5 rounded-full border"
                  style={{
                    background: item.selectedColor,
                  }}
                />

              </div>

            </div>

            <div className="font-bold">
              ₹{item.price * item.quantity}
            </div>

          </div>

        ))}

      </div>

      <div className="border-t my-6"></div>
            {/* Price Details */}

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
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>
          <span>₹{gst}</span>
        </div>


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

      <div className="border-t my-6"></div>

      {/* Grand Total */}

      <div className="flex justify-between items-center">

        <h3 className="text-xl font-bold">
          Grand Total
        </h3>

        <span className="text-3xl font-black text-[#355E3B]">
          ₹{finalTotal.toFixed(0)}
        </span>

      </div>

      {/* Place Order */}
<button
  onClick={handlePlaceOrder}
  disabled={cartItems.length === 0}
  className={`w-full h-14 mt-8 rounded-2xl text-white font-bold transition ${
    cartItems.length === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#355E3B] hover:bg-[#27452d]"
  }`}
>
        Place Order
      </button>

    </div>
  );
};

export default OrderSummary;