import Header from "./components/header/Header";
import HeroVideo from "./components/video/HeroVideo";
import HeroSlider from "./components/hero/HeroSlider";
import Categories from "./components/categories/Categories";
import ProductGrid from "./components/product-card/ProductGrid";
import OffersSection from "./components/offers/OffersSection";
import BestSellingSection from "./components/best-selling/BestSellingSection";
import NewArrivalsSection from "./components/new-arrivals/NewArrivalsSection";
import DealSection from "./components/dealOfDay/DealSection";
import TestimonialsSection from "./components/testimonials/TestimonialsSection";
import NewsletterSection from "./components/newsletter/NewsletterSection";
import FeaturesSection from "./components/features/FeaturesSection";
import Footer from "./components/footer/Footer";
function App() {
  return (
    <>
      <Header />

<HeroVideo />

      <HeroSlider />

      <Categories />

      <ProductGrid />

      <OffersSection />

      <BestSellingSection />

      <NewArrivalsSection />

      <DealSection />

      <TestimonialsSection />

      <NewsletterSection />

         {/* Features */}
      <FeaturesSection />



      <Footer />

    </>
  );
}

export default App;