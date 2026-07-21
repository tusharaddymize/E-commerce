import { motion } from "framer-motion";

const SettingToggle = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between py-5 border-b">
      <div>
        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onChange}
        className={`w-14 h-8 rounded-full relative transition ${
          enabled
            ? "bg-green-500"
            : "bg-gray-300"
        }`}
      >
        <motion.div
          layout
          className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow"
          animate={{
            x: enabled ? 24 : 0,
          }}
        />
      </motion.button>
    </div>
  );
};

export default SettingToggle;