import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
// React Query Client
// ==========================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ========================================
      // Cache data for 5 minutes
      // ========================================

      staleTime: 5 * 60 * 1000,

      // ========================================
      // Keep unused cache for 30 minutes
      // ========================================

      gcTime: 30 * 60 * 1000,

      // ========================================
      // Don't refetch when browser tab changes
      // ========================================

      refetchOnWindowFocus: false,

      // ========================================
      // Don't refetch automatically on reconnect
      // ========================================

      refetchOnReconnect: false,

      // ========================================
      // Retry failed request only once
      // ========================================

      retry: 1,
    },
  },
});

// ==========================================
// Root
// ==========================================

const root = createRoot(
  document.getElementById("root")
);

// ==========================================
// Render Application
// ==========================================

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

        {/* ======================================
            Authentication
        ====================================== */}

        <AuthProvider>

          {/* ====================================
              Cart
          ==================================== */}

          <CartProvider>

            {/* ==================================
                Wishlist
            ================================== */}

            <WishlistProvider>

              {/* =================================
                  Orders
              ================================= */}

              <OrderProvider>

                {/* =================================
                    Products
                ================================= */}

                <ProductProvider>

                  {/* =================================
                      Admin
                  ================================= */}

                  <AdminProvider>

                    {/* =================================
                        Global Theme
                    ================================= */}

                    <ThemeProvider>

                      {/* =================================
                          Categories
                      ================================= */}

                      <CategoryProvider>

                        {/* =================================
                            Main Application
                        ================================= */}

                        <App />

                      </CategoryProvider>

                    </ThemeProvider>

                  </AdminProvider>

                </ProductProvider>

              </OrderProvider>

            </WishlistProvider>

          </CartProvider>

        </AuthProvider>

        {/* ======================================
            Toast Notifications
        ====================================== */}

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

      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);