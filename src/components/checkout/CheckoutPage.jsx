import { useState } from "react";
import { useCart } from "../../context/CartContext";

import AddressForm from "./AddressForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import CouponBox from "./CouponBox";

const CheckoutPage = () => {

const { subTotal } = useCart();
  const [coupon, setCoupon] = useState({
    code: "",
    discount: 0,
  });
    const handleCoupon = (couponData) => {
    setCoupon(couponData);
  };

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  return (
    <section className="bg-[#f8faf8] min-h-screen py-10">
      <div className="max-w-[1450px] mx-auto px-5">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-black">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order securely.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="xl:col-span-2 space-y-8">

           <AddressForm
  form={form}
  setForm={setForm}
/>

<PaymentMethod />

<CouponBox
  subTotal={subTotal}
  onApply={handleCoupon}
/>

          </div>

          {/* Right Side */}
          <div>
            <div className="sticky top-24">

            <OrderSummary
  form={form}
  coupon={coupon}
/>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CheckoutPage;