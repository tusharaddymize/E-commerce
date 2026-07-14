// import { motion } from "framer-motion";
// import { useParams } from "react-router-dom";

// import "./styles.css";

// import ProductBreadcrumb from "./ProductBreadcrumb";
// import ProductGallery from "./ProductGallery";
// import ProductInfo from "./ProductInfo";
// import ProductHighlights from "./ProductHighlights";
// import ProductTabs from "./ProductTabs";
// import DeliverySection from "./DeliverySection";
// import SellerSection from "./SellerSection";
// import RelatedProducts from "./RelatedProducts";

// import { products } from "../product-card/productData";

// const ProductDetails = () => {
//   const { id } = useParams();

//   const product = products.find(
//     (item) => item.id === Number(id)
//   );

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h1 className="text-3xl font-bold">
//           Product Not Found
//         </h1>
//       </div>
//     );
//   }

//   // Same category products
//   const relatedProducts = products.filter(
//     (item) =>
//       item.id !== product.id &&
//       item.brand === product.brand
//   );

//   return (
//     <motion.section
//       initial={{
//         opacity: 0,
//         y: 30,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       transition={{
//         duration: 0.5,
//       }}
//       className="bg-[#f8faf8] min-h-screen pb-24"
//     >
//       <div className="product-container">

//         {/* Breadcrumb */}

//         <ProductBreadcrumb
//           product={product}
//         />

//         {/* Product */}

//         <div
//           className="
//           mt-10
//           grid
//           grid-cols-1
//           lg:grid-cols-2
//           gap-12
//           items-start
//           "
//         >

//           <ProductGallery
//             images={
//               product.images || [product.image]
//             }
//           />

//           <ProductInfo
//             product={product}
//           />

//         </div>

//         {/* Highlights */}

//         <ProductHighlights
//           product={product}
//         />

//         {/* Tabs */}

//         <ProductTabs
//           product={product}
//         />

//         {/* Delivery */}

//         <DeliverySection />

//         {/* Seller */}

//         <SellerSection
//           product={product}
//         />

//         {/* Related Products */}

//         <RelatedProducts
//           products={relatedProducts}
//         />

//       </div>

//       {/* Mobile Bottom Buttons */}

//       <div
//         className="
//         fixed
//         bottom-0
//         left-0
//         right-0
//         lg:hidden
//         bg-white
//         border-t
//         p-4
//         flex
//         gap-3
//         z-50
//         "
//       >

//         <button
//           className="
//           flex-1
//           h-12
//           rounded-xl
//           bg-[#355E3B]
//           text-white
//           font-bold
//           "
//         >
//           Add To Cart
//         </button>

//         <button
//           className="
//           flex-1
//           h-12
//           rounded-xl
//           bg-orange-500
//           text-white
//           font-bold
//           "
//         >
//           Buy Now
//         </button>

//       </div>

//     </motion.section>
//   );
// };

// export default ProductDetails;



import { useParams } from "react-router-dom";
import { products } from "../product-card/productData";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductHighlights from "./ProductHighlights";
import ProductTabs from "./ProductTabs";
import DeliverySection from "./DeliverySection";
import SellerSection from "./SellerSection";
 import RelatedProducts from "./RelatedProducts";

import { bestSellingProducts } from "../best-selling/bestSellingData";

const ProductDetails = () => {
  const { id } = useParams();

const allProducts = [
  ...products,
  ...bestSellingProducts,
];

const product = allProducts.find(
  (item) => item.id === Number(id)
);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

const relatedProducts = allProducts.filter(
  (item) =>
    item.id !== product.id &&
    item.brand === product.brand
);

  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
        <ProductHighlights product={product} />
        <ProductTabs product={product} />
        <DeliverySection />
        <SellerSection product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;