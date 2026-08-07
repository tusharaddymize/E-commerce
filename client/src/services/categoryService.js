import API from "./api";

/* ==========================================
   GET ALL CATEGORIES
========================================== */

export const getCategories = async (params = {}) => {
  const { data } = await API.get("/categories", {
    params,
  });

  return data;
};

/* ==========================================
   GET CATEGORY BY ID
========================================== */

export const getCategoryById = async (id) => {
  const { data } = await API.get(`/categories/${id}`);

  return data;
};

/* ==========================================
   CREATE CATEGORY
========================================== */

export const createCategory = async (payload) => {
  const { data } = await API.post(
    "/categories",
    payload
  );

  return data;
};

/* ==========================================
   UPDATE CATEGORY
========================================== */

export const updateCategory = async (
  id,
  payload
) => {
  const { data } = await API.put(
    `/categories/${id}`,
    payload
  );

  return data;
};

/* ==========================================
   DELETE CATEGORY
========================================== */

export const deleteCategory = async (id) => {
  const { data } = await API.delete(
    `/categories/${id}`
  );

  return data;
};