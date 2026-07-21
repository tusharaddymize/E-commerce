import {
  FaTshirt,
  FaPalette,
  FaRulerCombined,
  FaLeaf,
  FaTag,
  FaGlobeAsia,
  FaHandSparkles,
  FaGem,
} from "react-icons/fa";

const ProductHighlights = ({ product }) => {
  return (
    <section className="mt-14">

      {/* Heading */}

      <h2 className="text-2xl sm:text-3xl font-bold mb-8">
        Product Highlights
      </h2>

      {/* Grid */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
        "
      >

        {/* Fabric */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaTshirt className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Fabric</p>
          <h3 className="font-bold mt-1">
            {product.fabric || "Cotton"}
          </h3>
        </div>

        {/* Color */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaPalette className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Color</p>
          <h3 className="font-bold mt-1">
            {product.color || "Green"}
          </h3>
        </div>

        {/* Fit */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaRulerCombined className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Fit</p>
          <h3 className="font-bold mt-1">
            {product.fit || "Regular Fit"}
          </h3>
        </div>

        {/* Pattern */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaLeaf className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Pattern</p>
          <h3 className="font-bold mt-1">
            {product.pattern || "Printed"}
          </h3>
        </div>

        {/* Occasion */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaTag className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Occasion</p>
          <h3 className="font-bold mt-1">
            {product.occasion || "Casual"}
          </h3>
        </div>

        {/* Country */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaGlobeAsia className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Country of Origin</p>
          <h3 className="font-bold mt-1">
            {product.country || "India"}
          </h3>
        </div>

        {/* Care */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaHandSparkles className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Wash Care</p>
          <h3 className="font-bold mt-1">
            {product.care || "Machine Wash"}
          </h3>
        </div>

        {/* Brand */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition">
          <FaGem className="text-3xl text-[#355E3B] mb-4" />
          <p className="text-gray-500 text-sm">Brand</p>
          <h3 className="font-bold mt-1">
            {product.brand || "Fashion Hub"}
          </h3>
        </div>

      </div>

    </section>
  );
};

export default ProductHighlights;