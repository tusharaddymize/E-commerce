import FlashDeal from "../models/FlashDeal.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
// ==========================================
// Get Active Flash Deal
// ==========================================

export const getFlashDeal = async (req, res) => {
  try {
    const flashDeal = await FlashDeal.findOne({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    if (!flashDeal) {
      return res.status(404).json({
        success: false,
        message: "No active flash deal found.",
      });
    }

    res.status(200).json({
      success: true,
      flashDeal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Flash Deals (Admin)
// ==========================================

export const getAllFlashDeals = async (req, res) => {
  try {
    const flashDeals = await FlashDeal.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: flashDeals.length,
      flashDeals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Flash Deal By ID
// ==========================================

export const getFlashDealById = async (req, res) => {
  try {
    const flashDeal = await FlashDeal.findById(
      req.params.id
    );

    if (!flashDeal) {
      return res.status(404).json({
        success: false,
        message: "Flash deal not found.",
      });
    }

    res.status(200).json({
      success: true,
      flashDeal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Create Flash Deal
// ==========================================

export const createFlashDeal = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      buttonText,
      buttonLink,
      endDate,
      backgroundColor,
      isActive,
    } = req.body;

    // ==========================
    // Validation
    // ==========================

    if (!title || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Title and End Date are required.",
      });
    }

    // ==========================
    // Upload Banner
    // ==========================

    let bannerImage = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "flash-deals",
          },
          (error, result) => {
            if (error) return reject(error);

            resolve(result);
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });

      bannerImage = uploadResult.secure_url;
    }

    // ==========================
    // Create Flash Deal
    // ==========================

    const flashDeal = await FlashDeal.create({
      title,
      subtitle,
      bannerImage,
      buttonText,
      buttonLink,
      endDate,
      backgroundColor,

      isActive:
        isActive === true ||
        isActive === "true",
    });

    res.status(201).json({
      success: true,
      message: "Flash Deal created successfully.",
      flashDeal,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// Update Flash Deal
// ==========================================

export const updateFlashDeal = async (req, res) => {
  try {
    const flashDeal = await FlashDeal.findById(req.params.id);

    if (!flashDeal) {
      return res.status(404).json({
        success: false,
        message: "Flash Deal not found.",
      });
    }

    // ==========================================
    // Upload New Banner (Optional)
    // ==========================================

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "flash-deals",
          },
          (error, result) => {
            if (error) return reject(error);

            resolve(result);
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });

      flashDeal.bannerImage = uploadResult.secure_url;
    }

    // ==========================================
    // Update Fields
    // ==========================================

    flashDeal.title =
      req.body.title || flashDeal.title;

    flashDeal.subtitle =
      req.body.subtitle || flashDeal.subtitle;

    flashDeal.buttonText =
      req.body.buttonText || flashDeal.buttonText;

    flashDeal.buttonLink =
      req.body.buttonLink || flashDeal.buttonLink;

    flashDeal.endDate =
      req.body.endDate || flashDeal.endDate;

    flashDeal.backgroundColor =
      req.body.backgroundColor ||
      flashDeal.backgroundColor;

    flashDeal.isActive =
      req.body.isActive === "true" ||
      req.body.isActive === true;

    await flashDeal.save();

    res.status(200).json({
      success: true,
      message: "Flash Deal updated successfully.",
      flashDeal,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Delete Flash Deal
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
        message: "Flash deal not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Flash Deal deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};