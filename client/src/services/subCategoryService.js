import API from "./api";

/* ==========================================
   GET SUB CATEGORIES
========================================== */

export const getSubCategories = async (
  params = {}
) => {
  const { data } = await API.get(
    "/sub-categories",
    {
      params,
    }
  );

  return data;
};

/* ==========================================
   GET SUB CATEGORY
========================================== */

export const getSubCategoryById = async (
  id
) => {
  const { data } = await API.get(
    `/sub-categories/${id}`
  );

  return data;
};

/* ==========================================
   CREATE
========================================== */

export const createSubCategory = async (
  payload
) => {
  const { data } = await API.post(
    "/sub-categories",
    payload
  );

  return data;
};

/* ==========================================
   UPDATE
========================================== */

export const updateSubCategory = async (
  id,
  payload
) => {
  const { data } = await API.put(
    `/sub-categories/${id}`,
    payload
  );

  return data;
};

/* ==========================================
   DELETE
========================================== */

export const deleteSubCategory = async (
  id
) => {
  const { data } = await API.delete(
    `/sub-categories/${id}`
  );

  return data;
};