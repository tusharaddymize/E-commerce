import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaStar,
  FaCheckCircle,
  FaThumbsUp,
  FaUser,
} from "react-icons/fa";

import {
  toggleReviewHelpful,
} from "../../services/reviewService";

import {
  useAuthContext,
} from "../../context/AuthContext";

const ReviewCard = ({ review }) => {
  // ==========================================
  // Auth
  // ==========================================

  const {
    user,
    isAuthenticated,
  } = useAuthContext();

  // ==========================================
  // Safe Review Data
  // ==========================================

  const reviewer =
    review?.user || {};

  const reviewerName =
    reviewer?.name ||
    "Customer";

  const reviewerAvatar =
    reviewer?.avatar || "";

  const images =
    Array.isArray(review?.images)
      ? review.images
      : [];

  const helpfulUsers =
    Array.isArray(review?.helpfulUsers)
      ? review.helpfulUsers
      : [];

  // ==========================================
  // Check If Current User Already Liked
  // ==========================================

  const initiallyLiked =
    !!user?._id &&
    helpfulUsers.some((item) => {
      const id =
        typeof item === "object"
          ? item?._id
          : item;

      return (
        String(id) ===
        String(user._id)
      );
    });

  // ==========================================
  // Helpful State
  // ==========================================

  const [liked, setLiked] =
    useState(initiallyLiked);

  const [
    helpfulCount,
    setHelpfulCount,
  ] = useState(
    Number(
      review?.helpfulCount || 0
    )
  );

  const [
    helpfulLoading,
    setHelpfulLoading,
  ] = useState(false);

  const [
    helpfulError,
    setHelpfulError,
  ] = useState("");

  // ==========================================
  // Date
  // ==========================================

  const formattedDate =
    review?.createdAt
      ? new Date(
          review.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "";

  // ==========================================
  // Helpful
  // ==========================================

  const handleHelpful = async () => {
    setHelpfulError("");

    if (!isAuthenticated) {
      setHelpfulError(
        "Please login to mark this review as helpful."
      );

      return;
    }

    if (
      !review?._id ||
      helpfulLoading
    ) {
      return;
    }

    try {
      setHelpfulLoading(true);

      const data =
        await toggleReviewHelpful(
          review._id
        );

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Unable to update review."
        );
      }

      setLiked(
        Boolean(data.helpful)
      );

      setHelpfulCount(
        Number(
          data.helpfulCount || 0
        )
      );
    } catch (error) {
      console.error(
        "Helpful Review Error:",
        error
      );

      setHelpfulError(
        error.response?.data
          ?.message ||
          error.message ||
          "Unable to update review."
      );
    } finally {
      setHelpfulLoading(false);
    }
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        w-full

        rounded-2xl

        border
        border-gray-200

        bg-white

        p-4
        sm:p-5
        lg:p-6

        shadow-sm

        transition-shadow
        duration-300

        hover:shadow-md
      "
    >
      {/* ======================================
          Header
      ====================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-3
          sm:gap-4
        "
      >
        {/* User */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            sm:gap-4
          "
        >
          {/* Avatar */}

          {reviewerAvatar ? (
            <img
              src={reviewerAvatar}
              alt={reviewerName}
              className="
                h-11
                w-11
                sm:h-14
                sm:w-14

                shrink-0

                rounded-full

                border-2
                border-[var(--color-primary,#355E3B)]

                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-11
                w-11
                sm:h-14
                sm:w-14

                shrink-0

                items-center
                justify-center

                rounded-full

                border-2
                border-[var(--color-primary,#355E3B)]

                bg-gray-100

                text-gray-400
              "
            >
              <FaUser />
            </div>
          )}

          {/* User Information */}

          <div className="min-w-0">
            <h3
              className="
                truncate

                text-sm
                sm:text-base
                lg:text-lg

                font-bold

                text-gray-900
              "
            >
              {reviewerName}
            </h3>

            {/* Verified Purchase */}

            {review?.verifiedPurchase && (
              <div
                className="
                  mt-1

                  flex
                  items-center
                  gap-1.5

                  text-xs
                  sm:text-sm

                  font-medium

                  text-[var(--color-primary,#355E3B)]
                "
              >
                <FaCheckCircle />

                <span>
                  Verified Purchase
                </span>
              </div>
            )}

            {formattedDate && (
              <p
                className="
                  mt-1

                  text-xs

                  text-gray-400
                "
              >
                {formattedDate}
              </p>
            )}
          </div>
        </div>

        {/* ==================================
            Rating Badge
        ================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5

            rounded-full

            bg-[var(--color-primary,#355E3B)]

            px-2.5
            py-1
            sm:px-3

            text-xs
            sm:text-sm

            font-semibold

            text-white
          "
        >
          <FaStar className="text-yellow-300" />

          {Number(
            review?.rating || 0
          ).toFixed(1)}
        </div>
      </div>

      {/* ======================================
          Title
      ====================================== */}

      {review?.title && (
        <h4
          className="
            mt-5
            sm:mt-6

            text-base
            sm:text-lg
            lg:text-xl

            font-bold

            text-gray-900
          "
        >
          {review.title}
        </h4>
      )}

      {/* ======================================
          Comment
      ====================================== */}

      {review?.comment && (
        <p
          className="
            mt-2
            sm:mt-3

            whitespace-pre-line

            text-sm
            sm:text-base

            leading-6
            sm:leading-7

            text-gray-600

            break-words
          "
        >
          {review.comment}
        </p>
      )}

      {/* ======================================
          Review Images
      ====================================== */}

      {images.length > 0 && (
        <div
          className="
            mt-5

            flex
            gap-3

            overflow-x-auto

            pb-1
          "
        >
          {images.map(
            (image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`Review ${index + 1}`}
                loading="lazy"
                className="
                  h-20
                  w-20
                  sm:h-24
                  sm:w-24

                  shrink-0

                  rounded-xl

                  border
                  border-gray-200

                  object-cover
                "
              />
            )
          )}
        </div>
      )}

      {/* ======================================
          Footer
      ====================================== */}

      <div
        className="
          mt-5
          sm:mt-6

          flex
          flex-col
          sm:flex-row

          sm:items-center
          sm:justify-between

          gap-3
        "
      >
        <button
          type="button"
          disabled={
            helpfulLoading
          }
          onClick={
            handleHelpful
          }
          className={`
            flex
            w-fit
            items-center
            gap-2

            rounded-full

            px-4
            py-2

            text-sm
            font-medium

            transition

            disabled:cursor-not-allowed
            disabled:opacity-60

            ${
              liked
                ? "bg-[var(--color-primary,#355E3B)] text-white"
                : "bg-gray-100 text-gray-700 hover:text-[var(--color-primary,#355E3B)]"
            }
          `}
        >
          <FaThumbsUp />

          {helpfulLoading
            ? "Updating..."
            : "Helpful"}
        </button>

        <span
          className="
            text-xs
            sm:text-sm

            text-gray-500
          "
        >
          {helpfulCount}{" "}
          {helpfulCount === 1
            ? "person"
            : "people"}{" "}
          found this helpful
        </span>
      </div>

      {/* Helpful Error */}

      {helpfulError && (
        <p
          className="
            mt-3

            text-xs

            text-red-500
          "
        >
          {helpfulError}
        </p>
      )}
    </motion.article>
  );
};

export default ReviewCard;