import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./styles/index.css";

import App from "./App";

// ==========================================
// Context Providers
// ==========================================

import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import ProductProvider from "./context/ProductContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CategoryProvider } from "./context/CategoryContext";
import "react-toastify/dist/ReactToastify.css";
// ==========================================
// Services
// ==========================================

import { getWebsiteSettings } from "./services/websiteSettingService";

// ==========================================
// Dynamic Website Settings Loader
// Handles settings outside React UI such as favicon
// ==========================================

const WebsiteSettingsLoader = ({ children }) => {
  useEffect(() => {
    const loadWebsiteSettings = async () => {
      try {
        const response = await getWebsiteSettings();

        // Supports both:
        // { success: true, data: {...} }
        // OR direct settings object
        const settings = response?.data || response;

        if (!settings) return;

        // ======================================
        // Dynamic Favicon
        // ======================================

        if (settings.favicon) {
          let favicon = document.querySelector(
            "link[rel='icon']"
          );

          if (!favicon) {
            favicon = document.createElement("link");

            favicon.rel = "icon";

            document.head.appendChild(favicon);
          }

          favicon.href = settings.favicon;
        }

        // ======================================
        // Dynamic SEO Title
        // ======================================

        if (settings?.seo?.title) {
          document.title = settings.seo.title;
        }

        // ======================================
        // Dynamic Meta Description
        // ======================================

        if (settings?.seo?.description) {
          let description =
            document.querySelector(
              'meta[name="description"]'
            );

          if (!description) {
            description =
              document.createElement("meta");

            description.name = "description";

            document.head.appendChild(description);
          }

          description.content =
            settings.seo.description;
        }
      } catch (error) {
        console.error(
          "Failed to load website settings:",
          error
        );
      }
    };

    loadWebsiteSettings();
  }, []);

  return children;
};

// ==========================================
// React App
// ==========================================

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>

      {/* ====================================== */}
      {/* Authentication Provider */}
      {/* Cart ko current logged-in user milega */}
      {/* ====================================== */}

      <AuthProvider>

        {/* ==================================== */}
        {/* User Specific Cart */}
        {/* ==================================== */}

        <CartProvider>

          <WishlistProvider>

            <OrderProvider>

              <ProductProvider>

                <AdminProvider>

                  {/* ========================== */}
                  {/* Global Dynamic Theme */}
                  {/* ========================== */}

                  <ThemeProvider>

                    {/* ======================== */}
                    {/* Favicon + SEO Settings */}
                    {/* ======================== */}

                    <WebsiteSettingsLoader>

                      <CategoryProvider>

                        <App />

                      </CategoryProvider>

                    </WebsiteSettingsLoader>

                    {/* ======================== */}
                    {/* Toast Notifications */}
                    {/* ======================== */}

                    <Toaster
                      position="top-right"
                      reverseOrder={false}
                      gutter={10}
                      containerStyle={{
                        top: 20,
                        right: 20,
                      }}
                      toastOptions={{
                        duration: 3000,

                        style: {
                          borderRadius: "12px",
                          background: "#fff",
                          color: "#111827",
                          fontSize: "15px",
                          fontWeight: 500,
                          padding: "14px 16px",
                          maxWidth: "420px",
                        },

                        success: {
                          duration: 2500,
                        },

                        error: {
                          duration: 4000,
                        },
                      }}
                    />

                  </ThemeProvider>

                </AdminProvider>

              </ProductProvider>

            </OrderProvider>

          </WishlistProvider>

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);