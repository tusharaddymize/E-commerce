import { motion } from "framer-motion";

const particles = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  size: Math.random() * 8 + 4,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 8 + 8,
  delay: Math.random() * 5,
}));

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {particles.map((particle) => (

        <motion.span
          key={particle.id}
          className="absolute rounded-full"

          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background:
              "radial-gradient(circle,#ffffff,#86efac)",
            boxShadow:
              "0 0 18px rgba(134,239,172,.8)",
          }}

          animate={{
            y: [0, -60, 0],
            x: [0, 25, -25, 0],
            opacity: [.25, 1, .25],
            scale: [1, 1.5, 1],
          }}

          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut",
          }}

        />

      ))}

    </div>
  );
};

export default FloatingParticles;