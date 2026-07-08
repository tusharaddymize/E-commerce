// src/components/header/MegaMenu.jsx

import { motion, AnimatePresence } from "framer-motion";

const MegaMenu = ({ activeMenu }) => {
  if (!activeMenu || !activeMenu.sections) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
        className="absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-2xl z-50"
      >
        <div className="max-w-[1450px] mx-auto px-8 py-10">

          <div
            className={`grid gap-8 ${
              activeMenu.sections.length >= 5
                ? "grid-cols-6"
                : activeMenu.sections.length === 4
                ? "grid-cols-5"
                : "grid-cols-4"
            }`}
          >

            {/* Categories */}
            {activeMenu.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-[#355E3B] font-bold text-lg mb-5">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="cursor-pointer text-gray-600 hover:text-[#355E3B] hover:translate-x-1 transition-all duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Right Side Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-[#355E3B] to-[#27452d] p-8 text-white flex flex-col justify-center">

              <span className="uppercase tracking-[3px] text-green-200 text-sm">
                Special Offer
              </span>

              <h2 className="text-3xl font-bold mt-3">
                Up To 70% OFF
              </h2>

              <p className="mt-4 text-white/80 leading-7">
                Discover the latest fashion, electronics and accessories.
              </p>

              <button className="mt-8 bg-white text-[#355E3B] font-semibold px-6 py-3 rounded-full hover:scale-105 transition">
                Shop Now
              </button>

            </div>

          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MegaMenu;