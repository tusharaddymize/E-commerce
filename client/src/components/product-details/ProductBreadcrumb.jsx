import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import "./styles.css";

import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

import { products } from "../product-card/productData";

const ProductDetails = () => {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const relatedProducts = products.filter(
    (item) => item.id !== Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#f8faf8] min-h-screen py-10"
    >
      <div className="product-container">

        <ProductBreadcrumb />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          <ProductGallery images={product.images} />

          <ProductInfo product={product} />

        </div>

        <ProductTabs
          product={product}
          reviews={[
            {
              id: 1,
              name: "Rahul",
              rating: 5,
              date: "12 July 2026",
              review: "Amazing quality."
            },
            {
              id: 2,
              name: "Priya",
              rating: 4,
              date: "10 July 2026",
              review: "Very comfortable."
            }
          ]}
        />

        <RelatedProducts products={relatedProducts} />

      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-2xl p-4 flex gap-3 z-50">

        <button className="flex-1 h-12 rounded-xl bg-[#355E3B] text-white font-bold">
          Add To Cart
        </button>

        <button className="flex-1 h-12 rounded-xl bg-orange-500 text-white font-bold">
          Buy Now
        </button>

      </div>

    </motion.section>
  );
};

export default ProductDetails;