import { motion } from "framer-motion";

const BackgroundGlow = () => {
  return (
    <>
      {/* Left Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-green-500/20 blur-[180px]"
      />

      {/* Right Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-lime-400/20 blur-[200px]"
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-emerald-400/15 blur-[220px]"
      />

      {/* Bottom Left */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-10 w-[350px] h-[350px] rounded-full bg-green-300/15 blur-[170px]"
      />

      {/* Bottom Right */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-10 w-[350px] h-[350px] rounded-full bg-lime-300/15 blur-[170px]"
      />
    </>
  );
};

export default BackgroundGlow;