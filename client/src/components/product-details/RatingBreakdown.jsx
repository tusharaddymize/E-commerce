import { FaStar } from "react-icons/fa";

const RatingBreakdown = ({ summary }) => {
  // ==========================================
  // Safe Data
  // ==========================================

  const average = Number(summary?.average || 0);

  const totalReviews = Number(
    summary?.totalReviews || 0
  );

  const ratings = Array.isArray(summary?.ratings)
    ? summary.ratings
    : [];

  // ==========================================
  // Get Rating Count
  // ==========================================

  const getCount = (star) => {
    const item = ratings.find(
      (rating) => Number(rating?.star) === star
    );

    return Number(item?.count || 0);
  };

  return (
    <div
      className="
        w-full
        max-w-4xl
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        sm:p-6
        lg:p-8
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-[220px_1fr]
          gap-8
          md:gap-10
          items-center
        "
      >
        {/* ==================================
            Average Rating
        ================================== */}

        <div className="text-center md:border-r md:border-gray-200">
          <div className="flex items-end justify-center gap-1">
            <span
              className="
                text-5xl
                sm:text-6xl
                font-black
                text-gray-900
              "
            >
              {average.toFixed(1)}
            </span>

            <span className="mb-2 text-lg text-gray-400">
              / 5
            </span>
          </div>

          {/* Stars */}

          <div className="mt-4 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={
                  star <= Math.round(average)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }
              />
            ))}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Based on{" "}
            <span
              className="
                font-semibold
                text-[var(--color-primary,#355E3B)]
              "
            >
              {totalReviews}
            </span>{" "}
            reviews
          </p>
        </div>

        {/* ==================================
            Rating Bars
        ================================== */}

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = getCount(star);

            const percentage =
              totalReviews > 0
                ? Math.min(
                    100,
                    (count / totalReviews) * 100
                  )
                : 0;

            return (
              <div
                key={star}
                className="
                  grid
                  grid-cols-[55px_1fr_45px]
                  sm:grid-cols-[65px_1fr_55px]
                  items-center
                  gap-3
                "
              >
                {/* Star */}

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  {star}

                  <FaStar className="text-yellow-400 text-xs" />
                </div>

                {/* Progress */}

                <div
                  className="
                    h-2.5
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-gray-100
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[var(--color-primary,#355E3B)]
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                {/* Count */}

                <span
                  className="
                    text-right
                    text-sm
                    text-gray-500
                  "
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;