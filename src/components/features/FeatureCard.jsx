import { motion } from "framer-motion";

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#355E3B]/10 flex items-center justify-center group-hover:bg-[#355E3B] transition">

        <Icon
          size={30}
          className="text-[#355E3B] group-hover:text-white transition"
        />

      </div>

      <h3 className="mt-6 text-2xl font-semibold">
        {feature.title}
      </h3>

      <p className="mt-3 text-gray-600 leading-7">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;