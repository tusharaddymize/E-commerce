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

// =========================
// Admin
// =========================
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import ProductAnalytics from "./pages/admin/ProductAnalytics";
import OrderManagement from "./pages/admin/OrderManagement";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import UserManagement from "./pages/admin/UserManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import EditProduct from "./pages/admin/EditProduct"

import WebsiteSettings from "./pages/admin/WebsiteSettings";
import FlashDealList from "./pages/admin/FlashDealList";
import AddFlashDeal from "./pages/admin/AddFlashDeal";
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

      {/* ========================= */}
      {/* Admin Login */}
      {/* ========================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ========================= */}
      {/* User Protected Routes */}
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


      {/* ========================= */}
      {/* Admin Protected Routes */}
      {/* ========================= */}

<Route element={<AdminProtectedRoute />}>
  <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="/admin/add-product"
    element={<AddProduct />}
  />

  <Route
    path="/admin/products"
    element={<ProductList />}
  />

  <Route
    path="/admin/settings"
    element={<AdminSettings />}
  />

  <Route
    path="/admin/analytics"
    element={<ProductAnalytics />}
  />

  <Route
    path="/admin/orders"
    element={<OrderManagement />}
  />

  <Route
    path="/admin/orders/:id"
    element={<AdminOrderDetails />}
  />

  <Route
    path="/admin/users"
    element={<UserManagement />}
  />

  <Route
    path="/admin/products/edit/:id"
    element={<EditProduct />}
  />
  <Route
  path="/admin/website-settings"
  element={<WebsiteSettings />}
/>
<Route
  path="/admin/flash-deals"
  element={<FlashDealList />}
/>

<Route
  path="/admin/add-flash-deal"
  element={<AddFlashDeal />}
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