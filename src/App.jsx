import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import ProductDetails from "./components/product-details/ProductDetails";
import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import OrderSuccess from "./components/checkout/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<CartPage />}
      />

      <Route
        path="/checkout"
        element={<CheckoutPage />}
      />

      <Route
        path="/wishlist"
        element={<Wishlist />}
      />


      <Route
  path="/order-success"
  element={<OrderSuccess />}
/>


<Route
  path="/orders"
  element={<Orders />}
/>

<Route
  path="/orders/:id"
  element={<OrderDetails />}
/>
    </Routes>

    
  );
}

export default App;