import { FaTrash, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DeleteCouponModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        >
          <div className="mb-5 flex justify-center">

            <div className="rounded-full bg-red-100 p-5 text-red-600">
              <FaTrash size={28} />
            </div>

          </div>

          <h2 className="text-center text-2xl font-bold">
            Delete Coupon
          </h2>

          <p className="mt-3 text-center text-gray-500">
            Are you sure you want to delete this coupon?
          </p>

          <div className="mt-8 flex gap-3">

            <button
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-3"
            >
              <FaTimes />

              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-white hover:bg-red-700 disabled:opacity-60"
            >
              <FaTrash />

              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteCouponModal;