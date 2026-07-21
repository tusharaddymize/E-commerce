import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = ({
  quantity,
  setQuantity,
}) => {

  const decrease = () => {

    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

  };

  const increase = () => {

    setQuantity(quantity + 1);

  };

  return (

    <div className="flex items-center gap-4">

      <button
        onClick={decrease}
        className="
        w-12
        h-12
        rounded-xl
        border
        flex
        items-center
        justify-center
        hover:bg-gray-100
        transition
        "
      >

        <FaMinus />

      </button>

      <span
        className="
        w-14
        text-center
        text-xl
        font-bold
        "
      >

        {quantity}

      </span>

      <button
        onClick={increase}
        className="
        w-12
        h-12
        rounded-xl
        border
        flex
        items-center
        justify-center
        hover:bg-gray-100
        transition
        "
      >

        <FaPlus />

      </button>

    </div>

  );

};

export default QuantitySelector;