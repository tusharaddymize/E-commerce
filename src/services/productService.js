import API from "./api";

// ===========================
// Get Products
// ===========================

export const getProducts = async (params = {}) => {

  const { data } = await API.get("/products", {
    params,
  });

  return data;

};

// ===========================
// Search Products
// ===========================

export const searchProducts = async (
  keyword,
  limit = 8
) => {

  const { data } = await API.get(
    "/products/search",
    {
      params: {
        search: keyword,
        limit,
      },
    }
  );

  return data;

};

// ===========================
// Get Single Product
// ===========================

export const getProductById = async (
  id
) => {

  const { data } = await API.get(
    `/products/${id}`
  );

  return data;

};