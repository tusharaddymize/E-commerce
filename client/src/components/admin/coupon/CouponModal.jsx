import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import CouponForm from "./CouponForm";

const CouponModal = ({
  coupon,
  onClose,
  refresh,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          transition={{
            duration: 0.25,
          }}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        >
          {/* Header */}

          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">

                {coupon
                  ? "Edit Coupon"
                  : "Add Coupon"}

              </h2>

              <p className="mt-1 text-sm text-gray-500">

                {coupon
                  ? "Update coupon details."
                  : "Create a new discount coupon."}

              </p>

            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
            >
              <FaTimes size={18} />
            </button>

          </div>

          {/* Body */}

          <div className="p-6">

            <CouponForm
              coupon={coupon}
              onClose={onClose}
              refresh={refresh}
            />

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CouponModal;