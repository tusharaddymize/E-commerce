import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getProductById,
  getProducts,
} from "../../services/productService";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import RecentlyViewed from "./RecentlyViewed";

const ProductDetails = () => {
  const { id } = useParams();

  // ==========================================
  // States
  // ==========================================

  const [
    product,
    setProduct,
  ] = useState(null);

  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================
  // Load Product
  // ==========================================

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      // ========================================
      // Current Product
      // ========================================

      const data =
        await getProductById(id);

      const currentProduct =
        data?.product;

      if (!currentProduct) {
        throw new Error(
          "Product not found"
        );
      }

      setProduct(
        currentProduct
      );

      // ========================================
      // Related Products
      // ========================================

      const related =
        await getProducts({
          category:
            currentProduct
              ?.category?._id,

          menuGroup:
            currentProduct
              ?.menuGroup?._id,

          subCategory:
            currentProduct
              ?.subCategory?._id,

          limit: 8,
        });

      const products = (
        related?.products || []
      ).filter(
        (item) =>
          item?._id !==
          currentProduct?._id
      );

      // ========================================
      // Sort Related Products
      // ========================================

      products.sort(
        (a, b) => {
          const aScore =
            (a?.subCategory
              ?._id ===
            currentProduct
              ?.subCategory?._id
              ? 3
              : 0) +
            (a?.menuGroup
              ?._id ===
            currentProduct
              ?.menuGroup?._id
              ? 2
              : 0) +
            (a?.category
              ?._id ===
            currentProduct
              ?.category?._id
              ? 1
              : 0);

          const bScore =
            (b?.subCategory
              ?._id ===
            currentProduct
              ?.subCategory?._id
              ? 3
              : 0) +
            (b?.menuGroup
              ?._id ===
            currentProduct
              ?.menuGroup?._id
              ? 2
              : 0) +
            (b?.category
              ?._id ===
            currentProduct
              ?.category?._id
              ? 1
              : 0);

          return (
            bScore - aScore
          );
        }
      );

      setRelatedProducts(
        products.slice(0, 8)
      );
    } catch (err) {
      console.error(
        "Product load error:",
        err
      );

      setError(
        "Product not found."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================
if (loading) {
  return (
    <>
      <Header />

      <div
        className="
          w-full
          max-w-[1440px]
          mx-auto

          min-h-[60vh]

          px-4
          sm:px-5
          lg:px-8

          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div
          className="
            w-10
            h-10

            border-4
            border-[var(--color-primary,#355E3B)]
            border-t-transparent

            rounded-full

            animate-spin
          "
        />

        <p
          className="
            mt-4

            text-sm
            sm:text-base

            font-medium

            text-gray-500
          "
        >
          Loading Product...
        </p>
      </div>
    </>
  );
}

  // ==========================================
  // Error
  // ==========================================

if (error || !product) {
  return (
    <>
      <Header />

      <div
        className="
          w-full
          max-w-[1440px]
          mx-auto

          min-h-[60vh]

          px-4
          sm:px-5
          lg:px-8

          flex
          flex-col
          items-center
          justify-center

          text-center
        "
      >
        <h2
          className="
            text-2xl
            sm:text-3xl

            font-bold

            text-gray-900
          "
        >
          Product Not Found
        </h2>

        <p
          className="
            mt-3

            text-sm
            sm:text-base

            text-gray-500
          "
        >
          This product doesn't exist or may have been removed.
        </p>

        <Link
          to="/"
          className="
            mt-6

            inline-flex
            items-center
            justify-center

            px-5
            py-2.5

            rounded-lg

            bg-[var(--color-primary,#355E3B)]

            text-white
            text-sm
            font-semibold

            hover:opacity-90

            transition
          "
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

  // ==========================================
  // Product Images
  // Main Thumbnail + Maximum 4 Images
  // ==========================================

  const productImages = [
    product?.thumbnail ||
      product?.image,

    ...(Array.isArray(
      product?.images
    )
      ? product.images
      : []),
  ]
    .filter(Boolean)
    .filter(
      (image, index, array) =>
        array.indexOf(image) ===
        index
    )
    .slice(0, 5);

  // ==========================================
  // Product Details
  // ==========================================

return (
  <>
    <Header />

    <main
      className="
        w-full
        bg-white
      "
    >
      {/* ======================================
          MAIN CONTAINER
      ====================================== */}

      <div
        className="
          w-full
          max-w-[1440px]
          mx-auto

          px-3
          sm:px-5
          lg:px-8
          xl:px-10

          pt-4
          sm:pt-5
          lg:pt-6

          pb-10
          sm:pb-14
          lg:pb-16
        "
      >
        {/* ====================================
            BREADCRUMB
        ==================================== */}

        <nav
          className="
            mb-4
            sm:mb-5

            overflow-hidden
          "
          aria-label="Breadcrumb"
        >
          <div
            className="
              flex
              items-center

              gap-1.5

              overflow-x-auto

              whitespace-nowrap

              scrollbar-hide

              text-xs
              sm:text-sm

              text-gray-500

              pb-1
            "
          >
            {/* Home */}

            <Link
              to="/"
              className="
                shrink-0

                hover:text-[var(--color-primary,#355E3B)]

                transition
              "
            >
              Home
            </Link>

            {/* Category */}

            {product?.category && (
              <>
                <span
                  className="
                    shrink-0
                    text-gray-300
                  "
                >
                  /
                </span>

                <Link
                  to={`/category/${product.category.slug}`}
                  className="
                    shrink-0

                    hover:text-[var(--color-primary,#355E3B)]

                    transition
                  "
                >
                  {
                    product
                      .category
                      .name
                  }
                </Link>
              </>
            )}

            {/* Menu Group */}

            {product
              ?.menuGroup && (
              <>
                <span
                  className="
                    shrink-0
                    text-gray-300
                  "
                >
                  /
                </span>

                <Link
                  to={`/category/${product?.category?.slug}/${product.menuGroup.slug}`}
                  className="
                    shrink-0

                    hover:text-[var(--color-primary,#355E3B)]

                    transition
                  "
                >
                  {
                    product
                      .menuGroup
                      .name
                  }
                </Link>
              </>
            )}

            {/* Sub Category */}

            {product
              ?.subCategory && (
              <>
                <span
                  className="
                    shrink-0
                    text-gray-300
                  "
                >
                  /
                </span>

                <Link
                  to={`/category/${product?.category?.slug}/${product?.menuGroup?.slug}/${product.subCategory.slug}`}
                  className="
                    shrink-0

                    hover:text-[var(--color-primary,#355E3B)]

                    transition
                  "
                >
                  {
                    product
                      .subCategory
                      .name
                  }
                </Link>
              </>
            )}

            {/* Current Product */}

            <span
              className="
                shrink-0
                text-gray-300
              "
            >
              /
            </span>

            <span
              className="
                max-w-[180px]
                sm:max-w-[300px]
                lg:max-w-[450px]

                overflow-hidden
                text-ellipsis

                font-medium

                text-gray-700
              "
            >
              {product.title}
            </span>
          </div>
        </nav>

        {/* ====================================
            PRODUCT TOP SECTION
        ==================================== */}

        <section
          className="
            grid
            grid-cols-1

            lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]

            xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]

            gap-6
            sm:gap-8
            lg:gap-10
            xl:gap-14

            items-start
          "
        >
          {/* ==================================
              LEFT - PRODUCT GALLERY
          ================================== */}

          <div
            className="
              w-full
              min-w-0

              lg:sticky
              lg:top-24

              self-start
            "
          >
            <ProductGallery
              images={
                productImages
              }
            />
          </div>

          {/* ==================================
              RIGHT - PRODUCT INFO
          ================================== */}

          <div
            className="
              w-full
              min-w-0
            "
          >
            <ProductInfo
              product={product}
            />
          </div>
        </section>

        {/* ====================================
            PRODUCT DETAILS / TABS
        ==================================== */}

        <section
          className="
            mt-10
            sm:mt-12
            lg:mt-16

            border-t
            border-gray-200

            pt-8
            sm:pt-10
          "
        >
          <ProductTabs
            product={product}
          />
        </section>

        {/* ====================================
            RELATED PRODUCTS
        ==================================== */}

        {relatedProducts.length >
          0 && (
          <section
            className="
              mt-12
              sm:mt-16
              lg:mt-20
            "
          >
            <RelatedProducts
              products={
                relatedProducts
              }
            />
          </section>
        )}

        {/* ====================================
            RECENTLY VIEWED
        ==================================== */}

        <section
          className="
            mt-12
            sm:mt-16
            lg:mt-20
          "
        >
          <RecentlyViewed
            currentProduct={
              product
            }
          />
        </section>
      </div>
    </main>
      <Footer />
  </>
);
};

export default ProductDetails;