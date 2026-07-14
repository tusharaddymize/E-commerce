import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css"; // <-- Ye line add karo (ya "./index.css")

import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);