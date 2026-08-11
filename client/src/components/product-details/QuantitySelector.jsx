import {
  FaMinus,
  FaPlus,
} from "react-icons/fa";

const QuantitySelector = ({
  quantity,
  setQuantity,
}) => {
  // ==========================================
  // Decrease Quantity
  // ==========================================

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ==========================================
  // Increase Quantity
  // ==========================================

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center gap-4">

      {/* ====================================== */}
      {/* Decrease */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= 1}
        className="
          w-12
          h-12

          rounded-[var(--border-radius,12px)]

          border
          border-gray-300

          flex
          items-center
          justify-center
text-gray-700
          transition-all
          duration-300

          hover:border-[var(--color-primary,#355E3B)]
          hover:text-[var(--color-primary,#355E3B)]

          disabled:opacity-40
          disabled:cursor-not-allowed
          disabled:hover:border-gray-300
       disabled:hover:text-gray-700
        "
      >
        <FaMinus />
      </button>

      {/* ====================================== */}
      {/* Quantity */}
      {/* ====================================== */}

      <span
        className="
          w-14

          text-center
          text-xl

          font-bold

          text-[var(--color-primary,#355E3B)]
        "
      >
        {quantity}
      </span>

      {/* ====================================== */}
      {/* Increase */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={increase}
        className="
          w-12
          h-12

          rounded-[var(--border-radius,12px)]

          border
          border-gray-300

          flex
          items-center
          justify-center
text-gray-700
          transition-all
          duration-300

          hover:border-[var(--color-primary,#355E3B)]
          hover:text-[var(--color-primary,#355E3B)]
        "
      >
        <FaPlus />
      </button>

    </div>
  );
};

export default QuantitySelector;