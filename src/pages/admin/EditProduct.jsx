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
      [name]:
        type === "checkbox"
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
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading Product...
      </div>
    );
  }

  // ==========================
  // JSX
  // ==========================

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <main className="p-8">
          {/* Header */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate("/admin/products")}
                className="mb-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <h1 className="text-3xl font-bold">
                Edit Product
              </h1>

              <p className="mt-2 text-gray-500">
                Update your existing product.
              </p>
            </div>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-white p-8 shadow"
          >
            <div className="grid gap-6 md:grid-cols-2">

              {/* Product Name */}

              <div>
                <label className="mb-2 block font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Brand */}

              <div>
                <label className="mb-2 block font-medium">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block font-medium">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* SKU */}

              <div>
                <label className="mb-2 block font-medium">
                  SKU
                </label>

                <input
                  type="text"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Price */}

              <div>
                <label className="mb-2 block font-medium">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Old Price */}

              <div>
                <label className="mb-2 block font-medium">
                  Old Price
                </label>

                <input
                  type="number"
                  name="oldPrice"
                  value={form.oldPrice}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Discount */}

              <div>
                <label className="mb-2 block font-medium">
                  Discount
                </label>

                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Stock */}

              <div>
                <label className="mb-2 block font-medium">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
                       {/* Description */}

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Fabric */}

              <div>
                <label className="mb-2 block font-medium">
                  Fabric
                </label>

                <input
                  type="text"
                  name="fabric"
                  value={form.fabric}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Pattern */}

              <div>
                <label className="mb-2 block font-medium">
                  Pattern
                </label>

                <input
                  type="text"
                  name="pattern"
                  value={form.pattern}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Occasion */}

              <div>
                <label className="mb-2 block font-medium">
                  Occasion
                </label>

                <input
                  type="text"
                  name="occasion"
                  value={form.occasion}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Country */}

              <div>
                <label className="mb-2 block font-medium">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Sizes */}

              <div>
                <label className="mb-2 block font-medium">
                  Sizes
                </label>

                <input
                  type="text"
                  name="sizes"
                  value={form.sizes}
                  onChange={handleChange}
                  placeholder="S, M, L, XL"
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Colors */}

              <div>
                <label className="mb-2 block font-medium">
                  Colors
                </label>

                <input
                  type="text"
                  name="colors"
                  value={form.colors}
                  onChange={handleChange}
                  placeholder="Black, White, Blue"
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Status */}

              <div>
                <label className="mb-2 block font-medium">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* Product Image */}

<div className="md:col-span-2">
  <label className="mb-3 block font-medium">
    Product Image
  </label>

  <div className="flex items-center gap-6">

    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="h-40 w-40 rounded-xl border object-cover"
      />
    ) : (
      <div className="flex h-40 w-40 items-center justify-center rounded-xl border border-dashed text-gray-400">
        No Image
      </div>
    )}

    <div>

      <label
        htmlFor="thumbnail"
        className="cursor-pointer rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
      >
        Change Image
      </label>

      <input
        id="thumbnail"
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />

      <p className="mt-3 text-sm text-gray-500">
        JPG, PNG, WEBP
      </p>

    </div>

  </div>
</div>


<div className="md:col-span-2 flex items-center gap-10">

  <label className="flex items-center gap-3">

    <input
      type="checkbox"
      name="isFeatured"
      checked={form.isFeatured}
      onChange={handleChange}
    />

    Featured Product

  </label>

  <label className="flex items-center gap-3">

    <input
      type="checkbox"
      name="isTrending"
      checked={form.isTrending}
      onChange={handleChange}
    />

    Trending Product

  </label>

</div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex justify-end gap-4">

              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="rounded-lg border px-6 py-3 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                <Save size={18} />

                {saving
                  ? "Updating..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
};

export default EditProduct;

      