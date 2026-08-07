import API from "./api";

/* ==========================================
   GET MENU GROUPS
========================================== */

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

/* ==========================================
   GET MENU GROUP
========================================== */

export const getMenuGroupById = async (id) => {
  const { data } = await API.get(
    `/menu-groups/${id}`
  );

  return data;
};

/* ==========================================
   CREATE
========================================== */

export const createMenuGroup = async (
  payload
) => {
  const { data } = await API.post(
    "/menu-groups",
    payload
  );

  return data;
};

/* ==========================================
   UPDATE
========================================== */

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

/* ==========================================
   DELETE
========================================== */

export const deleteMenuGroup = async (id) => {
  const { data } = await API.delete(
    `/menu-groups/${id}`
  );

  return data;
};