import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import FlashDealCard from "./FlashDealCard";
import ProductTabs from "./ProductTabs";
import ProductSlider from "./ProductSlider";

import { getFlashDeal } from "../../services/flashDealService";

const FlashDealsSection = ({ products = [] }) => {
  const [activeTab, setActiveTab] = useState("trending");

  const [flashDeal, setFlashDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Flash Deal
  // ==========================================

  useEffect(() => {
    const fetchFlashDeal = async () => {
      try {
        setLoading(true);

        const response = await getFlashDeal();

        if (response.success) {
          setFlashDeal(response.flashDeal);
        }
      } catch (error) {
        console.error("Flash Deal Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashDeal();
  }, []);

  // ==========================================
  // Filter Products
  // ==========================================

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "trending":
        return products.filter((item) => item.isTrending);

      case "featured":
        return products.filter((item) => item.isFeatured);

      case "new":
        return products.filter((item) => item.isNewArrival);

      case "best":
        return products.filter((item) => item.isBestSelling);

      default:
        return [];
    }
  }, [activeTab, products]);

  // ==========================================
  // Don't show section until loaded
  // ==========================================

  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse rounded-3xl h-72 bg-gray-200"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-green-50 to-white">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col xl:flex-row gap-8">

          {/* ================================= */}
          {/* Flash Deal Card */}
          {/* ================================= */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full xl:w-[320px] shrink-0"
          >
            <FlashDealCard flashDeal={flashDeal} />
          </motion.div>

          {/* ================================= */}
          {/* Products */}
          {/* ================================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 min-w-0"
          >
            <div className="flex flex-col gap-6">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                  <h2 className="text-3xl font-bold text-gray-900">
                    Explore Products
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Discover our latest collections curated just for you.
                  </p>

                </div>

                <ProductTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

              </div>

              <div className="w-full overflow-hidden">
                <ProductSlider
                  products={filteredProducts}
                />
              </div>

            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default FlashDealsSection;