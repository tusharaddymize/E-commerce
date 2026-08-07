import { useEffect, useState } from "react";

import Header from "../components/header/Header";
import HeroSlider from "../components/hero/HeroSlider";
// import Categories from "../components/categories/Categories";
import ProductGrid from "../components/product-card/ProductGrid";
import FlashDealsSection from "../components/home/FlashDealsSection";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

import useProducts from "../hooks/useProducts";
import { getWebsiteSettings } from "../services/websiteSettingService";

const Home = () => {
  const {
    products,
    loading,
    hasMore,
    loadMore,
  } = useProducts();

  // ==========================================
  // Website Settings
  // ==========================================

  const [
    websiteSettings,
    setWebsiteSettings,
  ] = useState(null);

  const [
    settingsLoading,
    setSettingsLoading,
  ] = useState(true);

  // ==========================================
  // Fetch Website Settings
  // ==========================================

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setSettingsLoading(true);

        const response =
          await getWebsiteSettings();

        // Supports:
        // { success: true, data: {...} }
        // OR direct settings object

        const data =
          response?.data || response;

        setWebsiteSettings(data);
      } catch (error) {
        console.error(
          "Failed to load website settings:",
          error
        );
      } finally {
        setSettingsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ==========================================
  // Homepage Sections
  // ==========================================

  const sections =
    websiteSettings?.homepageSections ||
    {};

  const showHero =
    sections.hero !== false;


  const showFlashDeals =
    sections.flashDeals !== false;

  const showFeaturedProducts =
    sections.featuredProducts !== false;

  // ==========================================
  // Settings Loading
  // ==========================================

  if (settingsLoading) {
    return (
      <>
        <Header />

        <div
          className="
            min-h-[60vh]

            flex
            items-center
            justify-center
          "
        >
          <div className="text-center">

            {/* Loading Spinner */}

            <div
              className="
                w-10
                h-10

                mx-auto

                border-4
                border-[var(--primary-color)]
                border-t-transparent

                rounded-full

                animate-spin
              "
            />

            <p className="mt-4 text-gray-500">
              Loading...
            </p>

          </div>
        </div>

        <Footer />
      </>
    );
  }

  // ==========================================
  // Home Page
  // ==========================================

  return (
    <>
      <Header />

      {/* ====================================== */}
      {/* Hero Section */}
      {/* ====================================== */}

      {showHero && (
        <HeroSlider />
      )}

      {/* ====================================== */}
      {/* Flash Deals / Explore Products */}
      {/* ====================================== */}

      {showFlashDeals && (
        <FlashDealsSection
          products={products}
        />
      )}

      {/* ====================================== */}
      {/* Featured Products */}
      {/* ====================================== */}

      {showFeaturedProducts && (
        <ProductGrid
          products={products}
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      )}

      {/* ====================================== */}
      {/* Footer */}
      {/* ====================================== */}

      <Footer />

      {/* ====================================== */}
      {/* Scroll To Top */}
      {/* ====================================== */}

      <ScrollToTopButton />
    </>
  );
};

export default Home;