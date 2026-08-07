import SubCategory from "../models/SubCategory.js";
import slugify from "slugify";

/* ==========================================
   Get All Sub Categories
========================================== */

export const getSubCategories = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.menuGroup) {
      filter.menuGroup = req.query.menuGroup;
    }

    const subCategories = await SubCategory.find(filter)
      .populate("category", "name")
      .populate("menuGroup", "name")
      .sort({
        sortOrder: 1,
        name: 1,
      });

    res.json({
      success: true,
      count: subCategories.length,
      data: subCategories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sub categories.",
    });
  }
};

/* ==========================================
   Create Sub Category
========================================== */

export const createSubCategory = async (req, res) => {
  try {
    const slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });

    const exists = await SubCategory.findOne({
      slug,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Sub category already exists.",
      });
    }

    const subCategory =
      await SubCategory.create({
        ...req.body,
        slug,
      });

    res.status(201).json({
      success: true,
      data: subCategory,
    });
} catch (error) {
  console.error("========== CREATE SUB CATEGORY ERROR ==========");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
    error,
  });
}
};

/* ==========================================
   Update Sub Category
========================================== */

export const updateSubCategory = async (req, res) => {
  try {
    const subCategory =
      await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Sub category not found.",
      });
    }

    Object.assign(subCategory, req.body);

    if (req.body.name) {
      subCategory.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    }

    await subCategory.save();

    res.json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update sub category.",
    });
  }
};

/* ==========================================
   Delete Sub Category
========================================== */

export const deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Sub category deleted.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete sub category.",
    });
  }
};