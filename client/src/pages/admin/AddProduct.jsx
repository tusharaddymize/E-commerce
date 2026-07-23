


import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import { createProduct } from "../../services/productService";
import ImageGuidelines from "../../components/admin/common/ImageGuidelines";
const AddProduct = () => {
  const navigate = useNavigate();

  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Image Preview
  const [preview, setPreview] = useState("");

  // Image File
  const [thumbnail, setThumbnail] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    oldPrice: "",
    discount: "",
    stock: "",
    sku: "",
    sizes: "",
    colors: "",
    fabric: "",
    pattern: "",
    occasion: "",
    country: "India",
    isFeatured: false,
    isTrending: false,
    status: "active",
  });

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================
  // Handle Image Upload
  // ==========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    setPreview(URL.createObjectURL(file));
  };

  // ==========================
  // Submit Product
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const res = await createProduct(formData);

      alert(res.message);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Product creation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
  <div className="flex">

    {/* Sidebar */}
    <AdminSidebar
      isOpen={sidebarOpen}
      setIsOpen={setSidebarOpen}
    />

    {/* Main Content */}
    <div className="flex-1 min-w-0 flex flex-col">

      {/* Navbar */}
      <AdminNavbar
        setSidebarOpen={setSidebarOpen}
      />

      {/* Page */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Add Product
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Fill in the product details to add a new product.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 lg:p-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* Product Title */}
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Brand */}
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={form.brand}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Category */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Old Price */}
            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={form.oldPrice}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Discount */}
            <input
              type="number"
              name="discount"
              placeholder="Discount %"
              value={form.discount}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Stock */}
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* SKU */}
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={form.sku}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Sizes */}
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (S,M,L)"
              value={form.sizes}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Colors */}
            <input
              type="text"
              name="colors"
              placeholder="Colors (Red, Blue)"
              value={form.colors}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Fabric */}
            <input
              type="text"
              name="fabric"
              placeholder="Fabric"
              value={form.fabric}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Pattern */}
            <input
              type="text"
              name="pattern"
              placeholder="Pattern"
              value={form.pattern}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Occasion */}
            <input
              type="text"
              name="occasion"
              placeholder="Occasion"
              value={form.occasion}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="border rounded-xl p-3 md:col-span-2 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
{/* Product Image Upload */}
<div className="md:col-span-2">

  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

    {/* Left Side */}
    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Product Image
      </label>

      <label
        htmlFor="thumbnail"
        className="flex flex-col items-center justify-center w-full min-h-[280px] border-2 border-dashed border-green-300 rounded-2xl cursor-pointer bg-green-50 hover:bg-green-100 hover:border-green-500 transition-all duration-300"
      >

        {preview ? (

          <div className="p-4 w-full">

            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain rounded-xl bg-white border"
            />

          </div>

        ) : (

          <div className="text-center px-6">

            <div className="text-6xl mb-4">
              📷
            </div>

            <h3 className="text-xl font-bold text-gray-700">
              Upload Product Image
            </h3>

            <p className="text-gray-500 mt-2">
              Click here to browse your computer
            </p>

            <p className="text-sm text-gray-400 mt-4">
              JPG • PNG • WEBP
            </p>

          </div>

        )}

        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />

      </label>

      {thumbnail && (

        <div className="mt-4 rounded-xl border bg-white p-4">

          <div className="flex justify-between">

            <span className="text-gray-600 font-medium">
              File Name
            </span>

            <span className="font-semibold text-gray-800 break-all">
              {thumbnail.name}
            </span>

          </div>

          <div className="flex justify-between mt-2">

            <span className="text-gray-600 font-medium">
              File Size
            </span>

            <span className="font-semibold text-green-600">
              {(thumbnail.size / 1024 / 1024).toFixed(2)} MB
            </span>

          </div>

        </div>

      )}

    </div>

    {/* Right Side */}
    <div>

      <ImageGuidelines
        title="Product Image"
        recommended="1000 × 1000 px"
        minimum="800 × 800 px"
        ratio="1 : 1 Square"
        format="JPG, PNG, WebP"
        maxSize="5 MB"
        note="Use a clean white background with high-quality product images for the best shopping experience."
      />

    </div>

  </div>

</div>

            {/* Image Preview */}
            {preview && (
              <div className="md:col-span-2 flex justify-center">
                <div className="border border-gray-200 rounded-2xl p-3 bg-gray-50 shadow-sm">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-56 h-56 object-cover rounded-xl"
                  />
                </div>
              </div>
            )}

{/* ================= Homepage Visibility ================= */}

<div className="md:col-span-2">

  <div className="border rounded-2xl p-6 bg-gray-50">

    <h2 className="text-xl font-bold text-gray-800">
      🏠 Homepage Visibility
    </h2>

    <p className="text-gray-500 mt-2 mb-6">
      Select where this product should appear on the homepage.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      <label className="flex items-center gap-3 cursor-pointer rounded-xl border bg-white p-4 hover:border-green-500 transition">

        <input
          type="checkbox"
          name="isTrending"
          checked={form.isTrending}
          onChange={handleChange}
          className="w-5 h-5 accent-green-600"
        />

        <div>

          <p className="font-semibold">
            🔥 Trending Product
          </p>

          <p className="text-sm text-gray-500">
            Show in Trending section
          </p>

        </div>

      </label>

      <label className="flex items-center gap-3 cursor-pointer rounded-xl border bg-white p-4 hover:border-green-500 transition">

        <input
          type="checkbox"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
          className="w-5 h-5 accent-green-600"
        />

        <div>

          <p className="font-semibold">
            ⭐ Featured Product
          </p>

          <p className="text-sm text-gray-500">
            Show in Featured section
          </p>

        </div>

      </label>

      <label className="flex items-center gap-3 cursor-pointer rounded-xl border bg-white p-4 hover:border-green-500 transition">

        <input
          type="checkbox"
          name="isNewArrival"
          checked={form.isNewArrival}
          onChange={handleChange}
          className="w-5 h-5 accent-green-600"
        />

        <div>

          <p className="font-semibold">
            🆕 New Arrival
          </p>

          <p className="text-sm text-gray-500">
            Show in New Arrival section
          </p>

        </div>

      </label>

      <label className="flex items-center gap-3 cursor-pointer rounded-xl border bg-white p-4 hover:border-green-500 transition">

        <input
          type="checkbox"
          name="isBestSelling"
          checked={form.isBestSelling}
          onChange={handleChange}
          className="w-5 h-5 accent-green-600"
        />

        <div>

          <p className="font-semibold">
            🏆 Best Selling
          </p>

          <p className="text-sm text-gray-500">
            Show in Best Selling section
          </p>

        </div>

      </label>

    </div>

  </div>

</div>
            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl py-3 font-semibold transition-all duration-300"
              >
                {loading ? "Uploading..." : "Add Product"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-xl py-3 font-semibold transition-all duration-300"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  </div>
</div>
  );
};

export default AddProduct;