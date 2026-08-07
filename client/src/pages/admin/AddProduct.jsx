// ==========================================
// AddProduct.jsx - PART A
// ==========================================

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import ImageGuidelines from "../../components/admin/common/ImageGuidelines";

import DynamicAttributes from "../../components/admin/products/DynamicAttributes";

import {
  getFiltersBySubCategory,
} from "../../services/filterService";

import {
  createProduct,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

import {
  getMenuGroups,
} from "../../services/menuGroupService";

import {
  getSubCategories,
} from "../../services/subCategoryService";

const AddProduct = () => {
  const navigate = useNavigate();

  // ==========================================
  // Sidebar
  // ==========================================

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  // ==========================================
  // Loading
  // ==========================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  // ==========================================
  // Main Product Image
  // ==========================================

  const [
    thumbnail,
    setThumbnail,
  ] = useState(null);

  const [
    thumbnailPreview,
    setThumbnailPreview,
  ] = useState("");

  // ==========================================
  // Additional Product Images
  // Maximum 4
  // ==========================================

  const [
    additionalImages,
    setAdditionalImages,
  ] = useState([]);

  const [
    additionalPreviews,
    setAdditionalPreviews,
  ] = useState([]);

  // ==========================================
  // Categories
  // ==========================================

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    menuGroups,
    setMenuGroups,
  ] = useState([]);

  const [
    subCategories,
    setSubCategories,
  ] = useState([]);

  const [
    filteredMenuGroups,
    setFilteredMenuGroups,
  ] = useState([]);

  const [
    filteredSubCategories,
    setFilteredSubCategories,
  ] = useState([]);

  // ==========================================
  // Dynamic Attributes
  // ==========================================

  const [
    dynamicFilters,
    setDynamicFilters,
  ] = useState([]);

  const [
    attributes,
    setAttributes,
  ] = useState({});

  // ==========================================
  // Product Highlights
  // Maximum 8
  // ==========================================

  const [
    highlights,
    setHighlights,
  ] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  // ==========================================
  // Product Form
  // ==========================================

  const [
    form,
    setForm,
  ] = useState({
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

    // Legacy fields
    // Existing products compatibility

    fabric: "",
    pattern: "",
    occasion: "",

    country: "India",

    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
    isBestSelling: false,

    status: "active",
  });

  // ==========================================
  // Load Categories / Groups / Subcategories
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          catRes,
          menuRes,
          subRes,
        ] = await Promise.all([
          getCategories(),
          getMenuGroups(),
          getSubCategories(),
        ]);

        setCategories(
          catRes?.data || []
        );

        setMenuGroups(
          menuRes?.data || []
        );

        setSubCategories(
          subRes?.data || []
        );
      } catch (error) {
        console.error(
          "Failed to load category data:",
          error
        );
      }
    };

    loadData();
  }, []);

  // ==========================================
  // Cleanup Image Preview URLs
  // ==========================================

  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(
          thumbnailPreview
        );
      }

      additionalPreviews.forEach(
        (preview) => {
          URL.revokeObjectURL(
            preview
          );
        }
      );
    };
  }, [
    thumbnailPreview,
    additionalPreviews,
  ]);

  // ==========================================
  // Load Dynamic Attributes By SubCategory
  // ==========================================

  const loadDynamicFilters = async (
    subCategoryId
  ) => {
    try {
      if (!subCategoryId) {
        setDynamicFilters([]);
        return;
      }

      const res =
        await getFiltersBySubCategory(
          subCategoryId
        );

      console.log(
        "SubCategory Attributes:",
        res?.filters
      );

      setDynamicFilters(
        res?.filters || []
      );
    } catch (error) {
      console.error(
        "Failed to load attributes:",
        error
      );

      setDynamicFilters([]);
    }
  };

  // ==========================================
  // Handle Normal Form Change
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    // ========================================
    // Checkbox
    // ========================================

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    // ========================================
    // Category Changed
    // ========================================

    if (name === "category") {
      const menus =
        menuGroups.filter(
          (item) =>
            item.category?._id ===
              value ||
            item.category === value
        );

      setFilteredMenuGroups(
        menus
      );

      setFilteredSubCategories(
        []
      );

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

    // ========================================
    // Menu Group Changed
    // ========================================

    if (name === "menuGroup") {
      const subs =
        subCategories.filter(
          (item) =>
            item.menuGroup?._id ===
              value ||
            item.menuGroup === value
        );

      setFilteredSubCategories(
        subs
      );

      setDynamicFilters([]);

      setAttributes({});

      setForm((prev) => ({
        ...prev,

        menuGroup: value,

        subCategory: "",
      }));

      return;
    }

    // ========================================
    // Sub Category Changed
    // ========================================

    if (
      name === "subCategory"
    ) {
      setForm((prev) => ({
        ...prev,
        subCategory: value,
      }));

      setAttributes({});

      loadDynamicFilters(
        value
      );

      return;
    }

    // ========================================
    // Normal Input
    // ========================================

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Dynamic Attribute Change
  // ==========================================

  const handleAttributeChange = (
    key,
    value
  ) => {
    setAttributes((prev) => {
      const updated = {
        ...prev,
      };

      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        delete updated[key];
      } else {
        updated[key] = value;
      }

      return updated;
    });
  };

  // ==========================================
  // Validate Image
  // ==========================================

  const validateImage = (
    file
  ) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      alert(
        "Only JPG, PNG and WebP images are allowed."
      );

      return false;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (
      file.size > maxSize
    ) {
      alert(
        `${file.name} is larger than 5 MB.`
      );

      return false;
    }

    return true;
  };

  // ==========================================
  // Main Image Change
  // ==========================================

  const handleThumbnail = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !validateImage(file)
    ) {
      e.target.value = "";
      return;
    }

    if (thumbnailPreview) {
      URL.revokeObjectURL(
        thumbnailPreview
      );
    }

    setThumbnail(file);

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };

  // ==========================================
  // Remove Main Image
  // ==========================================

  const removeThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(
        thumbnailPreview
      );
    }

    setThumbnail(null);

    setThumbnailPreview("");
  };

  // ==========================================
  // Additional Images Change
  // ==========================================

  const handleAdditionalImages = (
    e
  ) => {
    const selectedFiles =
      Array.from(
        e.target.files || []
      );

    if (
      selectedFiles.length === 0
    ) {
      return;
    }

    const validFiles =
      selectedFiles.filter(
        validateImage
      );

    const availableSlots =
      4 -
      additionalImages.length;

    if (
      availableSlots <= 0
    ) {
      alert(
        "Maximum 4 additional product images are allowed."
      );

      e.target.value = "";
      return;
    }

    const filesToAdd =
      validFiles.slice(
        0,
        availableSlots
      );

    if (
      validFiles.length >
      availableSlots
    ) {
      alert(
        `Only ${availableSlots} more image(s) can be added. Maximum 4 additional images are allowed.`
      );
    }

    const previews =
      filesToAdd.map(
        (file) =>
          URL.createObjectURL(
            file
          )
      );

    setAdditionalImages(
      (prev) => [
        ...prev,
        ...filesToAdd,
      ]
    );

    setAdditionalPreviews(
      (prev) => [
        ...prev,
        ...previews,
      ]
    );

    e.target.value = "";
  };

  // ==========================================
  // Remove Additional Image
  // ==========================================

  const removeAdditionalImage = (
    index
  ) => {
    setAdditionalPreviews(
      (prev) => {
        const preview =
          prev[index];

        if (preview) {
          URL.revokeObjectURL(
            preview
          );
        }

        return prev.filter(
          (_, itemIndex) =>
            itemIndex !== index
        );
      }
    );

    setAdditionalImages(
      (prev) =>
        prev.filter(
          (_, itemIndex) =>
            itemIndex !== index
        )
    );
  };

  // ==========================================
  // Highlight Change
  // ==========================================

  const handleHighlightChange = (
    index,
    field,
    value
  ) => {
    setHighlights((prev) =>
      prev.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [field]: value,
              }
            : item
      )
    );
  };

  // ==========================================
  // Add Highlight
  // ==========================================

  const addHighlight = () => {
    if (
      highlights.length >= 8
    ) {
      alert(
        "Maximum 8 product highlights are allowed."
      );

      return;
    }

    setHighlights((prev) => [
      ...prev,
      {
        label: "",
        value: "",
      },
    ]);
  };

  // ==========================================
  // Remove Highlight
  // ==========================================

  const removeHighlight = (
    index
  ) => {
    setHighlights((prev) => {
      if (prev.length === 1) {
        return [
          {
            label: "",
            value: "",
          },
        ];
      }

      return prev.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );
    });
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    // ========================================
    // Main Image Required
    // ========================================

    if (!thumbnail) {
      alert(
        "Please upload the main product image."
      );

      return;
    }

    // ========================================
    // Clean Highlights
    // ========================================

    const cleanHighlights =
      highlights
        .map((item) => ({
          label:
            item.label.trim(),

          value:
            item.value.trim(),
        }))
        .filter(
          (item) =>
            item.label &&
            item.value
        );

    try {
      setLoading(true);

      const formData =
        new FormData();

      // ======================================
      // Normal Form Fields
      // ======================================

      Object.entries(
        form
      ).forEach(
        ([key, value]) => {
          formData.append(
            key,
            value
          );
        }
      );

      // ======================================
      // Dynamic Attributes
      // ======================================

      formData.append(
        "attributes",
        JSON.stringify(
          attributes
        )
      );

      // ======================================
      // Product Highlights
      // ======================================

      formData.append(
        "highlights",
        JSON.stringify(
          cleanHighlights
        )
      );

      // ======================================
      // Main Image
      // ======================================

      formData.append(
        "thumbnail",
        thumbnail
      );

      // ======================================
      // Additional Images
      // Same field name for all 4 images
      // ======================================

      additionalImages.forEach(
        (file) => {
          formData.append(
            "images",
            file
          );
        }
      );

      // ======================================
      // Create Product
      // ======================================

      const res =
        await createProduct(
          formData
        );

      alert(
        res?.message ||
          "Product added successfully."
      );

      navigate(
        "/admin/products"
      );
    } catch (err) {
      console.error(
        "Product creation failed:",
        err
      );

      alert(
        err?.response?.data
          ?.message ||
          "Product creation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PART B STARTS FROM RETURN
  // ==========================================

    return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">

        {/* ======================================
            SIDEBAR
        ====================================== */}

        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* ======================================
            MAIN CONTENT
        ====================================== */}

        <div className="flex-1 min-w-0 flex flex-col">

          {/* Navbar */}

          <AdminNavbar
            setSidebarOpen={setSidebarOpen}
          />

          {/* ====================================
              PAGE
          ==================================== */}

          <main
            className="
              flex-1
              p-3
              sm:p-5
              lg:p-8
            "
          >
            <div className="max-w-[1500px] mx-auto">

              {/* ==================================
                  PAGE HEADING
              ================================== */}

              <div
                className="
                  mb-6
                  sm:mb-8

                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between

                  gap-4
                "
              >
                <div>
                  <h1
                    className="
                      text-2xl
                      sm:text-3xl
                      font-bold
                      text-slate-800
                    "
                  >
                    Add Product
                  </h1>

                  <p
                    className="
                      mt-1
                      sm:mt-2

                      text-sm
                      sm:text-base

                      text-gray-500
                    "
                  >
                    Add product details, specifications,
                    highlights and product images.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/products")
                  }
                  className="
                    self-start

                    px-4
                    py-2.5

                    rounded-xl

                    border
                    border-gray-300

                    bg-white

                    text-sm
                    font-semibold
                    text-gray-700

                    hover:bg-gray-50

                    transition
                  "
                >
                  ← Back to Products
                </button>
              </div>

              {/* ==================================
                  FORM
              ================================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* ==================================
                    BASIC INFORMATION
                ================================== */}

                <section
                  className="
                    bg-white

                    border
                    border-gray-200

                    rounded-2xl

                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div className="mb-6">
                    <h2
                      className="
                        text-lg
                        sm:text-xl

                        font-bold
                        text-gray-800
                      "
                    >
                      Basic Information
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-gray-500
                      "
                    >
                      Enter the basic information about
                      this product.
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      gap-5
                    "
                  >
                    {/* Product Title */}

                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        "
                      >
                        Product Title *
                      </label>

                      <input
                        type="text"
                        name="title"
                        placeholder="Enter product title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="
                          w-full
                          h-12

                          border
                          border-gray-300

                          rounded-xl

                          px-4

                          outline-none

                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
                      />
                    </div>

                    {/* Brand */}

                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        "
                      >
                        Brand *
                      </label>

                      <input
                        type="text"
                        name="brand"
                        placeholder="Enter brand name"
                        value={form.brand}
                        onChange={handleChange}
                        required
                        className="
                          w-full
                          h-12

                          border
                          border-gray-300

                          rounded-xl

                          px-4

                          outline-none

                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
                      />
                    </div>

                    {/* Category */}

                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        "
                      >
                        Category *
                      </label>

                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="
                          w-full
                          h-12

                          border
                          border-gray-300

                          rounded-xl

                          px-4

                          bg-white

                          outline-none

                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
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
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        "
                      >
                        Menu Group *
                      </label>

                      <select
                        name="menuGroup"
                        value={form.menuGroup}
                        onChange={handleChange}
                        disabled={!form.category}
                        required
                        className="
                          w-full
                          h-12

                          border
                          border-gray-300

                          rounded-xl

                          px-4

                          bg-white

                          outline-none

                          disabled:bg-gray-100
                          disabled:cursor-not-allowed

                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
                      >
                        <option value="">
                          Select Menu Group
                        </option>

                        {filteredMenuGroups.map(
                          (item) => (
                            <option
                              key={item._id}
                              value={item._id}
                            >
                              {item.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* Sub Category */}

                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        "
                      >
                        Sub Category *
                      </label>

                      <select
                        name="subCategory"
                        value={form.subCategory}
                        onChange={handleChange}
                        disabled={!form.menuGroup}
                        required
                        className="
                          w-full
                          h-12

                          border
                          border-gray-300

                          rounded-xl

                          px-4

                          bg-white

                          outline-none

                          disabled:bg-gray-100
                          disabled:cursor-not-allowed

                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
                      >
                        <option value="">
                          Select Sub Category
                        </option>

                        {filteredSubCategories.map(
                          (item) => (
                            <option
                              key={item._id}
                              value={item._id}
                            >
                              {item.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* SKU */}

                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        "
                      >
                        SKU
                      </label>

                      <input
                        type="text"
                        name="sku"
                        placeholder="Example: WATCH-001"
                        value={form.sku}
                        onChange={handleChange}
                        className="
                          w-full
                          h-12

                          border
                          border-gray-300

                          rounded-xl

                          px-4

                          outline-none

                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
                      />
                    </div>
                  </div>
                </section>

                {/* ==================================
                    PRICE & INVENTORY
                ================================== */}

                <section
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div className="mb-6">
                    <h2
                      className="
                        text-lg
                        sm:text-xl
                        font-bold
                        text-gray-800
                      "
                    >
                      Price & Inventory
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Set pricing, discount and available
                      stock.
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-4
                      gap-5
                    "
                  >
                    {/* Price */}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Selling Price *
                      </label>

                      <input
                        type="number"
                        min="0"
                        name="price"
                        placeholder="₹ Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="
                          w-full
                          h-12
                          border
                          rounded-xl
                          px-4
                          outline-none
                          focus:ring-2
                          focus:ring-green-100
                          focus:border-green-500
                        "
                      />
                    </div>

                    {/* Old Price */}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        MRP / Old Price
                      </label>

                      <input
                        type="number"
                        min="0"
                        name="oldPrice"
                        placeholder="₹ MRP"
                        value={form.oldPrice}
                        onChange={handleChange}
                        className="
                          w-full
                          h-12
                          border
                          rounded-xl
                          px-4
                          outline-none
                          focus:ring-2
                          focus:ring-green-100
                          focus:border-green-500
                        "
                      />
                    </div>

                    {/* Discount */}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Discount %
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="discount"
                        placeholder="Example: 25"
                        value={form.discount}
                        onChange={handleChange}
                        className="
                          w-full
                          h-12
                          border
                          rounded-xl
                          px-4
                          outline-none
                          focus:ring-2
                          focus:ring-green-100
                          focus:border-green-500
                        "
                      />
                    </div>

                    {/* Stock */}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stock
                      </label>

                      <input
                        type="number"
                        min="0"
                        name="stock"
                        placeholder="Available stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="
                          w-full
                          h-12
                          border
                          rounded-xl
                          px-4
                          outline-none
                          focus:ring-2
                          focus:ring-green-100
                          focus:border-green-500
                        "
                      />
                    </div>
                  </div>
                </section>

                {/* ==================================
                    VARIANTS
                ================================== */}

                <section
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Product Variants
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Fill these only when applicable to
                      this product.
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      gap-5
                    "
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sizes
                      </label>

                      <input
                        type="text"
                        name="sizes"
                        placeholder="S, M, L, XL"
                        value={form.sizes}
                        onChange={handleChange}
                        className="
                          w-full
                          h-12
                          border
                          rounded-xl
                          px-4
                          outline-none
                          focus:ring-2
                          focus:ring-green-100
                          focus:border-green-500
                        "
                      />

                      <p className="text-xs text-gray-400 mt-2">
                        Separate multiple sizes using commas.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Colors
                      </label>

                      <input
                        type="text"
                        name="colors"
                        placeholder="Black, Blue, Green"
                        value={form.colors}
                        onChange={handleChange}
                        className="
                          w-full
                          h-12
                          border
                          rounded-xl
                          px-4
                          outline-none
                          focus:ring-2
                          focus:ring-green-100
                          focus:border-green-500
                        "
                      />

                      <p className="text-xs text-gray-400 mt-2">
                        Separate multiple colors using commas.
                      </p>
                    </div>
                  </div>
                </section>

                {/* ==================================
                    DYNAMIC ATTRIBUTES
                ================================== */}

                {form.subCategory && (
                  <section
                    className="
                      bg-white
                      border
                      border-gray-200
                      rounded-2xl
                      shadow-sm

                      p-4
                      sm:p-6
                    "
                  >
                    <div className="mb-6">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Product Specifications
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        These fields are automatically
                        generated according to the selected
                        sub category.
                      </p>
                    </div>

                    {dynamicFilters.length > 0 ? (
                      <DynamicAttributes
                        filters={dynamicFilters}
                        attributes={attributes}
                        onChange={
                          handleAttributeChange
                        }
                      />
                    ) : (
                      <div
                        className="
                          rounded-xl
                          border
                          border-dashed
                          border-gray-300

                          p-6

                          text-center
                          text-sm
                          text-gray-500
                        "
                      >
                        No dynamic specifications configured
                        for this sub category.
                      </div>
                    )}
                  </section>
                )}

                {/* ==================================
                    LEGACY / GENERAL INFORMATION
                ================================== */}

                <section
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Additional Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Optional general product information.
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-4
                      gap-5
                    "
                  >
                    <input
                      type="text"
                      name="fabric"
                      placeholder="Fabric (if applicable)"
                      value={form.fabric}
                      onChange={handleChange}
                      className="h-12 border rounded-xl px-4 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
                    />

                    <input
                      type="text"
                      name="pattern"
                      placeholder="Pattern (if applicable)"
                      value={form.pattern}
                      onChange={handleChange}
                      className="h-12 border rounded-xl px-4 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
                    />

                    <input
                      type="text"
                      name="occasion"
                      placeholder="Occasion (if applicable)"
                      value={form.occasion}
                      onChange={handleChange}
                      className="h-12 border rounded-xl px-4 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
                    />

                    <input
                      type="text"
                      name="country"
                      placeholder="Country of Origin"
                      value={form.country}
                      onChange={handleChange}
                      className="h-12 border rounded-xl px-4 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
                    />
                  </div>
                </section>

                {/* ==================================
                    PRODUCT HIGHLIGHTS
                ================================== */}

                <section
                  className="
                    bg-white

                    border
                    border-gray-200

                    rounded-2xl

                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row

                      sm:items-start
                      sm:justify-between

                      gap-4

                      mb-6
                    "
                  >
                    <div>
                      <h2
                        className="
                          text-lg
                          sm:text-xl

                          font-bold
                          text-gray-800
                        "
                      >
                        Product Highlights
                      </h2>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-gray-500
                        "
                      >
                        Add the most important features
                        customers should see immediately.
                      </p>

                      <p
                        className="
                          mt-2
                          text-xs
                          font-medium
                          text-green-700
                        "
                      >
                        Recommended: 4–8 highlights
                      </p>
                    </div>

                    <span
                      className="
                        self-start

                        bg-green-50
                        text-green-700

                        border
                        border-green-200

                        px-3
                        py-1.5

                        rounded-full

                        text-xs
                        font-semibold
                      "
                    >
                      {highlights.length}/8
                    </span>
                  </div>

                  {/* Examples */}

                  <div
                    className="
                      mb-5

                      rounded-xl

                      bg-slate-50

                      border
                      border-slate-200

                      p-4
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      Examples
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-gray-500
                        leading-6
                      "
                    >
                      Smartwatch: Display, Battery,
                      Bluetooth, Water Resistance •
                      Clothing: Fabric, Fit, Sleeve,
                      Pattern • Mobile: RAM, Storage,
                      Processor, Camera
                    </p>
                  </div>

                  {/* Highlight Rows */}

                  <div className="space-y-3">
                    {highlights.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="
                            grid
                            grid-cols-1
                            sm:grid-cols-[1fr_1.5fr_auto]

                            gap-3

                            items-center
                          "
                        >
                          {/* Label */}

                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) =>
                              handleHighlightChange(
                                index,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="Label e.g. Battery"
                            className="
                              w-full
                              h-12

                              border
                              border-gray-300

                              rounded-xl

                              px-4

                              outline-none

                              focus:border-green-500
                              focus:ring-2
                              focus:ring-green-100
                            "
                          />

                          {/* Value */}

                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) =>
                              handleHighlightChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                            placeholder="Value e.g. Up to 7 Days"
                            className="
                              w-full
                              h-12

                              border
                              border-gray-300

                              rounded-xl

                              px-4

                              outline-none

                              focus:border-green-500
                              focus:ring-2
                              focus:ring-green-100
                            "
                          />

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              removeHighlight(
                                index
                              )
                            }
                            className="
                              h-12

                              px-4

                              rounded-xl

                              border
                              border-red-200

                              bg-red-50

                              text-red-600

                              font-semibold
                              text-sm

                              hover:bg-red-100

                              transition
                            "
                          >
                            Remove
                          </button>
                        </div>
                      )
                    )}
                  </div>

                  {/* Add Highlight */}

                  <button
                    type="button"
                    onClick={addHighlight}
                    disabled={
                      highlights.length >= 8
                    }
                    className="
                      mt-5

                      w-full
                      sm:w-auto

                      px-5
                      py-3

                      rounded-xl

                      border
                      border-green-300

                      bg-green-50

                      text-green-700

                      text-sm
                      font-semibold

                      hover:bg-green-100

                      disabled:opacity-50
                      disabled:cursor-not-allowed

                      transition
                    "
                  >
                    + Add Highlight
                  </button>
                </section>

                {/* ==================================
                    DESCRIPTION
                ================================== */}

                <section
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div className="mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Product Description
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Write detailed information about the
                      product.
                    </p>
                  </div>

                  <textarea
                    name="description"
                    placeholder="Enter product description..."
                    value={form.description}
                    onChange={handleChange}
                    rows={7}
                    required
                    className="
                      w-full

                      border
                      border-gray-300

                      rounded-xl

                      p-4

                      resize-y

                      outline-none

                      focus:border-green-500
                      focus:ring-2
                      focus:ring-green-100
                    "
                  />
                </section>

                {/* ==================================
                    PRODUCT IMAGES
                ================================== */}

                <section
                  className="
                    bg-white

                    border
                    border-gray-200

                    rounded-2xl

                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div className="mb-6">
                    <h2
                      className="
                        text-lg
                        sm:text-xl

                        font-bold
                        text-gray-800
                      "
                    >
                      Product Images
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-gray-500
                      "
                    >
                      Upload one main product image and up
                      to four additional angle images.
                    </p>
                  </div>

                  {/* Image position guide */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      sm:grid-cols-3
                      lg:grid-cols-5

                      gap-3

                      mb-7
                    "
                  >
                    {[
                      "1. Main / Front",
                      "2. Side View",
                      "3. Back View",
                      "4. Detail View",
                      "5. Alternate Angle",
                    ].map((label) => (
                      <div
                        key={label}
                        className="
                          min-h-[72px]

                          flex
                          items-center
                          justify-center

                          text-center

                          px-3

                          rounded-xl

                          border
                          border-dashed
                          border-green-300

                          bg-green-50

                          text-xs
                          sm:text-sm

                          font-semibold
                          text-green-800
                        "
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      xl:grid-cols-[1.5fr_1fr]

                      gap-7
                      xl:gap-10
                    "
                  >
                    {/* ==============================
                        LEFT - IMAGE UPLOAD
                    ============================== */}

                    <div className="space-y-7">

                      {/* Main Image */}

                      <div>
                        <div
                          className="
                            flex
                            items-center
                            justify-between

                            gap-3

                            mb-3
                          "
                        >
                          <label
                            className="
                              text-sm
                              font-semibold
                              text-gray-700
                            "
                          >
                            Main Product Image *
                          </label>

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-green-700
                            "
                          >
                            Required
                          </span>
                        </div>

                        {!thumbnailPreview ? (
                          <label
                            htmlFor="thumbnail"
                            className="
                              min-h-[260px]
                              sm:min-h-[320px]

                              w-full

                              flex
                              flex-col
                              items-center
                              justify-center

                              border-2
                              border-dashed
                              border-green-300

                              rounded-2xl

                              bg-green-50

                              cursor-pointer

                              hover:bg-green-100
                              hover:border-green-500

                              transition

                              px-5
                            "
                          >
                            <div
                              className="
                                text-5xl
                                sm:text-6xl
                                mb-4
                              "
                            >
                              📷
                            </div>

                            <h3
                              className="
                                text-base
                                sm:text-lg

                                font-bold
                                text-gray-700

                                text-center
                              "
                            >
                              Upload Main Product Image
                            </h3>

                            <p
                              className="
                                text-sm
                                text-gray-500

                                text-center

                                mt-2
                              "
                            >
                              Front / primary view of the
                              product
                            </p>

                            <p
                              className="
                                text-xs
                                text-gray-400

                                mt-4
                              "
                            >
                              JPG • PNG • WebP • Max 5 MB
                            </p>
                          </label>
                        ) : (
                          <div
                            className="
                              relative

                              min-h-[320px]

                              border
                              border-gray-200

                              rounded-2xl

                              bg-gray-50

                              overflow-hidden

                              p-4
                            "
                          >
                            <img
                              src={
                                thumbnailPreview
                              }
                              alt="Main product preview"
                              className="
                                w-full
                                h-[300px]

                                object-contain

                                bg-white

                                rounded-xl
                              "
                            />

                            <div
                              className="
                                absolute
                                top-6
                                left-6

                                bg-green-600
                                text-white

                                px-3
                                py-1.5

                                rounded-full

                                text-xs
                                font-bold
                              "
                            >
                              MAIN
                            </div>

                            <button
                              type="button"
                              onClick={
                                removeThumbnail
                              }
                              className="
                                absolute
                                top-6
                                right-6

                                bg-white
                                text-red-600

                                border
                                border-red-200

                                px-3
                                py-2

                                rounded-lg

                                text-xs
                                font-bold

                                shadow-sm

                                hover:bg-red-50
                              "
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        <input
                          id="thumbnail"
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={
                            handleThumbnail
                          }
                        />

                        {thumbnail && (
                          <div
                            className="
                              mt-3

                              rounded-xl

                              border

                              bg-gray-50

                              p-3

                              text-xs
                              sm:text-sm

                              flex
                              flex-col
                              sm:flex-row

                              sm:items-center
                              sm:justify-between

                              gap-2
                            "
                          >
                            <span
                              className="
                                text-gray-600
                                break-all
                              "
                            >
                              {thumbnail.name}
                            </span>

                            <span
                              className="
                                font-semibold
                                text-green-700

                                shrink-0
                              "
                            >
                              {(
                                thumbnail.size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ============================
                          ADDITIONAL IMAGES
                      ============================ */}

                      <div>
                        <div
                          className="
                            flex
                            flex-col
                            sm:flex-row

                            sm:items-center
                            sm:justify-between

                            gap-2

                            mb-3
                          "
                        >
                          <div>
                            <h3
                              className="
                                text-sm
                                font-semibold
                                text-gray-700
                              "
                            >
                              Additional Product Images
                            </h3>

                            <p
                              className="
                                text-xs
                                text-gray-500
                                mt-1
                              "
                            >
                              Upload side, back, detail and
                              alternate angle views.
                            </p>
                          </div>

                          <span
                            className="
                              text-xs
                              font-semibold

                              bg-gray-100

                              px-3
                              py-1.5

                              rounded-full
                            "
                          >
                            {additionalImages.length}/4
                          </span>
                        </div>

                        {/* Additional preview grid */}

                        {additionalPreviews.length >
                          0 && (
                          <div
                            className="
                              grid
                              grid-cols-2
                              sm:grid-cols-4

                              gap-3

                              mb-4
                            "
                          >
                            {additionalPreviews.map(
                              (
                                preview,
                                index
                              ) => (
                                <div
                                  key={preview}
                                  className="
                                    relative

                                    aspect-square

                                    rounded-xl

                                    border
                                    border-gray-200

                                    bg-gray-50

                                    overflow-hidden
                                  "
                                >
                                  <img
                                    src={preview}
                                    alt={`Product angle ${
                                      index + 1
                                    }`}
                                    className="
                                      w-full
                                      h-full

                                      object-contain

                                      p-2

                                      bg-white
                                    "
                                  />

                                  <div
                                    className="
                                      absolute
                                      left-2
                                      bottom-2

                                      bg-black/70
                                      text-white

                                      px-2
                                      py-1

                                      rounded

                                      text-[10px]
                                      font-semibold
                                    "
                                  >
                                    View {index + 2}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeAdditionalImage(
                                        index
                                      )
                                    }
                                    className="
                                      absolute
                                      top-2
                                      right-2

                                      w-7
                                      h-7

                                      flex
                                      items-center
                                      justify-center

                                      rounded-full

                                      bg-white
                                      text-red-600

                                      shadow

                                      text-sm
                                      font-bold

                                      hover:bg-red-50
                                    "
                                    aria-label="Remove image"
                                  >
                                    ×
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {/* Add additional */}

                        {additionalImages.length <
                          4 && (
                          <label
                            htmlFor="additionalImages"
                            className="
                              min-h-[130px]

                              flex
                              flex-col
                              items-center
                              justify-center

                              border-2
                              border-dashed
                              border-gray-300

                              rounded-xl

                              bg-gray-50

                              cursor-pointer

                              hover:border-green-400
                              hover:bg-green-50

                              transition

                              px-4
                            "
                          >
                            <span
                              className="
                                text-3xl
                                mb-2
                              "
                            >
                              ＋
                            </span>

                            <span
                              className="
                                text-sm
                                font-semibold
                                text-gray-700
                              "
                            >
                              Add Additional Images
                            </span>

                            <span
                              className="
                                text-xs
                                text-gray-400
                                mt-1
                                text-center
                              "
                            >
                              You can select multiple images
                              at once
                            </span>
                          </label>
                        )}

                        <input
                          id="additionalImages"
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={
                            handleAdditionalImages
                          }
                        />
                      </div>
                    </div>

                    {/* ==============================
                        RIGHT - GUIDELINES
                    ============================== */}

                    <div>
                      <div className="xl:sticky xl:top-24">
                        <ImageGuidelines
                          title="Product Images"
                          recommended="1000 × 1000 px"
                          minimum="800 × 800 px"
                          ratio="1 : 1 Square"
                          format="JPG, PNG, WebP"
                          maxSize="5 MB each"
                          note="Use the same 1:1 image ratio for all five product images. Keep the product centered with a clean or white background."
                        />

                        {/* Additional guideline */}

                        <div
                          className="
                            mt-5

                            rounded-2xl

                            border
                            border-blue-200

                            bg-blue-50

                            p-5
                          "
                        >
                          <h3
                            className="
                              font-bold
                              text-blue-900
                            "
                          >
                            Recommended Views
                          </h3>

                          <div
                            className="
                              mt-4

                              space-y-2

                              text-sm
                              text-blue-800
                            "
                          >
                            <p>1. Main / Front View</p>
                            <p>2. Side View</p>
                            <p>3. Back View</p>
                            <p>4. Close-up / Detail View</p>
                            <p>5. Alternate Angle</p>
                          </div>

                          <p
                            className="
                              mt-4

                              text-xs
                              leading-5

                              text-blue-700
                            "
                          >
                            All images should preferably
                            have the same dimensions so the
                            customer gallery does not jump
                            while switching images.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ==================================
                    HOMEPAGE VISIBILITY
                ================================== */}

                <section
                  className="
                    bg-white

                    border
                    border-gray-200

                    rounded-2xl

                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div className="mb-6">
                    <h2
                      className="
                        text-lg
                        sm:text-xl

                        font-bold
                        text-gray-800
                      "
                    >
                      Homepage Visibility
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-gray-500
                      "
                    >
                      Select where this product should
                      appear on the homepage.
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      xl:grid-cols-4

                      gap-4
                    "
                  >
                    {/* Trending */}

                    <label
                      className="
                        flex
                        items-center
                        gap-3

                        rounded-xl

                        border
                        border-gray-200

                        bg-gray-50

                        p-4

                        cursor-pointer

                        hover:border-green-300
                      "
                    >
                      <input
                        type="checkbox"
                        name="isTrending"
                        checked={
                          form.isTrending
                        }
                        onChange={handleChange}
                        className="
                          w-5
                          h-5
                          accent-green-600
                        "
                      />

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-gray-700
                        "
                      >
                        🔥 Trending
                      </span>
                    </label>

                    {/* Featured */}

                    <label
                      className="
                        flex
                        items-center
                        gap-3

                        rounded-xl

                        border
                        border-gray-200

                        bg-gray-50

                        p-4

                        cursor-pointer

                        hover:border-green-300
                      "
                    >
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={
                          form.isFeatured
                        }
                        onChange={handleChange}
                        className="
                          w-5
                          h-5
                          accent-green-600
                        "
                      />

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-gray-700
                        "
                      >
                        ⭐ Featured
                      </span>
                    </label>

                    {/* New Arrival */}

                    <label
                      className="
                        flex
                        items-center
                        gap-3

                        rounded-xl

                        border
                        border-gray-200

                        bg-gray-50

                        p-4

                        cursor-pointer

                        hover:border-green-300
                      "
                    >
                      <input
                        type="checkbox"
                        name="isNewArrival"
                        checked={
                          form.isNewArrival
                        }
                        onChange={handleChange}
                        className="
                          w-5
                          h-5
                          accent-green-600
                        "
                      />

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-gray-700
                        "
                      >
                        🆕 New Arrival
                      </span>
                    </label>

                    {/* Best Selling */}

                    <label
                      className="
                        flex
                        items-center
                        gap-3

                        rounded-xl

                        border
                        border-gray-200

                        bg-gray-50

                        p-4

                        cursor-pointer

                        hover:border-green-300
                      "
                    >
                      <input
                        type="checkbox"
                        name="isBestSelling"
                        checked={
                          form.isBestSelling
                        }
                        onChange={handleChange}
                        className="
                          w-5
                          h-5
                          accent-green-600
                        "
                      />

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-gray-700
                        "
                      >
                        🏆 Best Selling
                      </span>
                    </label>
                  </div>
                </section>

                {/* ==================================
                    STATUS
                ================================== */}

                <section
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-sm

                    p-4
                    sm:p-6
                  "
                >
                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      gap-5
                      items-end
                    "
                  >
                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        "
                      >
                        Product Status
                      </label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="
                          w-full
                          h-12

                          border
                          border-gray-300

                          rounded-xl

                          bg-white

                          px-4

                          outline-none

                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
                      >
                        <option value="active">
                          Active
                        </option>

                        <option value="draft">
                          Draft
                        </option>
                      </select>
                    </div>

                    <div
                      className="
                        rounded-xl

                        bg-gray-50

                        border

                        px-4
                        py-3

                        text-sm
                        text-gray-500
                      "
                    >
                      Active products can be shown to
                      customers. Draft products remain
                      hidden until activated.
                    </div>
                  </div>
                </section>

                {/* ==================================
                    SUBMIT ACTIONS
                ================================== */}

                <div
                  className="
                    sticky
                    bottom-0
                    z-30

                    -mx-3
                    sm:mx-0

                    bg-white/95
                    backdrop-blur

                    border
                    border-gray-200

                    shadow-lg

                    p-3
                    sm:p-4

                    rounded-t-2xl
                    sm:rounded-2xl
                  "
                >
                  <div
                    className="
                      flex
                      flex-col-reverse
                      sm:flex-row

                      gap-3

                      sm:justify-end
                    "
                  >
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        navigate(
                          "/admin/products"
                        )
                      }
                      className="
                        w-full
                        sm:w-auto

                        min-w-[150px]

                        h-12

                        rounded-xl

                        border
                        border-gray-300

                        bg-white

                        font-semibold
                        text-gray-700

                        hover:bg-gray-50

                        disabled:opacity-50

                        transition
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        w-full
                        sm:w-auto

                        min-w-[200px]

                        h-12

                        rounded-xl

                        bg-green-600
                        text-white

                        font-bold

                        hover:bg-green-700

                        disabled:bg-gray-400
                        disabled:cursor-not-allowed

                        transition
                      "
                    >
                      {loading
                        ? "Adding Product..."
                        : "Add Product"}
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

export default AddProduct;