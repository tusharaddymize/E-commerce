import Header from "../components/header/Header";
import HeroSlider from "../components/hero/HeroSlider";
import Categories from "../components/categories/Categories";
import ProductGrid from "../components/product-card/ProductGrid";
import FlashDealsSection from "../components/home/FlashDealsSection";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

import useProducts from "../hooks/useProducts";

const Home = () => {
  const {
    products,
    loading,
    hasMore,
    loadMore,
  } = useProducts();

  return (
    <>
      <Header />

      <HeroSlider />

      <Categories />

      {/* ============================= */}
      {/* Flash Deals */}
      {/* ============================= */}

      <FlashDealsSection products={products} />

      {/* ============================= */}
      {/* Featured Products */}
      {/* ============================= */}

      <ProductGrid
        products={products}
        loading={loading}
        hasMore={hasMore}
        loadMore={loadMore}
      />

      <Footer />

      <ScrollToTopButton />
    </>
  );
};

export default Home;