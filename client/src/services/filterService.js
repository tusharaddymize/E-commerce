import API from "./api";

// ===========================
// Get All Filters
// ===========================

export const getFilters = async () => {
  const { data } = await API.get("/filters");
  return data;
};

// ===========================
// Get Filter By ID
// ===========================

export const getFilterById = async (id) => {
  const { data } = await API.get(`/filters/${id}`);
  return data;
};

// ===========================
// Get Filters By SubCategory
// ===========================

export const getFiltersBySubCategory = async (
  subCategoryId
) => {
  const { data } = await API.get(
    `/filters/subcategory/${subCategoryId}`
  );

  return data;
};

// ===========================
// Create Filter
// ===========================

export const createFilter = async (filterData) => {
  const { data } = await API.post(
    "/filters",
    filterData
  );

  return data;
};

// ===========================
// Update Filter
// ===========================

export const updateFilter = async (
  id,
  filterData
) => {
  const { data } = await API.put(
    `/filters/${id}`,
    filterData
  );

  return data;
};

// ===========================
// Delete Filter
// ===========================

export const deleteFilter = async (id) => {
  const { data } = await API.delete(
    `/filters/${id}`
  );

  return data;
};