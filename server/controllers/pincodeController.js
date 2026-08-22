import Pincode from "../models/pincode.js";

const PINCODE_API_BASE = "https://api.pincodeapi.in/api/v1/state";

export const getPincodesByState = async (req, res) => {
  try {
    const { state } = req.params;

    if (!state) {
      return res.status(400).json({
        success: false,
        message: "State is required",
      });
    }

    // ==========================================
    // STEP 1: Try DB cache first
    // ==========================================

    const cachedPincodes = await Pincode.find({
      state: {
        $regex: `^${state}$`,
        $options: "i",
      },
    })
      .select("pincode district city")
      .sort({ pincode: 1 })
      .lean();

    if (cachedPincodes.length > 0) {
      return res.status(200).json({
        success: true,
        count: cachedPincodes.length,
        pincodes: cachedPincodes,
        source: "cache",
      });
    }

    // ==========================================
    // STEP 2: Not cached yet -> fetch from
    // external API (one-time, then cache it)
    // ==========================================

    let externalData;

    try {
      const apiUrl = `${PINCODE_API_BASE}/${encodeURIComponent(
        state
      )}?page=1&limit=500`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `Pincode API failed with status ${response.status}`
        );
      }

      externalData = await response.json();
    } catch (fetchError) {
      console.error(
        "External pincode API error:",
        fetchError
      );

      // External API failed/unreachable -- fail soft,
      // same shape the frontend already handles as
      // "No pincodes found for this state".
      return res.status(200).json({
        success: true,
        count: 0,
        pincodes: [],
        message: "No pincodes found for this state",
      });
    }

    if (
      !externalData ||
      externalData.status !== "success" ||
      !Array.isArray(externalData.data)
    ) {
      return res.status(200).json({
        success: true,
        count: 0,
        pincodes: [],
        message: "No pincodes found for this state",
      });
    }

    // ==========================================
    // STEP 3: Dedupe + normalize before saving
    // ==========================================

    const uniqueMap = new Map();

    externalData.data.forEach((item) => {
      if (!item?.pincode) return;

      uniqueMap.set(item.pincode, {
        pincode: String(item.pincode),
        state: item.state || state,
        district: item.district || "",
        city: item.officename || item.city || "",
      });
    });

    const freshPincodes = Array.from(
      uniqueMap.values()
    );

    if (freshPincodes.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        pincodes: [],
        message: "No pincodes found for this state",
      });
    }

    // ==========================================
    // STEP 4: Cache into MongoDB for next time.
    // Best-effort -- if some pincodes already exist
    // (e.g. a concurrent request just cached them),
    // insertMany with ordered:false will skip only
    // those duplicates and keep going.
    // ==========================================

    try {
      await Pincode.insertMany(freshPincodes, {
        ordered: false,
      });
    } catch (insertError) {
      console.error(
        "Pincode cache insert warning (duplicates are safe to ignore):",
        insertError?.message
      );
    }

    return res.status(200).json({
      success: true,
      count: freshPincodes.length,
      pincodes: freshPincodes.map(
        ({ pincode, district, city }) => ({
          pincode,
          district,
          city,
        })
      ),
      source: "external_api",
    });
  } catch (error) {
    console.error(
      "Get pincodes by state error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pincodes",
      pincodes: [],
    });
  }
};;