import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";

import ProductCard from "../product-card/ProductCard";

const ProductSlider = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className="flex items-center justify-center h-[320px] bg-white rounded-2xl border">
        <p className="text-gray-500">
          No Products Found
        </p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[FreeMode]}
      freeMode={true}
      grabCursor={true}
      watchOverflow={true}
      resistance={true}
      resistanceRatio={0.85}
      touchRatio={1}
      simulateTouch={true}
      spaceBetween={8}
      breakpoints={{
        // Mobile
      320: {
  slidesPerView: 2,
  spaceBetween: 6,
},

480: {
  slidesPerView: 2,
  spaceBetween: 6,
},

        // Small Tablet
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },

        // Tablet
        768: {
          slidesPerView: 4,
          spaceBetween: 12,
        },

        // Small Laptop
        1024: {
          slidesPerView: 3,
          spaceBetween: 18,
        },

        // Desktop
        1280: {
          slidesPerView: 4,
          spaceBetween: 20,
        },

        // Large Desktop
        1536: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      className="w-full pb-3 select-none"
    >
      {products.map((product) => (
        <SwiperSlide
          key={product._id || product.id}
          className="h-auto"
        >
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;