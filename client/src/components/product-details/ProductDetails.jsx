import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

// ==========================================
// Layout Components
// ==========================================

import Header from "../header/Header";
import Footer from "../footer/Footer";

// ==========================================
// Product Components
// ==========================================

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import RecentlyViewed from "./RecentlyViewed";

// ==========================================
// React Query Hooks
// ==========================================

import {
  useProductQuery,
  useRelatedProductsQuery,
} from "../../hooks/useProductQueries";

// ==========================================
// Product Details
// ==========================================

const ProductDetails = () => {
  const { id } = useParams();

  // ==========================================
  // Current Product Query
  // ==========================================

  const {
    data: productResponse,
    isLoading: productLoading,
    isFetching: productFetching,
    error: productError,
  } = useProductQuery(id);

  // ==========================================
  // Extract Current Product
  // ==========================================

  const product =
    productResponse?.product ||
    productResponse?.data?.product ||
    null;

  // ==========================================
  // Related Product Parameters
  // ==========================================

  const relatedParams = useMemo(
    () => ({
      category:
        product?.category?._id,

      menuGroup:
        product?.menuGroup?._id,

      subCategory:
        product?.subCategory?._id,

      limit: 8,
    }),
    [
      product?.category?._id,
      product?.menuGroup?._id,
      product?.subCategory?._id,
    ]
  );

  // ==========================================
  // Related Products Query
  // ==========================================

  const {
    data: relatedResponse,
    isLoading: relatedLoading,
  } = useRelatedProductsQuery(
    relatedParams,
    {
      enabled: Boolean(product),
    }
  );

  // ==========================================
  // Extract + Sort Related Products
  // ==========================================

  const relatedProducts = useMemo(() => {
    const currentProductId =
      String(product?._id || "");

    const apiProducts =
      relatedResponse?.products ||
      relatedResponse?.data?.products ||
      [];

    // Remove current product
    const filteredProducts =
      apiProducts.filter(
        (item) =>
          String(item?._id) !==
          currentProductId
      );

    // ========================================
    // Related Product Scoring
    // ========================================

    filteredProducts.sort(
      (a, b) => {
        const aScore =
          (String(
            a?.subCategory?._id || ""
          ) ===
          String(
            product?.subCategory?._id || ""
          )
            ? 3
            : 0) +
          (String(
            a?.menuGroup?._id || ""
          ) ===
          String(
            product?.menuGroup?._id || ""
          )
            ? 2
            : 0) +
          (String(
            a?.category?._id || ""
          ) ===
          String(
            product?.category?._id || ""
          )
            ? 1
            : 0);

        const bScore =
          (String(
            b?.subCategory?._id || ""
          ) ===
          String(
            product?.subCategory?._id || ""
          )
            ? 3
            : 0) +
          (String(
            b?.menuGroup?._id || ""
          ) ===
          String(
            product?.menuGroup?._id || ""
          )
            ? 2
            : 0) +
          (String(
            b?.category?._id || ""
          ) ===
          String(
            product?.category?._id || ""
          )
            ? 1
            : 0);

        return bScore - aScore;
      }
    );

    return filteredProducts.slice(0, 8);
  }, [
    relatedResponse,
    product,
  ]);

  // ==========================================
  // Product Images
  // ==========================================

  const productImages = useMemo(() => {
    return [
      product?.thumbnail,
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
  }, [product]);

  // ==========================================
  // Loading State
  // ==========================================

  if (productLoading) {
    return (
      <>
        <Header />

        <main
          className="
            flex
            min-h-[60vh]
            w-full
            items-center
            justify-center
            bg-white
            px-4
          "
        >
          <div className="text-center">
            {/* Spinner */}

            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-[var(--color-primary,#355E3B)]
                border-t-transparent
              "
            />

            <p
              className="
                mt-4
                text-sm
                font-medium
                text-gray-500
                sm:text-base
              "
            >
              Loading Product...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // Error / Product Not Found
  // ==========================================

  if (
    productError ||
    !product
  ) {
    return (
      <>
        <Header />

        <main
          className="
            flex
            min-h-[60vh]
            w-full
            items-center
            justify-center
            bg-white
            px-4
          "
        >
          <div
            className="
              max-w-lg
              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                sm:text-3xl
              "
            >
              Product Not Found
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-gray-500
                sm:text-base
              "
            >
              This product doesn't
              exist or may have been
              removed.
            </p>

            <Link
              to="/"
              className="
                mt-6
                inline-flex
                items-center
                justify-center
                rounded-lg
                bg-[var(--color-primary,#355E3B)]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Back to Home
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // Product Details Page
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
            mx-auto
            w-full
            max-w-[1440px]
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
              overflow-hidden
              sm:mb-5
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
                pb-1
                text-xs
                text-gray-500
                sm:text-sm
              "
            >
              {/* Home */}

              <Link
                to="/"
                className="
                  shrink-0
                  transition
                  hover:text-[var(--color-primary,#355E3B)]
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
                      transition
                      hover:text-[var(--color-primary,#355E3B)]
                    "
                  >
                    {product.category.name}
                  </Link>
                </>
              )}

              {/* Menu Group */}

              {product?.menuGroup && (
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
                      transition
                      hover:text-[var(--color-primary,#355E3B)]
                    "
                  >
                    {product.menuGroup.name}
                  </Link>
                </>
              )}

              {/* Sub Category */}

              {product?.subCategory && (
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
                      transition
                      hover:text-[var(--color-primary,#355E3B)]
                    "
                  >
                    {product.subCategory.name}
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
                  overflow-hidden
                  text-ellipsis
                  font-medium
                  text-gray-700
                  sm:max-w-[300px]
                  lg:max-w-[450px]
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
              items-start
              gap-6
              lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
              sm:gap-8
              lg:gap-10
              xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
              xl:gap-14
            "
          >
            {/* ==================================
                LEFT - PRODUCT GALLERY
            ================================== */}

            <div
              className="
                w-full
                min-w-0
                self-start
                lg:sticky
                lg:top-24
              "
            >
              <ProductGallery
                images={productImages}
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
              border-t
              border-gray-200
              pt-8
              sm:mt-12
              sm:pt-10
              lg:mt-16
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

              {/* Related products
                  background loading */}

              {relatedLoading && (
                <p
                  className="
                    mt-4
                    text-center
                    text-sm
                    text-gray-400
                  "
                >
                  Loading related
                  products...
                </p>
              )}
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

          {/* ====================================
              Background Product Fetch
          ==================================== */}

          {productFetching && (
            <div
              className="
                fixed
                bottom-4
                right-4
                z-40
                rounded-full
                bg-white
                px-4
                py-2
                text-xs
                font-medium
                text-gray-500
                shadow-lg
              "
            >
              Updating...
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;