import Header from "../components/header/Header";
import HeroSlider from "../components/hero/HeroSlider";
import Categories from "../components/categories/Categories";
import ProductGrid from "../components/product-card/ProductGrid";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const Home = () => {
  return (
    <>
      <Header />

      <HeroSlider />

      <Categories />

      <ProductGrid />

      <Footer />

      <ScrollToTopButton />
    </>
  );
};

export default Home;