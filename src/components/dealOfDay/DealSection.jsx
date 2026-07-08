import { motion } from "framer-motion";
import Countdown from "./Countdown";
import DealCard from "./DealCard";
import { dealProduct } from "./dealData";

const DealSection = () => {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#355E3B] via-[#44724A] to-[#27452D]" />

      {/* Decorative Blur */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-green-400/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 max-w-[1450px] mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-green-200 text-sm tracking-[3px] uppercase">
            Limited Time Offer
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-bold text-white">
            🔥 Deal of the Day
          </h2>

          <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">
            Grab today's exclusive offer before the countdown ends.
            Premium quality products at unbeatable prices.
          </p>

        </motion.div>

        {/* Countdown */}
        <Countdown endDate={dealProduct.endDate} />

        {/* Product Card */}
        <div className="mt-20">
          <DealCard />
        </div>

      </div>

    </section>
  );
};

export default DealSection;