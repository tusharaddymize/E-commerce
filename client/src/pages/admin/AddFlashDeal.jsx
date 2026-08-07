import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiImage,
  FiPlus,
  FiSearch,
  FiX,
  FiCheck,
  FiPackage,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  createFlashDeal,
} from "../../services/flashDealService";

import {
  getFlashDealProducts,
} from "../../services/productService";

// ==========================================
// Add Flash Deal
// ==========================================

const AddFlashDeal = () => {
  const navigate = useNavigate();

  // ==========================================
  // Form State
  // ==========================================

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "View All Deals",
    buttonLink: "/flash-deals",
    endDate: "",
    backgroundColor: "#355E3B",
    isActive: true,
  });

  // ==========================================
  // Banner
  // ==========================================

  const [banner, setBanner] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  // ==========================================
  // Products
  // ==========================================

  const [products, setProducts] =
    useState([]);

  const [
    selectedProducts,
    setSelectedProducts,
  ] = useState([]);

  const [productSearch, setProductSearch] =
    useState("");

  const [
    productsLoading,
    setProductsLoading,
  ] = useState(true);

  const [
    productsError,
    setProductsError,
  ] = useState("");

  // ==========================================
  // Submit Loading
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Load Products
  // ==========================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError("");

const response =
  await getFlashDealProducts({
    page: 1,
    limit: 100,
    sort: "latest",
  });

        /*
          Supports responses like:

          {
            success: true,
            products: [...]
          }

          OR

          {
            data: [...]
          }

          OR

          [...]
        */

        let productList = [];

        if (Array.isArray(response)) {
          productList = response;
        } else if (
          Array.isArray(response?.products)
        ) {
          productList =
            response.products;
        } else if (
          Array.isArray(response?.data)
        ) {
          productList =
            response.data;
        } else if (
          Array.isArray(
            response?.data?.products
          )
        ) {
          productList =
            response.data.products;
        }

        setProducts(productList);
      } catch (error) {
        console.error(
          "Load Products Error:",
          error
        );

        setProductsError(
          "Failed to load products."
        );
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ==========================================
  // Input Change
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // Banner Change
  // ==========================================

  const handleBanner = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    // Optional validation
    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "Please select an image file."
      );

      return;
    }

    // 5MB
    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Banner image must be less than 5MB."
      );

      return;
    }

    setBanner(file);

    const imageUrl =
      URL.createObjectURL(file);

    setPreview((oldPreview) => {
      if (
        oldPreview?.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          oldPreview
        );
      }

      return imageUrl;
    });
  };

  // ==========================================
  // Cleanup Banner Preview
  // ==========================================

  useEffect(() => {
    return () => {
      if (
        preview?.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          preview
        );
      }
    };
  }, [preview]);

  // ==========================================
  // Product ID Helper
  // ==========================================

  const getProductId = (
    product
  ) => {
    return String(
      product?._id ||
        product?.id ||
        ""
    );
  };

  // ==========================================
  // Is Product Selected
  // ==========================================

  const isProductSelected = (
    product
  ) => {
    const id =
      getProductId(product);

    return selectedProducts.includes(
      id
    );
  };

  // ==========================================
  // Toggle Product
  // ==========================================

  const toggleProduct = (
    product
  ) => {
    const id =
      getProductId(product);

    if (!id) return;

    setSelectedProducts(
      (prev) => {
        if (
          prev.includes(id)
        ) {
          return prev.filter(
            (productId) =>
              productId !== id
          );
        }

        return [
          ...prev,
          id,
        ];
      }
    );
  };

  // ==========================================
  // Remove Selected Product
  // ==========================================

  const removeSelectedProduct = (
    id
  ) => {
    setSelectedProducts(
      (prev) =>
        prev.filter(
          (productId) =>
            productId !== id
        )
    );
  };

  // ==========================================
  // Clear Selected Products
  // ==========================================

  const clearSelectedProducts =
    () => {
      setSelectedProducts([]);
    };

  // ==========================================
  // Filter Products
  // ==========================================

  const filteredProducts =
    useMemo(() => {
      const keyword =
        productSearch
          .trim()
          .toLowerCase();

      if (!keyword) {
        return products;
      }

      return products.filter(
        (product) => {
          const title =
            product?.title ||
            product?.name ||
            "";

          const brand =
            product?.brand || "";

          const category =
            product?.category?.name ||
            product?.category ||
            "";

          return (
            title
              .toLowerCase()
              .includes(
                keyword
              ) ||
            brand
              .toLowerCase()
              .includes(
                keyword
              ) ||
            String(category)
              .toLowerCase()
              .includes(
                keyword
              )
          );
        }
      );
    }, [
      products,
      productSearch,
    ]);

  // ==========================================
  // Selected Product Objects
  // ==========================================

  const selectedProductObjects =
    useMemo(() => {
      return products.filter(
        (product) =>
          selectedProducts.includes(
            getProductId(
              product
            )
          )
      );
    }, [
      products,
      selectedProducts,
    ]);

  // ==========================================
  // Product Image Helper
  // ==========================================

  const getProductImage = (
    product
  ) => {
    return (
      product?.thumbnail ||
      product?.image ||
      product?.images?.[0] ||
      "/placeholder.png"
    );
  };

  // ==========================================
  // Product Price Helper
  // ==========================================

  const getProductPrice = (
    product
  ) => {
    return Number(
      product?.price || 0
    ).toLocaleString(
      "en-IN"
    );
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    // ========================================
    // Validation
    // ========================================

    if (!form.title.trim()) {
      toast.error(
        "Deal title is required."
      );

      return;
    }

    if (!form.endDate) {
      toast.error(
        "End date is required."
      );

      return;
    }

    const endDate =
      new Date(
        form.endDate
      );

    if (
      Number.isNaN(
        endDate.getTime()
      )
    ) {
      toast.error(
        "Please select a valid end date."
      );

      return;
    }

    if (
      endDate <= new Date()
    ) {
      toast.error(
        "End date must be in the future."
      );

      return;
    }

    if (
      selectedProducts.length ===
      0
    ) {
      toast.error(
        "Select at least one product for this sale."
      );

      return;
    }

    try {
      setLoading(true);

      // ======================================
      // FormData
      // ======================================

      const data =
        new FormData();

      data.append(
        "title",
        form.title.trim()
      );

      data.append(
        "subtitle",
        form.subtitle.trim()
      );

      data.append(
        "buttonText",
        form.buttonText.trim()
      );

      data.append(
        "buttonLink",
        form.buttonLink.trim()
      );

      data.append(
        "endDate",
        form.endDate
      );

      data.append(
        "backgroundColor",
        form.backgroundColor
      );

      data.append(
        "isActive",
        String(
          form.isActive
        )
      );

      // ======================================
      // IMPORTANT
      // Selected Sale Products
      // ======================================

      data.append(
        "products",
        JSON.stringify(
          selectedProducts
        )
      );

      // ======================================
      // Banner
      // ======================================

      if (banner) {
        data.append(
          "bannerImage",
          banner
        );
      }

      // ======================================
      // API
      // ======================================

      const response =
        await createFlashDeal(
          data
        );

      toast.success(
        response?.message ||
          "Flash Deal created successfully."
      );

      navigate(
        "/admin/flash-deals"
      );
    } catch (error) {
      console.error(
        "Create Flash Deal Error:",
        error
      );

      toast.error(
        error?.response?.data
          ?.message ||
          error?.message ||
          "Failed to create Flash Deal."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      className="
        min-h-screen
        bg-gray-50

        px-3
        sm:px-5
        lg:px-8

        py-5
        sm:py-7
        lg:py-8
      "
    >
      <div
        className="
          w-full
          max-w-[1450px]

          mx-auto
        "
      >
        {/* ================================== */}
        {/* Top Header */}
        {/* ================================== */}

        <div
          className="
            flex
            flex-col

            sm:flex-row
            sm:items-center
            sm:justify-between

            gap-4

            mb-6
          "
        >
          <div>
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/flash-deals"
                )
              }
              className="
                inline-flex
                items-center
                gap-2

                text-sm
                font-semibold

                text-gray-600

                hover:text-[var(--primary-color,#355E3B)]

                transition
              "
            >
              <FiArrowLeft />

              Back to Flash Deals
            </button>

            <h1
              className="
                mt-3

                text-2xl
                sm:text-3xl

                font-bold

                text-gray-900
              "
            >
              Add Flash Deal
            </h1>

            <p
              className="
                mt-1

                text-sm
                text-gray-500
              "
            >
              Create a sale and
              select which products
              will appear in it.
            </p>
          </div>

          {/* Selected Counter */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              self-start

              px-4
              py-2

              bg-white

              border
              border-gray-200

              rounded-xl

              shadow-sm
            "
          >
            <FiPackage
              className="
                text-[var(--primary-color,#355E3B)]
              "
            />

            <span
              className="
                text-sm
                font-semibold
                text-gray-700
              "
            >
              {
                selectedProducts.length
              }{" "}
              Products Selected
            </span>
          </div>
        </div>

        {/* ================================== */}
        {/* Form */}
        {/* ================================== */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
            space-y-6
          "
        >
          {/* ================================= */}
          {/* Deal Information */}
          {/* ================================= */}

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
            <h2
              className="
                text-lg
                sm:text-xl

                font-bold
                text-gray-900
              "
            >
              Deal Information
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Basic information
              shown to customers.
            </p>

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2

                gap-5

                mt-6
              "
            >
              {/* Title */}

              <div>
                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Deal Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    form.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Big Billion Sale"
                  className="
                    w-full
                    h-12

                    px-4

                    border
                    border-gray-300

                    rounded-xl

                    outline-none

                    focus:border-[var(--primary-color,#355E3B)]
                    focus:ring-2
                    focus:ring-[var(--primary-color,#355E3B)]/10
                  "
                />
              </div>

              {/* Subtitle */}

              <div>
                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Subtitle
                </label>

                <input
                  type="text"
                  name="subtitle"
                  value={
                    form.subtitle
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Up to 70% off on selected products"
                  className="
                    w-full
                    h-12

                    px-4

                    border
                    border-gray-300

                    rounded-xl

                    outline-none

                    focus:border-[var(--primary-color,#355E3B)]
                  "
                />
              </div>

              {/* Button Text */}

              <div>
                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Button Text
                </label>

                <input
                  type="text"
                  name="buttonText"
                  value={
                    form.buttonText
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    h-12

                    px-4

                    border
                    border-gray-300

                    rounded-xl

                    outline-none

                    focus:border-[var(--primary-color,#355E3B)]
                  "
                />
              </div>

              {/* Button Link */}

              <div>
                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Button Link
                </label>

                <input
                  type="text"
                  name="buttonLink"
                  value={
                    form.buttonLink
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="/flash-deals"
                  className="
                    w-full
                    h-12

                    px-4

                    border
                    border-gray-300

                    rounded-xl

                    outline-none

                    focus:border-[var(--primary-color,#355E3B)]
                  "
                />
              </div>

              {/* End Date */}

              <div>
                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Sale End Date *
                </label>

                <input
                  type="datetime-local"
                  name="endDate"
                  value={
                    form.endDate
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    h-12

                    px-4

                    border
                    border-gray-300

                    rounded-xl

                    outline-none

                    focus:border-[var(--primary-color,#355E3B)]
                  "
                />
              </div>

              {/* Background Color */}

              <div>
                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Background Color
                </label>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <input
                    type="color"
                    name="backgroundColor"
                    value={
                      form.backgroundColor
                    }
                    onChange={
                      handleChange
                    }
                    className="
                      w-14
                      h-12

                      p-1

                      border
                      border-gray-300

                      rounded-xl

                      cursor-pointer
                    "
                  />

                  <input
                    type="text"
                    name="backgroundColor"
                    value={
                      form.backgroundColor
                    }
                    onChange={
                      handleChange
                    }
                    className="
                      flex-1
                      h-12

                      px-4

                      border
                      border-gray-300

                      rounded-xl

                      outline-none
                    "
                  />
                </div>
              </div>
            </div>

            {/* Active */}

            <label
              className="
                mt-6

                flex
                items-center
                gap-3

                cursor-pointer
              "
            >
              <input
                type="checkbox"
                name="isActive"
                checked={
                  form.isActive
                }
                onChange={
                  handleChange
                }
                className="
                  w-5
                  h-5

                  accent-[var(--primary-color,#355E3B)]
                "
              />

              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                  "
                >
                  Active Sale
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  Show this sale on
                  the customer website.
                </p>
              </div>
            </label>
          </section>

          {/* ================================= */}
          {/* Banner */}
          {/* ================================= */}

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
            <h2
              className="
                text-lg
                sm:text-xl

                font-bold
                text-gray-900
              "
            >
              Sale Banner
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Upload an image for
              this sale campaign.
            </p>

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2

                gap-5

                mt-5
              "
            >
              {/* Upload */}

              <label
                className="
                  min-h-[220px]

                  border-2
                  border-dashed
                  border-gray-300

                  rounded-2xl

                  flex
                  flex-col
                  items-center
                  justify-center

                  text-center

                  p-6

                  cursor-pointer

                  hover:border-[var(--primary-color,#355E3B)]
                  hover:bg-gray-50

                  transition
                "
              >
                <FiImage
                  className="
                    text-4xl
                    text-gray-400
                  "
                />

                <p
                  className="
                    mt-4

                    font-semibold
                    text-gray-700
                  "
                >
                  Upload Sale Banner
                </p>

                <p
                  className="
                    mt-1

                    text-xs
                    text-gray-500
                  "
                >
                  PNG, JPG, WEBP —
                  maximum 5MB
                </p>

                {banner && (
                  <p
                    className="
                      mt-3

                      text-xs
                      font-medium

                      text-[var(--primary-color,#355E3B)]
                    "
                  >
                    {banner.name}
                  </p>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleBanner
                  }
                  className="hidden"
                />
              </label>

              {/* Preview */}

              <div
                className="
                  min-h-[220px]

                  rounded-2xl

                  overflow-hidden

                  border
                  border-gray-200
                "
                style={{
                  backgroundColor:
                    form.backgroundColor,
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Sale Banner Preview"
                    className="
                      w-full
                      h-[220px]

                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      h-[220px]

                      flex
                      items-center
                      justify-center

                      text-white/70
                    "
                  >
                    Banner Preview
                  </div>
                )}

                <div
                  className="
                    p-4

                    text-white
                  "
                >
                  <h3
                    className="
                      text-xl
                      font-bold
                    "
                  >
                    {form.title ||
                      "Sale Title"}
                  </h3>

                  <p
                    className="
                      mt-1

                      text-sm
                      text-white/80
                    "
                  >
                    {form.subtitle ||
                      "Sale subtitle will appear here."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================================= */}
          {/* Product Selection */}
          {/* ================================= */}

          <section
            className="
              bg-white

              border
              border-gray-200

              rounded-2xl

              shadow-sm

              overflow-hidden
            "
          >
            {/* Header */}

            <div
              className="
                p-4
                sm:p-6

                border-b
                border-gray-200
              "
            >
              <div
                className="
                  flex
                  flex-col

                  lg:flex-row
                  lg:items-center
                  lg:justify-between

                  gap-4
                "
              >
                <div>
                  <h2
                    className="
                      text-lg
                      sm:text-xl

                      font-bold
                      text-gray-900
                    "
                  >
                    Select Sale Products
                  </h2>

                  <p
                    className="
                      mt-1

                      text-sm
                      text-gray-500
                    "
                  >
                    Only selected
                    products will
                    appear inside
                    this sale.
                  </p>
                </div>

                {/* Search */}

                <div
                  className="
                    relative

                    w-full
                    lg:max-w-sm
                  "
                >
                  <FiSearch
                    className="
                      absolute

                      left-4
                      top-1/2

                      -translate-y-1/2

                      text-gray-400
                    "
                  />

                  <input
                    type="text"
                    value={
                      productSearch
                    }
                    onChange={(e) =>
                      setProductSearch(
                        e.target
                          .value
                      )
                    }
                    placeholder="Search products..."
                    className="
                      w-full
                      h-12

                      pl-11
                      pr-4

                      border
                      border-gray-300

                      rounded-xl

                      outline-none

                      focus:border-[var(--primary-color,#355E3B)]
                    "
                  />
                </div>
              </div>
            </div>

            {/* ================================= */}
            {/* Selected Products */}
            {/* ================================= */}

            {selectedProductObjects.length >
              0 && (
              <div
                className="
                  p-4
                  sm:p-6

                  bg-gray-50

                  border-b
                  border-gray-200
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    gap-3

                    mb-4
                  "
                >
                  <h3
                    className="
                      text-sm
                      font-bold
                      text-gray-800
                    "
                  >
                    Selected Products (
                    {
                      selectedProductObjects.length
                    }
                    )
                  </h3>

                  <button
                    type="button"
                    onClick={
                      clearSelectedProducts
                    }
                    className="
                      text-xs
                      font-semibold
                      text-red-500

                      hover:underline
                    "
                  >
                    Clear All
                  </button>
                </div>

                <div
                  className="
                    flex

                    gap-3

                    overflow-x-auto

                    pb-2

                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                  "
                >
                  {selectedProductObjects.map(
                    (
                      product
                    ) => {
                      const id =
                        getProductId(
                          product
                        );

                      return (
                        <div
                          key={
                            id
                          }
                          className="
                            relative

                            shrink-0

                            w-[170px]

                            bg-white

                            border
                            border-gray-200

                            rounded-xl

                            p-2
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              removeSelectedProduct(
                                id
                              )
                            }
                            className="
                              absolute

                              top-1
                              right-1

                              z-10

                              w-7
                              h-7

                              rounded-full

                              bg-white

                              shadow

                              flex
                              items-center
                              justify-center

                              text-red-500
                            "
                          >
                            <FiX />
                          </button>

                          <img
                            src={getProductImage(
                              product
                            )}
                            alt={
                              product?.title ||
                              "Product"
                            }
                            className="
                              w-full
                              h-24

                              object-contain

                              rounded-lg

                              bg-gray-50
                            "
                          />

                          <p
                            className="
                              mt-2

                              text-xs
                              font-semibold

                              text-gray-800

                              line-clamp-2

                              min-h-[32px]
                            "
                          >
                            {product?.title ||
                              product?.name}
                          </p>

                          <p
                            className="
                              mt-1

                              text-sm
                              font-bold

                              text-[var(--primary-color,#355E3B)]
                            "
                          >
                            ₹
                            {getProductPrice(
                              product
                            )}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* ================================= */}
            {/* Product List */}
            {/* ================================= */}

            <div
              className="
                p-4
                sm:p-6
              "
            >
              {/* Loading */}

              {productsLoading && (
                <div
                  className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5

                    gap-3
                    sm:gap-4
                  "
                >
                  {[
                    ...Array(10),
                  ].map(
                    (
                      _,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="
                          h-[260px]

                          rounded-xl

                          bg-gray-100

                          animate-pulse
                        "
                      />
                    )
                  )}
                </div>
              )}

              {/* Error */}

              {!productsLoading &&
                productsError && (
                  <div
                    className="
                      min-h-[200px]

                      flex
                      items-center
                      justify-center

                      text-center
                    "
                  >
                    <div>
                      <FiPackage
                        className="
                          mx-auto

                          text-4xl
                          text-gray-300
                        "
                      />

                      <p
                        className="
                          mt-3

                          text-sm
                          text-red-500
                        "
                      >
                        {
                          productsError
                        }
                      </p>
                    </div>
                  </div>
                )}

              {/* No Products */}

              {!productsLoading &&
                !productsError &&
                filteredProducts.length ===
                  0 && (
                  <div
                    className="
                      min-h-[200px]

                      flex
                      items-center
                      justify-center

                      text-center
                    "
                  >
                    <div>
                      <FiPackage
                        className="
                          mx-auto

                          text-4xl
                          text-gray-300
                        "
                      />

                      <p
                        className="
                          mt-3

                          font-semibold
                          text-gray-700
                        "
                      >
                        No Products
                        Found
                      </p>

                      <p
                        className="
                          mt-1

                          text-sm
                          text-gray-500
                        "
                      >
                        Try another
                        search.
                      </p>
                    </div>
                  </div>
                )}

              {/* Products */}

              {!productsLoading &&
                !productsError &&
                filteredProducts.length >
                  0 && (
                  <div
                    className="
                      grid

                      grid-cols-2

                      md:grid-cols-3

                      lg:grid-cols-4

                      xl:grid-cols-5

                      gap-3
                      sm:gap-4
                    "
                  >
                    {filteredProducts.map(
                      (
                        product
                      ) => {
                        const id =
                          getProductId(
                            product
                          );

                        const selected =
                          isProductSelected(
                            product
                          );

                        return (
                          <button
                            key={
                              id
                            }
                            type="button"
                            onClick={() =>
                              toggleProduct(
                                product
                              )
                            }
                            className={`
                              relative

                              text-left

                              bg-white

                              border-2

                              rounded-xl

                              overflow-hidden

                              transition-all
                              duration-200

                              ${
                                selected
                                  ? `
                                    border-[var(--primary-color,#355E3B)]
                                    shadow-md
                                  `
                                  : `
                                    border-gray-200
                                    hover:border-gray-300
                                    hover:shadow-sm
                                  `
                              }
                            `}
                          >
                            {/* Selected Check */}

                            <div
                              className={`
                                absolute

                                top-2
                                right-2

                                z-20

                                w-7
                                h-7

                                rounded-full

                                flex
                                items-center
                                justify-center

                                border

                                ${
                                  selected
                                    ? `
                                      bg-[var(--primary-color,#355E3B)]
                                      border-[var(--primary-color,#355E3B)]
                                      text-white
                                    `
                                    : `
                                      bg-white
                                      border-gray-300
                                      text-transparent
                                    `
                                }
                              `}
                            >
                              <FiCheck />
                            </div>

                            {/* Image */}

                            <div
                              className="
                                h-36
                                sm:h-40

                                bg-gray-50

                                p-2
                              "
                            >
                              <img
                                src={getProductImage(
                                  product
                                )}
                                alt={
                                  product?.title ||
                                  "Product"
                                }
                                className="
                                  w-full
                                  h-full

                                  object-contain
                                "
                              />
                            </div>

                            {/* Content */}

                            <div
                              className="
                                p-3
                              "
                            >
                              {product?.brand && (
                                <p
                                  className="
                                    text-[10px]
                                    sm:text-xs

                                    uppercase

                                    tracking-wide

                                    text-gray-400

                                    truncate
                                  "
                                >
                                  {
                                    product.brand
                                  }
                                </p>
                              )}

                              <h3
                                className="
                                  mt-1

                                  text-xs
                                  sm:text-sm

                                  font-semibold

                                  text-gray-800

                                  line-clamp-2

                                  min-h-[36px]
                                "
                              >
                                {product?.title ||
                                  product?.name ||
                                  "Product"}
                              </h3>

                              <div
                                className="
                                  mt-3

                                  flex
                                  items-end
                                  justify-between

                                  gap-2
                                "
                              >
                                <p
                                  className="
                                    text-sm
                                    sm:text-base

                                    font-bold

                                    text-[var(--primary-color,#355E3B)]
                                  "
                                >
                                  ₹
                                  {getProductPrice(
                                    product
                                  )}
                                </p>

                                <span
                                  className={`
                                    text-[10px]
                                    sm:text-xs

                                    font-medium

                                    ${
                                      Number(
                                        product?.stock ||
                                          0
                                      ) >
                                      0
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }
                                  `}
                                >
                                  {Number(
                                    product?.stock ||
                                      0
                                  ) >
                                  0
                                    ? `${product.stock} Stock`
                                    : "Out of Stock"}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
            </div>
          </section>

          {/* ================================= */}
          {/* Bottom Actions */}
          {/* ================================= */}

          <div
            className="
              sticky
              bottom-3

              z-30

              bg-white/95
              backdrop-blur-md

              border
              border-gray-200

              shadow-lg

              rounded-2xl

              p-3
              sm:p-4

              flex
              flex-col

              sm:flex-row
              sm:items-center
              sm:justify-between

              gap-3
            "
          >
            <div
              className="
                text-sm
                text-gray-500
              "
            >
              <span
                className="
                  font-bold

                  text-[var(--primary-color,#355E3B)]
                "
              >
                {
                  selectedProducts.length
                }
              </span>{" "}
              products selected
              for this sale.
            </div>

            <div
              className="
                flex
                gap-3
              "
            >
              <button
                type="button"
                disabled={
                  loading
                }
                onClick={() =>
                  navigate(
                    "/admin/flash-deals"
                  )
                }
                className="
                  flex-1
                  sm:flex-none

                  h-11

                  px-5

                  border
                  border-gray-300

                  rounded-xl

                  text-sm
                  font-semibold

                  text-gray-700

                  hover:bg-gray-50

                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  loading
                }
                className="
                  flex-1
                  sm:flex-none

                  h-11

                  px-5
                  sm:px-7

                  rounded-xl

                  text-white

                  text-sm
                  font-bold

                  flex
                  items-center
                  justify-center

                  gap-2

                  shadow-sm

                  transition

                  hover:opacity-90

                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
                style={{
                  backgroundColor:
                    "var(--primary-color,#355E3B)",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="
                        w-4
                        h-4

                        border-2
                        border-white
                        border-t-transparent

                        rounded-full

                        animate-spin
                      "
                    />

                    Creating...
                  </>
                ) : (
                  <>
                    <FiPlus />

                    Create Flash
                    Deal
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlashDeal;