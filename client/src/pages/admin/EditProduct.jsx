import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import ImageGuidelines from "../../components/admin/common/ImageGuidelines";
import DynamicAttributes from "../../components/admin/products/DynamicAttributes";

import {
  getAdminProductById,
  updateProduct,
} from "../../services/productService";

import {
  getFiltersBySubCategory,
} from "../../services/filterService";

import { getCategories } from "../../services/categoryService";
import { getMenuGroups } from "../../services/menuGroupService";
import { getSubCategories } from "../../services/subCategoryService";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==========================
  // Sidebar
  // ==========================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================
  // Loading
  // ==========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================
  // Image
  // ==========================

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");

  // ==========================
  // Categories
  // ==========================

  const [categories, setCategories] = useState([]);
  const [menuGroups, setMenuGroups] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [filteredMenuGroups, setFilteredMenuGroups] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  // ==========================
  // Dynamic Attributes
  // ==========================

  const [dynamicFilters, setDynamicFilters] = useState([]);
  const [attributes, setAttributes] = useState({});

  // ==========================
  // Form
  // ==========================

  const [form, setForm] = useState({
    title: "",
    description: "",

    brand: "",

    category: "",
    menuGroup: "",
    subCategory: "",

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

    status: "active",

    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
    isBestSelling: false,
  });

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      const [
        productRes,
        catRes,
        menuRes,
        subRes,
      ] = await Promise.all([
        getAdminProductById(id),
        getCategories(),
        getMenuGroups(),
        getSubCategories(),
      ]);

      const categories = catRes.data || [];
      const menuGroups = menuRes.data || [];
      const subCategories = subRes.data || [];

      setCategories(categories);
      setMenuGroups(menuGroups);
      setSubCategories(subCategories);

      const product = productRes.product;

      const categoryId =
        product.category?._id || product.category || "";

      const menuGroupId =
        product.menuGroup?._id || product.menuGroup || "";

      const subCategoryId =
        product.subCategory?._id || product.subCategory || "";

      setFilteredMenuGroups(
        menuGroups.filter(
          (item) =>
            item.category?._id === categoryId ||
            item.category === categoryId
        )
      );

      setFilteredSubCategories(
        subCategories.filter(
          (item) =>
            item.menuGroup?._id === menuGroupId ||
            item.menuGroup === menuGroupId
        )
      );

      setAttributes(product.attributes || {});

      setForm({
        title: product.title || "",
        description: product.description || "",

        brand: product.brand || "",

        category: categoryId,
        menuGroup: menuGroupId,
        subCategory: subCategoryId,

        price: product.price || "",
        oldPrice: product.oldPrice || "",
        discount: product.discount || "",

        stock: product.stock || "",
        sku: product.sku || "",

        sizes: product.sizes?.join(", ") || "",
        colors: product.colors?.join(", ") || "",

        fabric: product.fabric || "",
        pattern: product.pattern || "",
        occasion: product.occasion || "",

        country: product.country || "India",

        status: product.status || "active",

        isFeatured: product.isFeatured || false,
        isTrending: product.isTrending || false,
        isNewArrival: product.isNewArrival || false,
        isBestSelling: product.isBestSelling || false,
      });

      setPreview(product.thumbnail || "");

      // Dynamic Filters
 await loadDynamicFilters(subCategoryId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };



  // ==========================
// Handle Change
// ==========================

const handleChange = async (e) => {
  const { name, value, type, checked } = e.target;

  // Checkbox
  if (type === "checkbox") {
    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
    return;
  }

  // Category Changed
  if (name === "category") {
    const menus = menuGroups.filter(
      (item) =>
        item.category?._id === value ||
        item.category === value
    );

    setFilteredMenuGroups(menus);
    setFilteredSubCategories([]);
    setDynamicFilters([]);
    setAttributes({});

    setForm((prev) => ({
      ...prev,
      category: value,
      menuGroup: "",
      subCategory: "",
    }));

    return;
  }

  // Menu Group Changed
  if (name === "menuGroup") {
    const subs = subCategories.filter(
      (item) =>
        item.menuGroup?._id === value ||
        item.menuGroup === value
    );

 setFilteredSubCategories(subs);
setDynamicFilters([]);
setAttributes({});

    setForm((prev) => ({
      ...prev,
      menuGroup: value,
      subCategory: "",
    }));

    return;
  }

  // Sub Category Changed
if (name === "subCategory") {
  setForm((prev) => ({
    ...prev,
    subCategory: value,
  }));

  setAttributes({});

  await loadDynamicFilters(value);

  return;
}

  // Normal Inputs
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// ==========================
// Image Upload
// ==========================

const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setThumbnail(file);
  setPreview(URL.createObjectURL(file));
};

// ==========================
// Load Dynamic Filters
// ==========================
const loadDynamicFilters = async (subCategoryId) => {
  try {
    if (!subCategoryId) {
      setDynamicFilters([]);
      return;
    }

    const res =
      await getFiltersBySubCategory(subCategoryId);

    console.log("Edit Product Filters:", res);

    setDynamicFilters(
      res.filters ||
      res.data ||
      []
    );
  } catch (error) {
    console.error(
      "Failed to load dynamic filters:",
      error
    );

    setDynamicFilters([]);
  }
};

// ==========================
// Dynamic Attribute Change
// ==========================

const handleAttributeChange = (key, value) => {
  setAttributes((prev) => ({
    ...prev,
    [key]: value,
  }));
};

// ==========================
// Submit
// ==========================

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.category) {
    return toast.error("Please select a category.");
  }

  if (!form.menuGroup) {
    return toast.error("Please select a menu group.");
  }

  if (!form.subCategory) {
    return toast.error("Please select a sub category.");
  }

  try {
    setSaving(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append(
      "attributes",
      JSON.stringify(attributes)
    );

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const res = await updateProduct(id, formData);

    toast.success(
      res.message || "Product updated successfully."
    );

    navigate("/admin/products");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
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
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
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

        {/* Main */}
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
                <h1 className="text-3xl font-bold text-slate-800">
                  Edit Product
                </h1>

                <p className="mt-2 text-gray-500">
                  Update your product details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 hover:bg-gray-100"
              >
                <ArrowLeft size={18} />
                Back
              </button>

            </div>

            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

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

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories.map((item) => (

<option
  key={item._id}
  value={item._id}
>
  {item.name}
</option>

                    ))}

                  </select>

                </div>

                {/* Menu Group */}

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Menu Group
                  </label>

                  <select
                    name="menuGroup"
                    value={form.menuGroup}
                    onChange={handleChange}
                    disabled={!form.category}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >

                    <option value="">
                      Select Menu Group
                    </option>

                    {filteredMenuGroups.map((item) => (

<option
  key={item._id}
  value={item._id}
>
  {item.name}
</option>
                    ))}

                  </select>

                </div>

                {/* Sub Category */}

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Sub Category
                  </label>

                  <select
                    name="subCategory"
                    value={form.subCategory}
                    onChange={handleChange}
                    disabled={!form.menuGroup}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >

                    <option value="">
                      Select Sub Category
                    </option>

                    {filteredSubCategories.map((item) => (

<option
  key={item._id}
  value={item._id}
>
  {item.name}
</option>

                    ))}

                  </select>

                </div>

                {/* SKU */}

                <input
                  type="text"
                  name="sku"
                  placeholder="SKU"
                  value={form.sku}
                  onChange={handleChange}
                  className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
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
                  placeholder="Discount"
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

                {/* Description */}

                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  className="md:col-span-2 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  required
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

                {/* Country */}

                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={handleChange}
                  className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Sizes */}

                <input
                  type="text"
                  name="sizes"
                  placeholder="Sizes (S, M, L)"
                  value={form.sizes}
                  onChange={handleChange}
                  className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Colors */}

                <input
                  type="text"
                  name="colors"
                  placeholder="Colors (Red, Blue, Black)"
                  value={form.colors}
                  onChange={handleChange}
                  className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
<DynamicAttributes
    filters={dynamicFilters}
    attributes={attributes}
    onChange={handleAttributeChange}
/>







                {/* ================= Product Image ================= */}

                <div className="md:col-span-2">

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* Left */}

                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Product Image
                      </label>

                      <label
                        htmlFor="thumbnail"
                        className="flex flex-col items-center justify-center w-full min-h-[280px] border-2 border-dashed border-green-300 rounded-2xl cursor-pointer bg-green-50 hover:bg-green-100 hover:border-green-500 transition"
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
                              Click to change image
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

                            <span className="text-gray-600">
                              File
                            </span>

                            <span className="font-semibold break-all">
                              {thumbnail.name}
                            </span>

                          </div>

                          <div className="flex justify-between mt-2">

                            <span className="text-gray-600">
                              Size
                            </span>

                            <span className="font-semibold text-green-600">
                              {(thumbnail.size / 1024 / 1024).toFixed(2)} MB
                            </span>

                          </div>

                        </div>

                      )}

                    </div>

                    {/* Right */}

                    <ImageGuidelines
                      title="Product Image"
                      recommended="1000 × 1000 px"
                      minimum="800 × 800 px"
                      ratio="1 : 1 Square"
                      format="JPG, PNG, WebP"
                      maxSize="5 MB"
                      note="Use high quality product image."
                    />

                  </div>

                </div>
                                {/* ================= Homepage Visibility ================= */}

                <div className="md:col-span-2">

                  <div className="border rounded-2xl p-6 bg-gray-50">

                    <h2 className="text-xl font-bold text-gray-800">
                      Homepage Visibility
                    </h2>

                    <p className="text-gray-500 mt-2 mb-6">
                      Select where this product should appear.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <label className="flex items-center gap-3 rounded-xl border bg-white p-4">

                        <input
                          type="checkbox"
                          name="isTrending"
                          checked={form.isTrending}
                          onChange={handleChange}
                          className="w-5 h-5 accent-green-600"
                        />

                        <span>🔥 Trending Product</span>

                      </label>

                      <label className="flex items-center gap-3 rounded-xl border bg-white p-4">

                        <input
                          type="checkbox"
                          name="isFeatured"
                          checked={form.isFeatured}
                          onChange={handleChange}
                          className="w-5 h-5 accent-green-600"
                        />

                        <span>⭐ Featured Product</span>

                      </label>

                      <label className="flex items-center gap-3 rounded-xl border bg-white p-4">

                        <input
                          type="checkbox"
                          name="isNewArrival"
                          checked={form.isNewArrival}
                          onChange={handleChange}
                          className="w-5 h-5 accent-green-600"
                        />

                        <span>🆕 New Arrival</span>

                      </label>

                      <label className="flex items-center gap-3 rounded-xl border bg-white p-4">

                        <input
                          type="checkbox"
                          name="isBestSelling"
                          checked={form.isBestSelling}
                          onChange={handleChange}
                          className="w-5 h-5 accent-green-600"
                        />

                        <span>🏆 Best Selling</span>

                      </label>

                    </div>

                  </div>

                </div>

                {/* ================= Status ================= */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="active">
                      Active
                    </option>


                    <option value="draft">
  Draft
</option>

                  </select>

                </div>

                {/* ================= Buttons ================= */}

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold disabled:bg-gray-400"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="flex-1 border rounded-xl py-3 hover:bg-gray-100"
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

export default EditProduct;