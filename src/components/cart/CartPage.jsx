import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import EmptyCart from "./EmptyCart";

const CartPage = () => {

  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (

    <section className="bg-[#f8faf8] min-h-screen py-10">

      <div className="max-w-[1450px] mx-auto px-5">

        {/* Heading */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: .5,
          }}

          className="mb-10"

        >

          <h1 className="text-4xl lg:text-5xl font-black">

            Shopping Cart

          </h1>

          <p className="text-gray-500 mt-2">

            Review your products before checkout.

          </p>

        </motion.div>

        {/* Layout */}

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-8
          "
        >

          {/* LEFT */}

          <div className="xl:col-span-2 space-y-6">

            <AnimatePresence>

              {cartItems.map((item) => (

                <CartItem

                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}

                  item={item}

                />

              ))}

            </AnimatePresence>

          </div>

          {/* RIGHT */}

          <div>
                        {/* Sticky Summary */}

            <div className="sticky top-24">

              <CartSummary />

            </div>

            {/* Coupon (Not Sticky) */}

            {/* <div className="mt-6">

              <CouponBox />

            </div> */}

          </div>

        </div>

      </div>

    </section>

  );

};

export default CartPage;