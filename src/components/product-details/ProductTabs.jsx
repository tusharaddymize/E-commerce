import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reviews from "./Reviews";

const ProductTabs = ({ product }) => {

  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    "description",
    "specifications",
    "reviews",
  ];

  return (

    <section className="mt-20">

      {/* Tabs */}

      <div className="flex flex-wrap gap-3 border-b pb-4">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-semibold transition

            ${
              activeTab === tab
                ? "bg-[#355E3B] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >

            {tab.charAt(0).toUpperCase() + tab.slice(1)}

          </button>

        ))}

      </div>

      <AnimatePresence mode="wait">

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.35 }}
          className="mt-10"
        >

          {/* Description */}

          {activeTab === "description" && (

            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-2xl font-bold mb-6">

                Product Description

              </h2>

              <p className="text-gray-600 leading-8">

                {product.description}

              </p>

            </div>

          )}

          {/* Specifications */}

          {activeTab === "specifications" && (

            <div className="bg-white rounded-3xl shadow-md overflow-hidden">

              {product.specifications?.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center px-6 py-5 border-b last:border-none"
                >

                  <span className="font-semibold">

                    {item.title}

                  </span>

                  <span className="text-gray-600">

                    {item.value}

                  </span>

                </div>

              ))}

            </div>

          )}

          {/* Reviews */}

          {activeTab === "reviews" && (

            <Reviews />

          )}

        </motion.div>

      </AnimatePresence>

    </section>

  );

};

export default ProductTabs;