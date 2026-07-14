import { motion } from "framer-motion";
import ProductCard from "../product-card/ProductCard";

const RelatedProducts = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <section className="mt-20">

      {/* Heading */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold">

            Related Products

          </h2>

          <p className="text-gray-500 mt-2">

            You may also like these products

          </p>

        </div>

      </div>

      {/* Products */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6
        "
      >

        {products.map((product, index) => (

          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }}
          >

            <ProductCard
              product={product}
            />

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;