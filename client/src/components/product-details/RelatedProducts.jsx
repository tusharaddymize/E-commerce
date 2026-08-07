import { motion } from "framer-motion";
import ProductCard from "../product-card/ProductCard";

const RelatedProducts = ({
  products = [],
}) => {
  if (!products.length) return null;

  return (
    <section
      className="
        w-full
        mt-10
        sm:mt-14
        lg:mt-20
      "
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          mb-4
          sm:mb-6
          lg:mb-8
        "
      >
        <div>
          <h2
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl

              font-bold
              text-gray-900
            "
          >
            Related Products
          </h2>

          <p
            className="
              mt-1
              sm:mt-2

              text-xs
              sm:text-sm
              lg:text-base

              text-gray-500
            "
          >
            You may also like these products
          </p>
        </div>
      </div>

      {/* ====================================== */}
      {/* Product Grid */}
      {/* ====================================== */}

      <div
        className="
          grid

          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-3
          xl:grid-cols-4

          gap-2
          sm:gap-3
          md:gap-4
          lg:gap-6

          w-full
        "
      >
        {products.map(
          (product, index) => (
            <motion.div
              key={
                product._id ||
                product.id
              }
              className="
                min-w-0
                w-full
              "
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay:
                  Math.min(index, 4) *
                  0.08,
                duration: 0.4,
              }}
            >
              <ProductCard
                product={product}
              />
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;