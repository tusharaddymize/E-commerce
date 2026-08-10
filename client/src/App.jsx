import { Routes, Route } from "react-router-dom";

import DynamicFavicon from "./components/admin/common/DynamicFavicon";

// =========================
// Public Pages
// =========================
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
import About from "./pages/About";
import ProductDetails from "./components/product-details/ProductDetails";
import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import OrderSuccess from "./components/checkout/OrderSuccess";
import PolicyPage from "./pages/PolicyPage";
import FlashDeals from "./pages/FlashDeals";
import ForgotPassword from "./pages/ForgotPassword";

// =========================
// Authentication
// =========================
import PrivateRoute from "./components/auth/PrivateRoute";

// =========================
// Admin
// =========================
import AdminLayout from "./components/admin/AdminLayout";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import EditProduct from "./pages/admin/EditProduct";

import ProductAnalytics from "./pages/admin/ProductAnalytics";

import OrderManagement from "./pages/admin/OrderManagement";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";

import UserManagement from "./pages/admin/UserManagement";
import AdminUserDetails from "./pages/admin/AdminUserDetails";

import AdminSettings from "./pages/admin/AdminSettings";
import WebsiteSettings from "./pages/admin/WebsiteSettings";

import FlashDealList from "./pages/admin/FlashDealList";
import AddFlashDeal from "./pages/admin/AddFlashDeal";
import EditFlashDeal from "./pages/admin/EditFlashDeal";

import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminCategories from "./pages/admin/AdminCategories";


function App() {
  return (
    <>
      {/* ========================= */}
      {/* Dynamic Favicon */}
      {/* ========================= */}

      <DynamicFavicon />

      <Routes>

        {/* ==================================================
            PUBLIC ROUTES
        ================================================== */}

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Flash Deals */}
        <Route
          path="/flash-deals"
          element={<FlashDeals />}
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Search */}
        <Route
          path="/search/:keyword"
          element={<SearchResults />}
        />

        {/* Category */}
        <Route
          path="/category/:categorySlug"
          element={<CategoryPage />}
        />

        {/* Category Menu Group */}
        <Route
          path="/category/:categorySlug/:menuGroupSlug"
          element={<CategoryPage />}
        />

        {/* Category Sub Category */}
        <Route
          path="/category/:categorySlug/:menuGroupSlug/:subCategorySlug"
          element={<CategoryPage />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Policy */}
        <Route
          path="/policy/:type"
          element={<PolicyPage />}
        />

        {/* Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================================================
            USER PROTECTED ROUTES
        ================================================== */}

        <Route element={<PrivateRoute />}>

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Edit Profile */}
          <Route
            path="/edit-profile"
            element={<EditProfile />}
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* Orders */}
          <Route
            path="/orders"
            element={<Orders />}
          />

          {/* Order Details */}
          <Route
            path="/order/:id"
            element={<OrderDetails />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<CartPage />}
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          {/* Order Success */}
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

        </Route>


        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ==================================================
            ADMIN PROTECTED ROUTES
        ================================================== */}

        <Route element={<AdminProtectedRoute />}>

          {/* ==================================================
              ADMIN LAYOUT

              Sidebar + Navbar + Outlet
          ================================================== */}

          <Route element={<AdminLayout />}>

            {/* =========================
                Dashboard
            ========================= */}

            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />


            {/* =========================
                Products
            ========================= */}

            <Route
              path="/admin/add-product"
              element={<AddProduct />}
            />

            <Route
              path="/admin/products"
              element={<ProductList />}
            />

            <Route
              path="/admin/products/edit/:id"
              element={<EditProduct />}
            />


            {/* =========================
                Analytics
            ========================= */}

            <Route
              path="/admin/analytics"
              element={<ProductAnalytics />}
            />


            {/* =========================
                Orders
            ========================= */}

            <Route
              path="/admin/orders"
              element={<OrderManagement />}
            />

            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetails />}
            />


            {/* =========================
                Users
            ========================= */}

            <Route
              path="/admin/users"
              element={<UserManagement />}
            />

            <Route
              path="/admin/users/:id"
              element={<AdminUserDetails />}
            />


            {/* =========================
                Settings
            ========================= */}

            <Route
              path="/admin/settings"
              element={<AdminSettings />}
            />

            <Route
              path="/admin/website-settings"
              element={<WebsiteSettings />}
            />


            {/* =========================
                Flash Deals
            ========================= */}

            <Route
              path="/admin/flash-deals"
              element={<FlashDealList />}
            />

            <Route
              path="/admin/add-flash-deal"
              element={<AddFlashDeal />}
            />

            <Route
              path="/admin/edit-flash-deal/:id"
              element={<EditFlashDeal />}
            />


            {/* =========================
                Coupons
            ========================= */}

            <Route
              path="/admin/coupons"
              element={<AdminCoupons />}
            />


            {/* =========================
                Categories
            ========================= */}

            <Route
              path="/admin/categories"
              element={<AdminCategories />}
            />

          </Route>

        </Route>


        {/* ==================================================
            404
        ================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </>
  );
}

export default App;