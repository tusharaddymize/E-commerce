import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { features } from "./featureData";

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-[#f8faf8]">

      <div className="max-w-[1450px] mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="uppercase tracking-[4px] text-[#355E3B] font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Shop With Confidence
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Enjoy premium shopping with fast delivery, secure payment,
            hassle-free returns, and dedicated customer support.
          </p>

        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturesSection;