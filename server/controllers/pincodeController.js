import Pincode from "../models/pincode.js";

export const getPincodesByState = async (req, res) => {
  try {
    const { state } = req.params;

    if (!state) {
      return res.status(400).json({
        success: false,
        message: "State is required",
        pincodes: [],
      });
    }

    const normalizedState =
      decodeURIComponent(state).trim();

    console.log(
      `📍 Fetching pincodes for state: ${normalizedState}`
    );

    const pincodes = await Pincode.find({
      state: {
        $regex: `^${normalizedState}$`,
        $options: "i",
      },
    })
      .select("pincode district city")
      .sort({ pincode: 1 })
      .lean();

    console.log(
      `✅ Found ${pincodes.length} pincodes for ${normalizedState}`
    );

    return res.status(200).json({
      success: true,
      count: pincodes.length,
      pincodes,
      source: "mongodb",
    });
  } catch (error) {
    console.error(
      "❌ Get pincodes by state error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pincodes",
      pincodes: [],
    });
  }
};