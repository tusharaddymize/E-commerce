import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById, getProducts } from "../../services/productService";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductHighlights from "./ProductHighlights";
import ProductTabs from "./ProductTabs";
import DeliverySection from "./DeliverySection";
import SellerSection from "./SellerSection";
import RelatedProducts from "./RelatedProducts";
import RecentlyViewed from "./RecentlyViewed";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    loadProduct();

  }, [id]);

  const loadProduct = async () => {

    try {

      setLoading(true);

      const data = await getProductById(id);

      const currentProduct = data.product;

      setProduct(currentProduct);

      // ==========================
      // Related Products
      // ==========================

      const related = await getProducts({
        category: currentProduct.category,
        limit: 8,
      });

      setRelatedProducts(
        related.products.filter(
          (item) => item._id !== currentProduct._id
        )
      );

    } catch (err) {

      console.error(err);

      setError("Product not found.");

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {

    return (
      <div className="max-w-7xl mx-auto py-24 text-center">
        <h2 className="text-3xl font-bold">
          Loading Product...
        </h2>
      </div>
    );

  }

  // ==========================
  // Error
  // ==========================

  if (error || !product) {

    return (
      <div className="max-w-7xl mx-auto py-24 text-center">

        <h2 className="text-4xl font-bold">

          Product Not Found

        </h2>

        <p className="mt-5 text-gray-500">

          This product doesn't exist.

        </p>

      </div>
    );

  }
    return (

    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">

      {/* Top Section */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-12
        items-start
        "
      >

        {/* Product Gallery */}

        <ProductGallery
          images={
            product.images?.length
              ? product.images
              : [
                  product.thumbnail ||
                  product.image
                ]
          }
        />

        {/* Product Info */}

        <ProductInfo
          product={product}
        />

      </div>

      {/* Product Highlights */}

      <div className="mt-14">

        <ProductHighlights
          product={product}
        />

      </div>

      {/* Product Tabs */}

      <div className="mt-14">

        <ProductTabs
          product={product}
        />

      </div>

      {/* Delivery */}

      <div className="mt-14">

        <DeliverySection />

      </div>

      {/* Seller */}

      <div className="mt-14">

        <SellerSection
          product={product}
        />

      </div>

      {/* Related Products */}

      <div className="mt-20">

        <RelatedProducts
          products={relatedProducts}
        />

      </div>

      <RecentlyViewed
          currentProduct={product}
        />

    </div>

  );

};

export default ProductDetails;