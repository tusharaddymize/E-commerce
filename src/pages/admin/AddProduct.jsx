import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import { createProduct } from "../../services/productService";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [thumbnail, setThumbnail] = useState(null);

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

  // =============================
  // Input Change
  // =============================

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

  // =============================
  // Image Change
  // =============================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    setPreview(URL.createObjectURL(file));
  };

  // =============================
  // Submit
  // =============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (thumbnail) {
        formData.append(
          "thumbnail",
          thumbnail
        );
      }

      const res =
        await createProduct(formData);

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
    <div className="flex bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <AdminNavbar />

        <main className="p-8">

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">

            <h2 className="text-3xl font-bold mb-8">

              Add Product

            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-6"
            >

              <input
                name="title"
                placeholder="Product Title"
                value={form.title}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                type="number"
                name="oldPrice"
                placeholder="Old Price"
                value={form.oldPrice}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="number"
                name="discount"
                placeholder="Discount %"
                value={form.discount}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="sku"
                placeholder="SKU"
                value={form.sku}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="sizes"
                placeholder="Sizes (S,M,L)"
                value={form.sizes}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="colors"
                placeholder="Colors (Red,Blue)"
                value={form.colors}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="fabric"
                placeholder="Fabric"
                value={form.fabric}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="pattern"
                placeholder="Pattern"
                value={form.pattern}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="occasion"
                placeholder="Occasion"
                value={form.occasion}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border rounded-lg p-3 col-span-2"
                rows={5}
                required
              />

              <div className="col-span-2">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

              </div>

              {preview && (

                <div className="col-span-2">

                  <img
                    src={preview}
                    alt="preview"
                    className="h-44 rounded-lg border"
                  />

                </div>

              )}

              <div className="flex gap-6 col-span-2">

                <label>

                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                  />

                  <span className="ml-2">
                    Featured
                  </span>

                </label>

                <label>

                  <input
                    type="checkbox"
                    name="isTrending"
                    checked={form.isTrending}
                    onChange={handleChange}
                  />

                  <span className="ml-2">
                    Trending
                  </span>

                </label>

              </div>

              <button
                disabled={loading}
                className="col-span-2 bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 font-semibold"
              >

                {loading
                  ? "Uploading..."
                  : "Add Product"}

              </button>

            </form>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AddProduct;