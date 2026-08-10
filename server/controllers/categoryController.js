import Category from "../models/Category.js";
import MenuGroup from "../models/MenuGroup.js";
import SubCategory from "../models/SubCategory.js";
import slugify from "slugify";


// ==================================================
// GET ALL CATEGORIES
// ==================================================

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
    console.error(
      "Get Categories Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch categories.",
    });
  }
};


// ==================================================
// GET SINGLE CATEGORY
// ==================================================

export const getCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(
      "Get Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch category.",
    });
  }
};


// ==================================================
// CREATE CATEGORY
// ==================================================

export const createCategory = async (
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


    // ----------------------------------------------
    // Validate Name
    // ----------------------------------------------

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Category name is required.",
      });
    }


    // ----------------------------------------------
    // Create Slug
    // ----------------------------------------------

    const slug = slugify(
      name.trim(),
      {
        lower: true,
        strict: true,
      }
    );


    // ----------------------------------------------
    // Check Duplicate Name
    // ----------------------------------------------

    const nameExists =
      await Category.findOne({
        name: name.trim(),
      });

    if (nameExists) {
      return res.status(409).json({
        success: false,
        message:
          "Category name already exists.",
      });
    }


    // ----------------------------------------------
    // Check Duplicate Slug
    // ----------------------------------------------

    const slugExists =
      await Category.findOne({
        slug,
      });

    if (slugExists) {
      return res.status(409).json({
        success: false,
        message:
          "Category already exists.",
      });
    }


    // ----------------------------------------------
    // Create Category
    // ----------------------------------------------

    const category =
      await Category.create({
        name: name.trim(),

        slug,

        icon:
          icon || "",

        image:
          image || "",

        description:
          description || "",

        sortOrder:
          Number(sortOrder) || 0,

        isActive:
          isActive ?? true,
      });


    res.status(201).json({
      success: true,
      message:
        "Category created successfully.",
      data: category,
    });
  } catch (error) {
    console.error(
      "Create Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create category.",
    });
  }
};


// ==================================================
// UPDATE CATEGORY
// ==================================================

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


    // ----------------------------------------------
    // Find Category
    // ----------------------------------------------

    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found.",
      });
    }


    // ----------------------------------------------
    // Update Name + Slug
    // ----------------------------------------------

    if (name?.trim()) {
      const newName =
        name.trim();

      const newSlug =
        slugify(newName, {
          lower: true,
          strict: true,
        });


      // Check duplicate name

      const duplicateName =
        await Category.findOne({
          name: newName,
          _id: {
            $ne: category._id,
          },
        });

      if (duplicateName) {
        return res.status(409).json({
          success: false,
          message:
            "Another category with this name already exists.",
        });
      }


      // Check duplicate slug

      const duplicateSlug =
        await Category.findOne({
          slug: newSlug,
          _id: {
            $ne: category._id,
          },
        });

      if (duplicateSlug) {
        return res.status(409).json({
          success: false,
          message:
            "Another category with this slug already exists.",
        });
      }


      category.name =
        newName;

      category.slug =
        newSlug;
    }


    // ----------------------------------------------
    // Update Other Fields
    // ----------------------------------------------

    if (
      icon !== undefined
    ) {
      category.icon =
        icon;
    }


    if (
      image !== undefined
    ) {
      category.image =
        image;
    }


    if (
      description !== undefined
    ) {
      category.description =
        description;
    }


    if (
      sortOrder !== undefined
    ) {
      category.sortOrder =
        Number(sortOrder);
    }


    if (
      isActive !== undefined
    ) {
      category.isActive =
        isActive;
    }


    // ----------------------------------------------
    // Save
    // ----------------------------------------------

    await category.save();


    res.status(200).json({
      success: true,
      message:
        "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    console.error(
      "Update Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update category.",
    });
  }
};

// ===================================================
// DELETE CATEGORY
// Also deletes related Menu Groups
// and Sub Categories
// ===================================================
export const deleteCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    // ========================================
    // Category Not Found
    // ========================================

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found.",
      });
    }

    // ========================================
    // Find Menu Groups
    // ========================================

    const menuGroups =
      await MenuGroup.find({
        category: category._id,
      }).select("_id");

    const menuGroupIds =
      menuGroups.map(
        (group) => group._id
      );

    // ========================================
    // Delete Sub Categories
    // ========================================

    if (menuGroupIds.length > 0) {
      await SubCategory.deleteMany({
        menuGroup: {
          $in: menuGroupIds,
        },
      });
    }

    // ========================================
    // Delete Menu Groups
    // ========================================

    await MenuGroup.deleteMany({
      category: category._id,
    });

    // ========================================
    // Delete Category
    // ========================================

    await Category.deleteOne({
      _id: category._id,
    });

    // ========================================
    // Success
    // ========================================

    return res.status(200).json({
      success: true,
      message:
        "Category, menu groups and sub categories deleted successfully.",
    });

  } catch (error) {
    console.error(
      "DELETE CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete category.",
    });
  }
};