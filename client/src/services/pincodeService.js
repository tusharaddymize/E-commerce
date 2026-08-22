import api from "./api";

export const getPincodesByState = async (state) => {
  if (!state) {
    return {
      success: false,
      count: 0,
      pincodes: [],
      message: "State is required",
    };
  }

  try {
    const response = await api.get(
      `/pincodes/state/${encodeURIComponent(state)}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get pincodes by state error:",
      error
    );

    return {
      success: false,
      count: 0,
      pincodes: [],
      message:
        error.response?.data?.message ||
        "Failed to fetch pincodes",
    };
  }
};