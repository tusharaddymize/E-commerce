import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import RatingBreakdown from "./RatingBreakdown";
import ReviewCard from "./ReviewCard";

import {
  reviewSummary,
  reviews,
} from "./reviewData";

const Reviews = () => {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(3);

  const filters = [
    "All",
    "5 Star",
    "4 Star",
    "3 Star",
    "2 Star",
    "1 Star",
  ];

  const filteredReviews = useMemo(() => {
    if (filter === "All") return reviews;

    const rating = Number(filter[0]);

    return reviews.filter(
      (item) => item.rating === rating
    );
  }, [filter]);

  return (
    <section className="mt-20">

      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-3xl lg:text-4xl font-black">
          Customer Reviews
        </h2>

        <p className="text-gray-500 mt-3">
          Real reviews from verified customers.
        </p>
      </motion.div>

      {/* Rating Summary */}

      <RatingBreakdown summary={reviewSummary} />

      {/* Filter Buttons */}

      <div className="mt-10 flex gap-3 overflow-x-auto pb-2">

        {filters.map((item) => (

          <button
            key={item}
            onClick={() => {
              setFilter(item);
              setVisible(3);
            }}
            className={`whitespace-nowrap px-5 h-11 rounded-full transition font-medium

              ${
                filter === item
                  ? "bg-[#355E3B] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* Reviews */}

      <div className="mt-10 space-y-6">

        {filteredReviews
          .slice(0, visible)
          .map((review) => (

            <ReviewCard
              key={review.id}
              review={review}
            />

          ))}

      </div>

      {/* Empty State */}

      {filteredReviews.length === 0 && (

        <div className="text-center py-10 text-gray-500">

          No reviews found.

        </div>

      )}

      {/* Load More */}

      {visible < filteredReviews.length && (

        <div className="flex justify-center mt-10">

          <button
            onClick={() => setVisible((prev) => prev + 3)}
            className="px-8 h-12 rounded-xl bg-[#355E3B] text-white font-semibold hover:bg-[#27452d] transition"
          >
            Load More Reviews
          </button>

        </div>

      )}

    </section>
  );
};

export default Reviews;