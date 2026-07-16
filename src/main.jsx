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

<App/>

</AdminProvider>
              </AuthProvider>
            </ProductProvider>

            <Toaster
              position="top-right"
              reverseOrder={false}
            />
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);