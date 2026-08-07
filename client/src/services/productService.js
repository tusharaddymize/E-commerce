import API from "./api";

// ==========================================
// Get Products
// Public Product Listing
// ==========================================

export const getProducts = async (
  params = {}
) => {
  const { data } = await API.get(
    "/products",
    {
      params,
    }
  );

  return data;
};

// ==========================================
// Get Product By ID (Admin)
// ==========================================

export const getAdminProductById = async (
  id
) => {
  const { data } = await API.get(
    `/products/${id}`
  );

  return data;
};

// ==========================================
// Create Product
// ==========================================

export const createProduct = async (
  formData
) => {
  const { data } = await API.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

// ==========================================
// Update Product
// ==========================================

export const updateProduct = async (
  id,
  formData
) => {
  const { data } = await API.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

// ==========================================
// Delete Product
// ==========================================

export const deleteProduct = async (
  id
) => {
  const { data } = await API.delete(
    `/products/${id}`
  );

  return data;
};

// ==========================================
// Admin Products
// Search + Filter + Pagination
// ==========================================

export const getAdminProducts = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
  brand = "",
  sort = "latest",
} = {}) => {
  const { data } = await API.get(
    "/products",
    {
      params: {
        page,
        limit,
        search,
        category,
        brand,
        sort,
      },
    }
  );

  return data;
};

// ==========================================
// Flash Deal Product Selector
// Used inside AddFlashDeal / EditFlashDeal
// ==========================================

export const getFlashDealProducts =
  async ({
    page = 1,
    limit = 100,
    search = "",
    category = "",
    brand = "",
    sort = "latest",
  } = {}) => {
    const { data } = await API.get(
      "/products",
      {
        params: {
          page,
          limit,
          search,
          category,
          brand,
          sort,
        },
      }
    );

    return data;
  };

// ==========================================
// Get Single Product
// Public / Product Details
// ==========================================

export const getProductById = async (
  id
) => {
  const { data } = await API.get(
    `/products/${id}`
  );

  return data;
};

// ==========================================
// Get Dynamic Product Filters
// ==========================================

export const getProductFilters = async (
  params = {}
) => {
  const { data } = await API.get(
    "/products/filters",
    {
      params,
    }
  );

  return data;
};