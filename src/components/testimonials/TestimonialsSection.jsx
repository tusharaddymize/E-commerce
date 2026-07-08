import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./testimonialData";

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#f8faf8]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center"
        >
          <span className="text-[#355E3B] font-semibold uppercase tracking-[4px]">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold mt-4">
            What Our Customers Say
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Thousands of happy customers trust our products.
            Here's what they have to say about their shopping experience.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="mt-20 relative">

          <AnimatePresence mode="wait">

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -120 }}
              transition={{ duration: .5 }}
            >
              <TestimonialCard
                testimonial={testimonials[current]}
              />
            </motion.div>

          </AnimatePresence>

          {/* Buttons */}

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#355E3B] hover:text-white transition"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 translate-x-14 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#355E3B] hover:text-white transition"
          >
            <FaArrowRight />
          </button>

        </div>

        {/* Dots */}

        <div className="flex justify-center gap-3 mt-10">

          {testimonials.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index
                  ? "bg-[#355E3B] w-8"
                  : "bg-gray-300"
              }`}
            />

          ))}

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;