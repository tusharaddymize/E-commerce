import FlashDeal from "../models/FlashDeal.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ==========================================
// Helper - Upload Banner To Cloudinary
// ==========================================

const uploadBannerToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "flash-deals",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier
      .createReadStream(fileBuffer)
      .pipe(stream);
  });
};

// ==========================================
// Helper - Parse Product IDs
// FormData se products JSON string aa sakta hai
// Example:
// '["id1","id2","id3"]'
// ==========================================

const parseProducts = (products) => {
  if (products === undefined || products === null) {
    return [];
  }

  if (Array.isArray(products)) {
    return products;
  }

  if (typeof products === "string") {
    try {
      const parsed = JSON.parse(products);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch (error) {
      return [];
    }
  }

  return [];
};

// ==========================================
// Get Active Flash Deal
// Public
// ==========================================

export const getFlashDeal = async (req, res) => {
  try {
    const flashDeal = await FlashDeal.findOne({
      isActive: true,

      // Expired sale frontend par show nahi hogi
      endDate: {
        $gt: new Date(),
      },
    })
      .populate("products")
      .sort({
        createdAt: -1,
      });

    if (!flashDeal) {
      return res.status(404).json({
        success: false,
        message:
          "No active flash deal found.",
      });
    }

    return res.status(200).json({
      success: true,
      flashDeal,
    });
  } catch (error) {
    console.error(
      "Get Flash Deal Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to get flash deal.",
    });
  }
};

// ==========================================
// Get All Flash Deals
// Admin
// ==========================================

export const getAllFlashDeals = async (
  req,
  res
) => {
  try {
    const flashDeals =
      await FlashDeal.find()
        .populate("products")
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,

      count: flashDeals.length,

      flashDeals,
    });
  } catch (error) {
    console.error(
      "Get All Flash Deals Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to get flash deals.",
    });
  }
};

// ==========================================
// Get Flash Deal By ID
// Admin Edit Page
// ==========================================

export const getFlashDealById = async (
  req,
  res
) => {
  try {
    const flashDeal =
      await FlashDeal.findById(
        req.params.id
      ).populate("products");

    if (!flashDeal) {
      return res.status(404).json({
        success: false,
        message:
          "Flash deal not found.",
      });
    }

    return res.status(200).json({
      success: true,
      flashDeal,
    });
  } catch (error) {
    console.error(
      "Get Flash Deal By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to get flash deal.",
    });
  }
};

// ==========================================
// Create Flash Deal
// Admin
// ==========================================

export const createFlashDeal = async (
  req,
  res
) => {
  try {
    const {
      title,
      subtitle,
      buttonText,
      buttonLink,
      endDate,
      backgroundColor,
      isActive,
      products,
    } = req.body;

    // ========================================
    // Validation
    // ========================================

    if (!title || !endDate) {
      return res.status(400).json({
        success: false,
        message:
          "Title and End Date are required.",
      });
    }

    // ========================================
    // Validate End Date
    // ========================================

    const parsedEndDate =
      new Date(endDate);

    if (
      Number.isNaN(
        parsedEndDate.getTime()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid End Date.",
      });
    }

    // ========================================
    // Parse Products
    // ========================================

    const productIds =
      parseProducts(products);

    // ========================================
    // Upload Banner
    // ========================================

    let bannerImage = "";

    if (req.file) {
      const uploadResult =
        await uploadBannerToCloudinary(
          req.file.buffer
        );

      bannerImage =
        uploadResult.secure_url;
    }

    // ========================================
    // Create Flash Deal
    // ========================================

    const flashDeal =
      await FlashDeal.create({
        title: title.trim(),

        subtitle:
          subtitle?.trim() || "",

        bannerImage,

        buttonText:
          buttonText?.trim() ||
          "View All Deals",

        buttonLink:
          buttonLink?.trim() ||
          "/flash-deals",

        endDate:
          parsedEndDate,

        backgroundColor:
          backgroundColor ||
          "#355E3B",

        products: productIds,

        isActive:
          isActive === true ||
          isActive === "true",
      });

    // ========================================
    // Populate Products
    // ========================================

    await flashDeal.populate(
      "products"
    );

    return res.status(201).json({
      success: true,

      message:
        "Flash Deal created successfully.",

      flashDeal,
    });
  } catch (error) {
    console.error(
      "Create Flash Deal Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to create flash deal.",
    });
  }
};

// ==========================================
// Update Flash Deal
// Admin
// ==========================================

export const updateFlashDeal = async (
  req,
  res
) => {
  try {
    const flashDeal =
      await FlashDeal.findById(
        req.params.id
      );

    if (!flashDeal) {
      return res.status(404).json({
        success: false,
        message:
          "Flash Deal not found.",
      });
    }

    // ========================================
    // Upload New Banner
    // ========================================

    if (req.file) {
      const uploadResult =
        await uploadBannerToCloudinary(
          req.file.buffer
        );

      flashDeal.bannerImage =
        uploadResult.secure_url;
    }

    // ========================================
    // Title
    // ========================================

    if (
      req.body.title !== undefined
    ) {
      flashDeal.title =
        req.body.title.trim();
    }

    // ========================================
    // Subtitle
    // ========================================

    if (
      req.body.subtitle !== undefined
    ) {
      flashDeal.subtitle =
        req.body.subtitle.trim();
    }

    // ========================================
    // Button Text
    // ========================================

    if (
      req.body.buttonText !== undefined
    ) {
      flashDeal.buttonText =
        req.body.buttonText.trim();
    }

    // ========================================
    // Button Link
    // ========================================

    if (
      req.body.buttonLink !== undefined
    ) {
      flashDeal.buttonLink =
        req.body.buttonLink.trim();
    }

    // ========================================
    // End Date
    // ========================================

    if (
      req.body.endDate !== undefined
    ) {
      const parsedEndDate =
        new Date(
          req.body.endDate
        );

      if (
        Number.isNaN(
          parsedEndDate.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid End Date.",
        });
      }

      flashDeal.endDate =
        parsedEndDate;
    }

    // ========================================
    // Background Color
    // ========================================

    if (
      req.body.backgroundColor !==
      undefined
    ) {
      flashDeal.backgroundColor =
        req.body.backgroundColor;
    }

    // ========================================
    // Products
    // ========================================

    if (
      req.body.products !== undefined
    ) {
      let productIds;

      if (
        Array.isArray(
          req.body.products
        )
      ) {
        productIds =
          req.body.products;
      } else {
        try {
          productIds =
            JSON.parse(
              req.body.products
            );
        } catch (error) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid products data.",
          });
        }
      }

      if (
        !Array.isArray(productIds)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Products must be an array.",
        });
      }

      flashDeal.products =
        productIds;
    }

    // ========================================
    // Active Status
    // ========================================

    if (
      req.body.isActive !== undefined
    ) {
      flashDeal.isActive =
        req.body.isActive === true ||
        req.body.isActive === "true";
    }

    // ========================================
    // Save
    // ========================================

    await flashDeal.save();

    // ========================================
    // Populate Products
    // ========================================

    await flashDeal.populate(
      "products"
    );

    return res.status(200).json({
      success: true,

      message:
        "Flash Deal updated successfully.",

      flashDeal,
    });
  } catch (error) {
    console.error(
      "Update Flash Deal Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to update flash deal.",
    });
  }
};

// ==========================================
// Delete Flash Deal
// Admin
// ==========================================

export const deleteFlashDeal = async (
  req,
  res
) => {
  try {
    const flashDeal =
      await FlashDeal.findByIdAndDelete(
        req.params.id
      );

    if (!flashDeal) {
      return res.status(404).json({
        success: false,
        message:
          "Flash deal not found.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Flash Deal deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Flash Deal Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to delete flash deal.",
    });
  }
};