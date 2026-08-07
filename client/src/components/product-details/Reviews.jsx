import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { FaStar } from "react-icons/fa";

import RatingBreakdown from "./RatingBreakdown";
import ReviewCard from "./ReviewCard";

import { useAuthContext } from "../../context/AuthContext";

import {
  createReview,
  getProductReviews,
} from "../../services/reviewService";

const Reviews = ({ product }) => {
  // ==========================================
  // Auth
  // ==========================================

  const {
    user,
    isAuthenticated,
  } = useAuthContext();

  // ==========================================
  // Product ID
  // ==========================================

  const productId =
    product?._id || product?.id;

  // ==========================================
  // Reviews State
  // ==========================================

  const [reviews, setReviews] =
    useState([]);

  const [summary, setSummary] =
    useState({
      average: 0,
      totalReviews: 0,
      ratings: [
        { star: 5, count: 0 },
        { star: 4, count: 0 },
        { star: 3, count: 0 },
        { star: 2, count: 0 },
        { star: 1, count: 0 },
      ],
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // Filter
  // ==========================================

  const [filter, setFilter] =
    useState("All");

  // ==========================================
  // Pagination
  // ==========================================

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // ==========================================
  // Review Form
  // ==========================================

  const [rating, setRating] =
    useState(0);

  const [hoverRating, setHoverRating] =
    useState(0);

  const [title, setTitle] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [formMessage, setFormMessage] =
    useState("");

  const [formError, setFormError] =
    useState("");

  // ==========================================
  // Fetch Reviews
  // ==========================================

  const fetchReviews = useCallback(
    async ({
      requestedPage = 1,
      append = false,
      selectedFilter = filter,
    } = {}) => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const params = {
          page: requestedPage,
          limit: 5,
        };

        if (selectedFilter !== "All") {
          params.rating =
            Number(selectedFilter[0]);
        }

        const data =
          await getProductReviews(
            productId,
            params
          );

        if (!data?.success) {
          throw new Error(
            data?.message ||
              "Unable to load reviews."
          );
        }

        setSummary(
          data.summary || {
            average: 0,
            totalReviews: 0,
            ratings: [],
          }
        );

        const incomingReviews =
          Array.isArray(data.reviews)
            ? data.reviews
            : [];

        setReviews((previous) =>
          append
            ? [
                ...previous,
                ...incomingReviews,
              ]
            : incomingReviews
        );

        setPage(
          Number(data.page || requestedPage)
        );

        setTotalPages(
          Number(data.totalPages || 1)
        );
      } catch (err) {
        console.error(
          "Fetch Reviews Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load reviews."
        );

        if (!append) {
          setReviews([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [productId, filter]
  );

  // ==========================================
  // Initial / Filter Fetch
  // ==========================================

  useEffect(() => {
    if (!productId) return;

    setPage(1);
    setReviews([]);

    fetchReviews({
      requestedPage: 1,
      append: false,
      selectedFilter: filter,
    });
  }, [
    productId,
    filter,
    fetchReviews,
  ]);

  // ==========================================
  // Submit Review
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");
    setFormMessage("");

    if (!isAuthenticated) {
      setFormError(
        "Please login to write a review."
      );
      return;
    }

    if (!rating) {
      setFormError(
        "Please select a rating."
      );
      return;
    }

    if (!title.trim()) {
      setFormError(
        "Please enter a review title."
      );
      return;
    }

    if (!comment.trim()) {
      setFormError(
        "Please write your review."
      );
      return;
    }

    try {
      setSubmitting(true);

      const data = await createReview(
        productId,
        {
          rating,
          title: title.trim(),
          comment: comment.trim(),
        }
      );

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Unable to submit review."
        );
      }

      setFormMessage(
        data.message ||
          "Review submitted successfully."
      );

      // Reset form

      setRating(0);
      setHoverRating(0);
      setTitle("");
      setComment("");

      // Return to All reviews

      setFilter("All");
      setPage(1);

      // Immediately refresh DB reviews

      await fetchReviews({
        requestedPage: 1,
        append: false,
        selectedFilter: "All",
      });
    } catch (err) {
      console.error(
        "Submit Review Error:",
        err
      );

      setFormError(
        err.response?.data?.message ||
          err.message ||
          "Unable to submit review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // Filter Buttons
  // ==========================================

  const filters = [
    "All",
    "5 Star",
    "4 Star",
    "3 Star",
    "2 Star",
    "1 Star",
  ];

  // ==========================================
  // Load More
  // ==========================================

  const handleLoadMore = () => {
    if (
      loading ||
      page >= totalPages
    ) {
      return;
    }

    fetchReviews({
      requestedPage: page + 1,
      append: true,
      selectedFilter: filter,
    });
  };

  return (
    <section className="w-full">
      {/* ======================================
          Review Summary
      ====================================== */}

      <RatingBreakdown
        summary={summary}
      />

      {/* ======================================
          Write Review
      ====================================== */}

      <div
        className="
          mt-8
          max-w-4xl
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          sm:p-6
        "
      >
        <div className="mb-6">
          <h3
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-gray-900
            "
          >
            Write a Review
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Share your experience with this
            product.
          </p>
        </div>

        {!isAuthenticated ? (
          <div
            className="
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-5
              text-sm
              text-gray-600
            "
          >
            Please{" "}
            <a
              href="/login"
              className="
                font-semibold
                text-[var(--color-primary,#355E3B)]
                hover:underline
              "
            >
              login
            </a>{" "}
            to write a review.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* User */}

            {user?.name && (
              <div className="text-sm text-gray-600">
                Reviewing as{" "}
                <span className="font-semibold text-gray-900">
                  {user.name}
                </span>
              </div>
            )}

            {/* Rating */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Your Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(
                  (star) => {
                    const active =
                      star <=
                      (hoverRating ||
                        rating);

                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() =>
                          setHoverRating(
                            star
                          )
                        }
                        onMouseLeave={() =>
                          setHoverRating(0)
                        }
                        onClick={() =>
                          setRating(star)
                        }
                        className="
                          text-2xl
                          sm:text-3xl
                          transition-transform
                          hover:scale-110
                        "
                        aria-label={`${star} star rating`}
                      >
                        <FaStar
                          className={
                            active
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Title */}

            <div>
              <label
                htmlFor="review-title"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Review Title
              </label>

              <input
                id="review-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value
                  )
                }
                maxLength={120}
                placeholder="Give your review a title"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  text-sm
                  outline-none
                  transition

                  focus:border-[var(--color-primary,#355E3B)]
                  focus:ring-2
                  focus:ring-[var(--color-primary,#355E3B)]/10
                "
              />
            </div>

            {/* Comment */}

            <div>
              <label
                htmlFor="review-comment"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Your Review
              </label>

              <textarea
                id="review-comment"
                value={comment}
                onChange={(event) =>
                  setComment(
                    event.target.value
                  )
                }
                maxLength={2000}
                rows={5}
                placeholder="What did you like or dislike about this product?"
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-300
                  p-4
                  text-sm
                  outline-none
                  transition

                  focus:border-[var(--color-primary,#355E3B)]
                  focus:ring-2
                  focus:ring-[var(--color-primary,#355E3B)]/10
                "
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {comment.length}/2000
              </p>
            </div>

            {/* Error */}

            {formError && (
              <div
                className="
                  rounded-lg
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-600
                "
              >
                {formError}
              </div>
            )}

            {/* Success */}

            {formMessage && (
              <div
                className="
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-[var(--color-primary,#355E3B)]
                "
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-primary, #355E3B) 8%, white)",
                }}
              >
                {formMessage}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className="
                h-12
                rounded-xl
                bg-[var(--color-primary,#355E3B)]
                px-7
                font-semibold
                text-white
                transition

                hover:opacity-90

                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {submitting
                ? "Submitting..."
                : "Submit Review"}
            </button>
          </form>
        )}
      </div>

      {/* ======================================
          Filters
      ====================================== */}

      <div
        className="
          mt-8
          flex
          gap-3
          overflow-x-auto
          pb-2
        "
      >
        {filters.map((item) => {
          const active =
            filter === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() =>
                setFilter(item)
              }
              className={`
                h-11
                shrink-0
                rounded-full
                px-5
                text-sm
                font-medium
                transition

                ${
                  active
                    ? "bg-[var(--color-primary,#355E3B)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* ======================================
          Loading
      ====================================== */}

      {loading &&
        reviews.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500">
            Loading reviews...
          </div>
        )}

      {/* ======================================
          API Error
      ====================================== */}

      {error && (
        <div
          className="
            mt-6
            rounded-xl
            bg-red-50
            p-4
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* ======================================
          Review List
      ====================================== */}

      {!loading &&
        !error &&
        reviews.length === 0 && (
          <div
            className="
              mt-8
              max-w-4xl
              rounded-2xl
              border
              border-dashed
              border-gray-300
              px-5
              py-12
              text-center
            "
          >
            <FaStar
              className="
                mx-auto
                mb-3
                text-3xl
                text-gray-300
              "
            />

            <h4 className="font-semibold text-gray-800">
              No reviews yet
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Be the first customer to
              review this product.
            </p>
          </div>
        )}

      {reviews.length > 0 && (
        <div className="mt-8 space-y-5">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))}
        </div>
      )}

      {/* ======================================
          Load More
      ====================================== */}

      {page < totalPages && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            disabled={loading}
            onClick={handleLoadMore}
            className="
              h-12
              rounded-xl
              border
              border-[var(--color-primary,#355E3B)]
              px-7
              font-semibold
              text-[var(--color-primary,#355E3B)]
              transition

              hover:bg-[var(--color-primary,#355E3B)]
              hover:text-white

              disabled:opacity-50
            "
          >
            {loading
              ? "Loading..."
              : "Load More Reviews"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Reviews;