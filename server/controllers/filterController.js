import Filter from "../models/Filter.js";

// ==========================================
// Get All Filters
// ==========================================

export const getFilters = async (req, res) => {
  try {
    const filters = await Filter.find()
      .populate("category", "name slug")
      .populate("menuGroup", "name slug")
      .populate("subCategory", "name slug")
      .sort({ sortOrder: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      filters,
    });
  } catch (error) {
    console.error("Get Filters Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Filter By ID
// ==========================================

export const getFilterById = async (req, res) => {
  try {
    const filter = await Filter.findById(req.params.id)
      .populate("category", "name slug")
      .populate("menuGroup", "name slug")
      .populate("subCategory", "name slug");

    if (!filter) {
      return res.status(404).json({
        success: false,
        message: "Filter not found",
      });
    }

    return res.status(200).json({
      success: true,
      filter,
    });
  } catch (error) {
    console.error("Get Filter Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Filters By SubCategory
// IMPORTANT FOR ADD / EDIT PRODUCT
// ==========================================

export const getFiltersBySubCategory = async (
  req,
  res
) => {
  try {
    const { subCategoryId } = req.params;

    const filters = await Filter.find({
      subCategory: subCategoryId,
      isActive: true,
    })
      .sort({
        sortOrder: 1,
        createdAt: 1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      filters,
    });
  } catch (error) {
    console.error(
      "Get Filters By SubCategory Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Create Filter
// ==========================================

export const createFilter = async (req, res) => {
  try {
    const filter = await Filter.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Filter created successfully",
      filter,
    });
  } catch (error) {
    console.error("Create Filter Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Filter
// ==========================================

export const updateFilter = async (req, res) => {
  try {
    const filter = await Filter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!filter) {
      return res.status(404).json({
        success: false,
        message: "Filter not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Filter updated successfully",
      filter,
    });
  } catch (error) {
    console.error("Update Filter Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Filter
// ==========================================

export const deleteFilter = async (req, res) => {
  try {
    const filter = await Filter.findByIdAndDelete(
      req.params.id
    );

    if (!filter) {
      return res.status(404).json({
        success: false,
        message: "Filter not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Filter deleted successfully",
    });
  } catch (error) {
    console.error("Delete Filter Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};