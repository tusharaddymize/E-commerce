
import {
  FaGooglePay,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
} from "react-icons/fa";

const PaymentMethod = ({ form, setForm }) => {



  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      p-8
      "
    >

      {/* Heading */}

      <h2 className="text-2xl font-bold mb-8">

        Payment Method

      </h2>

      {/* UPI */}

      <label
        className="
        flex
        items-center
        justify-between
        border
        rounded-2xl
        p-5
        cursor-pointer
        hover:border-[#355E3B]
        transition
        "
      >

        <div className="flex items-center gap-4">

          <FaGooglePay className="text-3xl text-[#355E3B]" />

          <div>

            <h3 className="font-bold">

              UPI Payment

            </h3>

            <p className="text-gray-500 text-sm">

              Google Pay, PhonePe, Paytm

            </p>

          </div>

        </div>

        <input
          type="radio"
checked={form.paymentMethod === "UPI"}

onChange={() =>
  setForm({
    ...form,
    paymentMethod: "UPI",
  })
}
        />

      </label>

      {/* Credit Card */}

      <label
        className="
        mt-5
        flex
        items-center
        justify-between
        border
        rounded-2xl
        p-5
        cursor-pointer
        hover:border-[#355E3B]
        transition
        "
      >

        <div className="flex items-center gap-4">

          <FaCreditCard className="text-3xl text-[#355E3B]" />

          <div>

            <h3 className="font-bold">

              Credit / Debit Card

            </h3>

            <p className="text-gray-500 text-sm">

              Visa, MasterCard, RuPay

            </p>

          </div>

        </div>

        <input
          type="radio"
checked={form.paymentMethod === "Credit Card"}

onChange={() =>
  setForm({
    ...form,
    paymentMethod: "Credit Card",
  })
}
        />

      </label>

      {/* Net Banking */}

      <label
        className="
        mt-5
        flex
        items-center
        justify-between
        border
        rounded-2xl
        p-5
        cursor-pointer
        hover:border-[#355E3B]
        transition
        "
      >

        <div className="flex items-center gap-4">

          <FaUniversity className="text-3xl text-[#355E3B]" />

          <div>

            <h3 className="font-bold">

              Net Banking

            </h3>

            <p className="text-gray-500 text-sm">

              All Major Banks

            </p>

          </div>

        </div>

        <input
          type="radio"
checked={form.paymentMethod === "Net Banking"}

onChange={() =>
  setForm({
    ...form,
    paymentMethod: "Net Banking",
  })
}
        />

      </label>

      {/* COD */}

      <label
        className="
        mt-5
        flex
        items-center
        justify-between
        border
        rounded-2xl
        p-5
        cursor-pointer
        hover:border-[#355E3B]
        transition
        "
      >

        <div className="flex items-center gap-4">

          <FaMoneyBillWave className="text-3xl text-[#355E3B]" />

          <div>

            <h3 className="font-bold">

              Cash On Delivery

            </h3>

            <p className="text-gray-500 text-sm">

              Pay after receiving your order

            </p>

          </div>

        </div>

        <input
          type="radio"
checked={form.paymentMethod === "COD"}

onChange={() =>
  setForm({
    ...form,
    paymentMethod: "COD",
  })
}
        />

      </label>

    </div>

  );

};

export default PaymentMethod;