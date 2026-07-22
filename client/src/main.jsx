import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "./context/AdminContext";

import "./styles/index.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import ProductProvider from "./context/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
<CartProvider>
  <WishlistProvider>
    <OrderProvider>
      <ProductProvider>
        <AuthProvider>
          <AdminProvider>

            <App />

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

          </AdminProvider>
        </AuthProvider>
      </ProductProvider>
    </OrderProvider>
  </WishlistProvider>
</CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);