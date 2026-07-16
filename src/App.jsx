import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import EditProfile from "./pages/EditProfile";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";

import ProductDetails from "./components/product-details/ProductDetails";
import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import OrderSuccess from "./components/checkout/OrderSuccess";

import PrivateRoute from "./components/auth/PrivateRoute";


import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ========================= */}
      {/* Public Routes */}
      {/* ========================= */}

      <Route path="/" element={<Home />} />

      <Route
        path="/category/:slug"
        element={<CategoryPage />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/search/:keyword"
        element={<SearchResults />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

      {/* ========================= */}
      {/* Protected Routes */}
      {/* ========================= */}

      <Route element={<PrivateRoute />}>

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/order/:id"
          element={<OrderDetails />}
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
          path="/order-success"
          element={<OrderSuccess />}
        />

      </Route>


<Route element={<AdminProtectedRoute />}>

  <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
  />

</Route>
      {/* ========================= */}
      {/* 404 */}
      {/* ========================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;