import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

// ==========================================
// Layout Components
// ==========================================

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

// ==========================================
// Category Components
// ==========================================

import CategoryBanner from "../components/categories/CategoryBanner";
import CategorySidebar from "../components/categories/CategorySidebar";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryGrid from "../components/categories/CategoryGrid";

// ==========================================
// Services
// ==========================================

import { getWebsiteSettings } from "../services/websiteSettingService";

const CategoryPage = () => {
  // ==========================================
  // URL Params
  // ==========================================

  const {
    categorySlug,
    menuGroupSlug,
    subCategorySlug,
  } = useParams();

  // ==========================================
  // States
  // ==========================================

  const [filters, setFilters] =
    useState({});

  const [theme, setTheme] =
    useState({});

  // ==========================================
  // Load Website Theme
  // ==========================================

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const res =
          await getWebsiteSettings();

        setTheme(
          res?.data?.theme ||
            res?.theme ||
            {}
        );
      } catch (error) {
        console.error(
          "Failed to load website theme:",
          error
        );
      }
    };

    loadTheme();
  }, []);

  // ==========================================
  // Page
  // ==========================================

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
      "
    >
      {/* ====================================== */}
      {/* Header + Navbar */}
      {/* ====================================== */}

      <Header />

      {/* ====================================== */}
      {/* Main Category Content */}
      {/* ====================================== */}

      <main
        className="
          bg-gray-100
          flex-1
        "
      >
        <div
          className="
            w-full
            max-w-[1450px]
            mx-auto

            px-4
            sm:px-5
            lg:px-5

            py-5
            lg:py-8
          "
        >
          {/* ================================== */}
          {/* Back To Home */}
          {/* ================================== */}

          <div className="mb-4">
            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-2

                text-sm
                font-semibold
                text-gray-600

                transition-colors
                duration-200

                hover:text-[var(--primary-color)]
              "
            >
              <FiArrowLeft
                className="text-lg"
              />

              <span>
                Back to Home
              </span>
            </Link>
          </div>

          {/* ================================== */}
          {/* Category Banner */}
          {/* ================================== */}

          <CategoryBanner
            title={
              subCategorySlug ||
              menuGroupSlug ||
              categorySlug
            }
            theme={theme}
          />

          {/* ================================== */}
          {/* Filters + Products */}
          {/* ================================== */}

          <div
            className="
              grid
              grid-cols-1

              lg:grid-cols-[280px_1fr]

              gap-5
              lg:gap-8
            "
          >
            {/* ================================ */}
            {/* Filter Sidebar */}
            {/* ================================ */}

            <CategorySidebar
              categorySlug={
                categorySlug
              }
              menuGroupSlug={
                menuGroupSlug
              }
              subCategorySlug={
                subCategorySlug
              }
              filters={filters}
              setFilters={setFilters}
            />

            {/* ================================ */}
            {/* Products Section */}
            {/* ================================ */}

            <section className="min-w-0">
              {/* Product Toolbar */}

              <CategoryToolbar
                filters={filters}
                setFilters={setFilters}
              />

              {/* Product Grid */}

              <CategoryGrid
                categorySlug={
                  categorySlug
                }
                menuGroupSlug={
                  menuGroupSlug
                }
                subCategorySlug={
                  subCategorySlug
                }
                filters={filters}
              />
            </section>
          </div>
        </div>
      </main>

      {/* ====================================== */}
      {/* Footer */}
      {/* ====================================== */}

      <Footer />

      {/* ====================================== */}
      {/* Scroll To Top */}
      {/* ====================================== */}

      <ScrollToTopButton />
    </div>
  );
};

export default CategoryPage;