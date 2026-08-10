import React from "react";
import { createRoot } from "react-dom/client";
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

    <BrowserRouter>

      {/* ====================================== */}
      {/* Authentication */}
      {/* ====================================== */}

      <AuthProvider>

        {/* ==================================== */}
        {/* Cart */}
        {/* ==================================== */}

        <CartProvider>

          {/* ================================== */}
          {/* Wishlist */}
          {/* ================================== */}

          <WishlistProvider>

            {/* ================================= */}
            {/* Orders */}
            {/* ================================= */}

            <OrderProvider>

              {/* ================================= */}
              {/* Products */}
              {/* ================================= */}

              <ProductProvider>

                {/* ================================= */}
                {/* Admin */}
                {/* ================================= */}

                <AdminProvider>

                  {/* ================================= */}
                  {/* Global Theme */}
                  {/* ================================= */}

                  <ThemeProvider>

                    {/* ================================= */}
                    {/* Categories */}
                    {/* ================================= */}

                    <CategoryProvider>

                      {/* ================================= */}
                      {/* Main Application */}
                      {/* ================================= */}

                      <App />

                    </CategoryProvider>

                    {/* ================================= */}
                    {/* Toast Notifications */}
                    {/* ================================= */}

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
