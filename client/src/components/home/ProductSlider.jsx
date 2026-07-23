import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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
      modules={[Navigation]}
      navigation
      spaceBetween={20}
      breakpoints={{
        320: {
          slidesPerView: 1.2,
        },

        480: {
          slidesPerView: 2,
        },

        640: {
          slidesPerView: 2.3,
        },

        768: {
          slidesPerView: 2.7,
        },

        1024: {
          slidesPerView: 3,
        },

        1280: {
          slidesPerView: 4,
        },

        1536: {
          slidesPerView: 5,
        },
      }}
    className="w-full pb-3"
    >
      {products.map((product) => (
        <SwiperSlide
          key={product._id || product.id}
          className="py-2"
        >
          <ProductCard
            product={product}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;