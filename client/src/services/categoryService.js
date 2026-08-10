import API from "./api";

// ==================================================
// CATEGORY APIs
// ==================================================

/**
 * Get all categories
 */
export const getCategories = async (params = {}) => {
  const { data } = await API.get("/categories", {
    params,
  });

  return data;
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id) => {
  const { data } = await API.get(`/categories/${id}`);

  return data;
};

/**
 * Create category
 */
export const createCategory = async (payload) => {
  const { data } = await API.post(
    "/categories",
    payload
  );

  return data;
};

/**
 * Update category
 */
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

/**
 * Delete category
 */
export const deleteCategory = async (id) => {
  const { data } = await API.delete(
    `/categories/${id}`
  );

  return data;
};

// ==================================================
// MENU GROUP APIs
// ==================================================

/**
 * Get all menu groups
 *
 * Optional:
 * ?category=categoryId
 */
export const getMenuGroups = async (
  params = {}
) => {
  const { data } = await API.get(
    "/menu-groups",
    {
      params,
    }
  );

  return data;
};

/**
 * Get menu group by ID
 */
export const getMenuGroupById = async (id) => {
  const { data } = await API.get(
    `/menu-groups/${id}`
  );

  return data;
};

/**
 * Create menu group
 */
export const createMenuGroup = async (
  payload
) => {
  const { data } = await API.post(
    "/menu-groups",
    payload
  );

  return data;
};

/**
 * Update menu group
 */
export const updateMenuGroup = async (
  id,
  payload
) => {
  const { data } = await API.put(
    `/menu-groups/${id}`,
    payload
  );

  return data;
};

/**
 * Delete menu group
 */
export const deleteMenuGroup = async (id) => {
  const { data } = await API.delete(
    `/menu-groups/${id}`
  );

  return data;
};

// ==================================================
// SUB CATEGORY APIs
// ==================================================

/**
 * Get all sub categories
 *
 * Optional:
 * ?category=categoryId
 * ?menuGroup=menuGroupId
 */
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

/**
 * Get sub category by ID
 */
export const getSubCategoryById = async (
  id
) => {
  const { data } = await API.get(
    `/sub-categories/${id}`
  );

  return data;
};

/**
 * Create sub category
 */
export const createSubCategory = async (
  payload
) => {
  const { data } = await API.post(
    "/sub-categories",
    payload
  );

  return data;
};

/**
 * Update sub category
 */
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

/**
 * Delete sub category
 */
export const deleteSubCategory = async (
  id
) => {
  const { data } = await API.delete(
    `/sub-categories/${id}`
  );

  return data;
};