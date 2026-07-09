import { motion } from "framer-motion";

const leaves = [
  {
    top: "8%",
    left: "8%",
    size: 28,
    duration: 12,
    delay: 0,
  },
  {
    top: "18%",
    left: "88%",
    size: 22,
    duration: 15,
    delay: 2,
  },
  {
    top: "40%",
    left: "15%",
    size: 35,
    duration: 18,
    delay: 1,
  },
  {
    top: "65%",
    left: "90%",
    size: 24,
    duration: 16,
    delay: 3,
  },
  {
    top: "80%",
    left: "30%",
    size: 30,
    duration: 14,
    delay: 2,
  },
];

const FloatingLeaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {leaves.map((leaf, index) => (
        <motion.div
          key={index}
          className="absolute opacity-30"

          style={{
            top: leaf.top,
            left: leaf.left,
          }}

          animate={{
            y: [0, -40, 0],
            x: [0, 25, -15, 0],
            rotate: [0, 18, -18, 0],
          }}

          transition={{
            repeat: Infinity,
            duration: leaf.duration,
            delay: leaf.delay,
            ease: "easeInOut",
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M32 4C16 12 8 26 8 40c0 12 8 20 20 20 16 0 28-16 28-36C56 12 46 6 32 4Z"
              fill="#A7F3D0"
            />

            <path
              d="M20 46C30 36 38 24 44 12"
              stroke="#355E3B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

        </motion.div>
      ))}

    </div>
  );
};

export default FloatingLeaves;