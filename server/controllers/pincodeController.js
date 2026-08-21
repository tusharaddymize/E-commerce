import Pincode from "../models/pincode.js";

// ==========================================
// Get Pincodes By State
// ==========================================

export const getPincodesByState = async (req, res) => {
  try {
    const { state } = req.params;

    if (!state) {
      return res.status(400).json({
        success: false,
        message: "State is required",
      });
    }

    const pincodes = await Pincode.find({
      state: {
        $regex: `^${state}$`,
        $options: "i",
      },
    })
      .select("pincode district city")
      .sort({ pincode: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: pincodes.length,
      pincodes,
    });
  } catch (error) {
    console.error(
      "Get pincodes error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pincodes",
    });
  }
};