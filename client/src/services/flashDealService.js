import API from "./api";

// ==============================================
// Get Active Flash Deal (Homepage)
// ==============================================

export const getFlashDeal = async () => {
  try {
    const { data } = await API.get("/flash-deals");
    return data;
  } catch (error) {
    console.error("Get Flash Deal Error:", error);
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch flash deal.",
      }
    );
  }
};

// ==============================================
// Get All Flash Deals (Admin)
// ==============================================

export const getAllFlashDeals = async () => {
  try {
    const { data } = await API.get("/flash-deals/all");
    return data;
  } catch (error) {
    console.error("Get All Flash Deals Error:", error);
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch flash deals.",
      }
    );
  }
};

// ==============================================
// Get Flash Deal By ID
// ==============================================

export const getFlashDealById = async (id) => {
  try {
    const { data } = await API.get(`/flash-deals/${id}`);
    return data;
  } catch (error) {
    console.error("Get Flash Deal Error:", error);
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch flash deal.",
      }
    );
  }
};

// ==============================================
// Create Flash Deal
// ==============================================

export const createFlashDeal = async (flashDealData) => {
  try {
    const { data } = await API.post(
      "/flash-deals",
      flashDealData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Create Flash Deal Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to create Flash Deal.",
      }
    );
  }
};

// ==============================================
// Update Flash Deal
// ==============================================

export const updateFlashDeal = async (
  id,
  flashDealData
) => {
  try {
    const { data } = await API.put(
      `/flash-deals/${id}`,
      flashDealData
    );

    return data;
  } catch (error) {
    console.error("Update Flash Deal Error:", error);
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to update flash deal.",
      }
    );
  }
};

// ==============================================
// Delete Flash Deal
// ==============================================

export const deleteFlashDeal = async (id) => {
  try {
    const { data } = await API.delete(
      `/flash-deals/${id}`
    );

    return data;
  } catch (error) {
    console.error("Delete Flash Deal Error:", error);
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to delete flash deal.",
      }
    );
  }
};