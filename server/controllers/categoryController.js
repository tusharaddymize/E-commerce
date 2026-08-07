import Category from "../models/Category.js";
import slugify from "slugify";

/* ===================================================
   GET ALL CATEGORIES
=================================================== */

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({
        sortOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
    });
  }
};

/* ===================================================
   GET SINGLE CATEGORY
=================================================== */

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category.",
    });
  }
};

/* ===================================================
   CREATE CATEGORY
=================================================== */

export const createCategory = async (req, res) => {
  try {
    const {
      name,
      icon,
      image,
      description,
      sortOrder,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const exists = await Category.findOne({
      slug,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category =
      await Category.create({
        name,
        slug,
        icon,
        image,
        description,
        sortOrder,
      });

    res.status(201).json({
      success: true,
      message:
        "Category created successfully.",
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create category.",
    });
  }
};

/* ===================================================
   UPDATE CATEGORY
=================================================== */

export const updateCategory = async (
  req,
  res
) => {
  try {
    const {
      name,
      icon,
      image,
      description,
      sortOrder,
      isActive,
    } = req.body;

    const category =
      await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    if (name) {
      category.name = name;

      category.slug = slugify(name, {
        lower: true,
        strict: true,
      });
    }

    if (icon !== undefined)
      category.icon = icon;

    if (image !== undefined)
      category.image = image;

    if (description !== undefined)
      category.description =
        description;

    if (sortOrder !== undefined)
      category.sortOrder = sortOrder;

    if (isActive !== undefined)
      category.isActive = isActive;

    await category.save();

    res.json({
      success: true,
      message:
        "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update category.",
    });
  }
};

/* ===================================================
   DELETE CATEGORY
=================================================== */

export const deleteCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message:
        "Category deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category.",
    });
  }
};