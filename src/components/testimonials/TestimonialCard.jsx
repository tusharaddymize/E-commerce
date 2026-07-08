import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-[#355E3B]/10 text-6xl">
        <FaQuoteLeft />
      </div>

      {/* Customer */}
      <div className="flex items-center gap-4">

        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover border-4 border-[#355E3B]/10"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {testimonial.name}
          </h3>

          <div className="flex items-center gap-1 text-[#355E3B] text-sm">
            <FaCheckCircle />
            <span>{testimonial.designation}</span>
          </div>
        </div>

      </div>

      {/* Rating */}
      <div className="flex gap-1 mt-5">
        {[...Array(testimonial.rating)].map((_, index) => (
          <FaStar
            key={index}
            className="text-yellow-400 text-lg"
          />
        ))}
      </div>

      {/* Review */}
      <p className="mt-5 text-gray-600 leading-8">
        "{testimonial.review}"
      </p>
    </motion.div>
  );
};

export default TestimonialCard;