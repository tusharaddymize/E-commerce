import Header from "../components/header/Header";
import HeroSlider from "../components/hero/HeroSlider";
import ProductGrid from "../components/product-card/ProductGrid";
import FlashDealsSection from "../components/home/FlashDealsSection";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

import useProducts from "../hooks/useProducts";
import useWebsiteSettings from "../hooks/useWebsiteSettings";

// ==========================================
// Home Page
// ==========================================

const Home = () => {
  // ==========================================
  // Products
  // ==========================================

  const {
    products,
    loading,
    hasMore,
    loadMore,
  } = useProducts();

  // ==========================================
  // Website Settings
  // React Query
  // ==========================================

  const {
    data,
    isLoading: websiteSettingsLoading,
    isError: websiteSettingsError,
  } = useWebsiteSettings();

  // ==========================================
  // Website Settings Data
  //
  // Service agar direct data return kare:
  // data = settings
  //
  // Agar response.data return kare:
  // data = { data: settings }
  //
  // Dono cases handle kar rahe hain.
  // ==========================================

  const websiteSettings =
    data?.data || data || {};

  // ==========================================
  // Homepage Sections
  // ==========================================

  const sections =
    websiteSettings?.homepageSections || {};

  const showHero =
    sections.hero !== false;

  const showFlashDeals =
    sections.flashDeals !== false;

  const showFeaturedProducts =
    sections.featuredProducts !== false;

  // ==========================================
  // Website Settings Loading
  // ==========================================

  if (websiteSettingsLoading) {
    return (
      <>
        {/* ======================================
            Header / Navbar
        ====================================== */}

        <Header />

        {/* ======================================
            Loading
        ====================================== */}

        <main
          className="
            min-h-[60vh]
            flex
            items-center
            justify-center
            bg-white
          "
        >
          <div className="text-center">

            {/* Spinner */}

            <div
              className="
                w-10
                h-10
                mx-auto

                border-4
                border-[var(--primary-color,#355E3B)]
                border-t-transparent

                rounded-full
                animate-spin
              "
            />

            {/* Loading Text */}

            <p
              className="
                mt-4
                text-gray-600
                font-medium
              "
            >
              Loading...
            </p>

          </div>
        </main>

        {/* ======================================
            Footer
        ====================================== */}

        <Footer />
      </>
    );
  }

  // ==========================================
  // Website Settings Error
  // ==========================================

  if (websiteSettingsError) {
    return (
      <>
        {/* Header */}

        <Header />

        {/* Error */}

        <main
          className="
            min-h-[60vh]
            flex
            items-center
            justify-center
            bg-white
            px-4
          "
        >
          <div className="text-center">

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >
              Something went wrong
            </h2>

            <p
              className="
                mt-2
                text-gray-500
              "
            >
              Unable to load website settings.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-5
                rounded-lg
                px-6
                py-3
                text-white
                font-semibold
                transition
                hover:opacity-90
              "
              style={{
                backgroundColor:
                  "var(--primary-color,#355E3B)",
              }}
            >
              Try Again
            </button>

          </div>
        </main>

        {/* Footer */}

        <Footer />
      </>
    );
  }

  // ==========================================
  // Main Home Page
  // ==========================================

  return (
    <>
      {/* ======================================
          Header / Navbar
      ====================================== */}

      <Header />

      {/* ======================================
          Main Content
      ====================================== */}

      <main
        className="
          w-full
          bg-white
        "
      >

        {/* ======================================
            Hero Section
        ====================================== */}

        {showHero && (
          <HeroSlider />
        )}

        {/* ======================================
            Flash Deals / Explore Products
        ====================================== */}

        {showFlashDeals && (
          <FlashDealsSection
            products={products}
          />
        )}

        {/* ======================================
            Featured Products
        ====================================== */}

        {showFeaturedProducts && (
          <ProductGrid
            products={products}
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
          />
        )}

      </main>

      {/* ======================================
          Footer
      ====================================== */}

      <Footer />

      {/* ======================================
          Scroll To Top
      ====================================== */}

      <ScrollToTopButton />
    </>
  );
};

export default Home;