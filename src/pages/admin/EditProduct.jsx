import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
  getAdminProductById,
  updateProduct,
} from "../../services/productService";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==========================
  // Sidebar
  // ==========================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================
  // States
  // ==========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");

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
    fabric: "",
    pattern: "",
    occasion: "",
    country: "",
    status: "active",
    isFeatured: false,
    isTrending: false,
    colors: "",
    sizes: "",
  });

  // ==========================
  // Load Product
  // ==========================

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getAdminProductById(id);

      const product = data.product;

      setForm({
        title: product.title || "",
        description: product.description || "",
        brand: product.brand || "",
        category: product.category || "",
        price: product.price || "",
        oldPrice: product.oldPrice || "",
        discount: product.discount || "",
        stock: product.stock || "",
        sku: product.sku || "",
        fabric: product.fabric || "",
        pattern: product.pattern || "",
        occasion: product.occasion || "",
        country: product.country || "",
        status: product.status || "active",

        isFeatured: product.isFeatured || false,
        isTrending: product.isTrending || false,

        colors: product.colors
          ? product.colors.join(", ")
          : "",

        sizes: product.sizes
          ? product.sizes.join(", ")
          : "",
      });

      setPreview(product.thumbnail || "");
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : value,
    }));
  };

  // ==========================
  // Image Change
  // ==========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const data = await updateProduct(id, formData);

      toast.success(
        data.message || "Product updated successfully."
      );

      navigate("/admin/products");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <p className="text-lg font-semibold text-slate-700">
          Loading Product...
        </p>
      </div>
    );
  }

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

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Edit Product
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Update your product information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >

            {/* Product Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                SKU
              </label>

              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Old Price
              </label>

              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Discount (%)
              </label>

              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>
                        {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* Fabric */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Fabric
              </label>

              <input
                type="text"
                name="fabric"
                value={form.fabric}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Pattern */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pattern
              </label>

              <input
                type="text"
                name="pattern"
                value={form.pattern}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Occasion */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Occasion
              </label>

              <input
                type="text"
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Sizes */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Sizes
              </label>

              <input
                type="text"
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="S, M, L"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Colors */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Colors
              </label>

              <input
                type="text"
                name="colors"
                value={form.colors}
                onChange={handleChange}
                placeholder="Red, Blue"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Product Image */}
            <div className="md:col-span-2">

              <label className="mb-3 block text-sm font-medium text-gray-700">
                Product Image
              </label>

              <div className="flex flex-col lg:flex-row gap-6 items-start">

                {/* Preview */}
                <div className="w-full lg:w-auto flex justify-center">
                  <div className="h-48 w-48 overflow-hidden rounded-2xl border border-gray-300 bg-gray-50">

                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                  </div>
                </div>

                {/* Upload */}
                <div className="flex-1 w-full">

                  <label
                    htmlFor="thumbnail"
                    className="flex h-32 w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 transition hover:border-green-600 hover:bg-green-100"
                  >
                    <div className="text-center">

                      <p className="font-semibold text-green-700">
                        Change Image
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        JPG, PNG, WEBP
                      </p>

                    </div>

                    <input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImage}
                    />

                  </label>

                </div>

              </div>

            </div>

                        {/* Featured & Trending */}
            <div className="md:col-span-2">

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">

                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="h-5 w-5 accent-green-600"
                  />

                  <span className="font-medium text-gray-700">
                    Featured Product
                  </span>

                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">

                  <input
                    type="checkbox"
                    name="isTrending"
                    checked={form.isTrending}
                    onChange={handleChange}
                    className="h-5 w-5 accent-green-600"
                  />

                  <span className="font-medium text-gray-700">
                    Trending Product
                  </span>

                </label>

              </div>

            </div>

            {/* Buttons */}
            <div className="md:col-span-2 mt-4">

              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="
                    w-full
                    sm:w-auto
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-8
                    py-3
                    font-semibold
                    text-gray-700
                    transition
                    hover:bg-gray-100
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    flex
                    w-full
                    sm:w-auto
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-green-600
                    px-8
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                    disabled:cursor-not-allowed
                    disabled:bg-gray-400
                  "
                >
                  <Save size={18} />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </div>

          </form>

        </div>

      </main>

    </div>

  </div>

</div>
  );
};

export default EditProduct;