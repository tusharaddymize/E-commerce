import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaCheckCircle,
  FaThumbsUp,
} from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
      bg-white
      rounded-3xl
      border
      border-gray-200
      shadow-sm
      p-6
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start gap-4">

        <div className="flex items-center gap-4">

          <img
            src={review.avatar}
            alt={review.user}
            className="
            w-14
            h-14
            rounded-full
            object-cover
            border-2
            border-[#355E3B]
            "
          />

          <div>

            <h3 className="font-bold text-lg">
              {review.user}
            </h3>

            <div className="flex items-center gap-2 mt-1">

              <FaCheckCircle className="text-green-600 text-sm" />

              <span className="text-sm text-green-600 font-medium">
                Verified Purchase
              </span>

            </div>

            <p className="text-xs text-gray-400 mt-1">
              {review.date}
            </p>

          </div>

        </div>

        {/* Rating */}

        <div
          className="
          flex
          items-center
          gap-1
          bg-[#355E3B]
          text-white
          px-3
          py-1
          rounded-full
          font-semibold
          "
        >
          <FaStar className="text-yellow-300" />
          {review.rating}
        </div>

      </div>

      {/* Title */}

      <h4 className="text-xl font-bold mt-6">
        {review.title}
      </h4>

      {/* Review */}

      <p
        className="
        mt-3
        text-gray-600
        leading-8
        "
      >
        {review.review}
      </p>

      {/* Images */}

      {review.images.length > 0 && (

        <div
          className="
          mt-6
          flex
          gap-3
          overflow-x-auto
          "
        >

          {review.images.map((image, index) => (

            <img
              key={index}
              src={image}
              alt=""
              className="
              w-24
              h-24
              rounded-xl
              object-cover
              cursor-pointer
              border
              hover:scale-105
              transition
              "
            />

          ))}

        </div>

      )}

      {/* Footer */}

      <div
        className="
        mt-6
        flex
        justify-between
        items-center
        flex-wrap
        gap-4
        "
      >

        <button
          onClick={() => setLiked(!liked)}
          className={`
          flex
          items-center
          gap-2
          px-5
          py-2
          rounded-full
          font-medium
          transition

          ${
            liked
              ? "bg-[#355E3B] text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }
          `}
        >

          <FaThumbsUp />

          Helpful

        </button>

        <span className="text-sm text-gray-500">

          {liked
            ? review.helpful + 1
            : review.helpful}

          {" "}people found this helpful

        </span>

      </div>

    </motion.div>
  );
};

export default ReviewCard;