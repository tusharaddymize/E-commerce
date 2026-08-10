import SubCategory from "../models/SubCategory.js";
import Category from "../models/Category.js";
import MenuGroup from "../models/MenuGroup.js";
import slugify from "slugify";

// ==================================================
// GET ALL SUB CATEGORIES
// ==================================================

export const getSubCategories = async (
  req,
  res
) => {
  try {
    const filter = {};

    // Filter by Category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filter by Menu Group
    if (req.query.menuGroup) {
      filter.menuGroup =
        req.query.menuGroup;
    }

    const subCategories =
      await SubCategory.find(filter)
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        )
        .sort({
          sortOrder: 1,
          name: 1,
        });

    res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories,
    });
  } catch (error) {
    console.error(
      "Get Sub Categories Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch sub categories.",
    });
  }
};

// ==================================================
// GET SINGLE SUB CATEGORY
// ==================================================

export const getSubCategory = async (
  req,
  res
) => {
  try {
    const subCategory =
      await SubCategory.findById(
        req.params.id
      )
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        );

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message:
          "Sub category not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.error(
      "Get Sub Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch sub category.",
    });
  }
};

// ==================================================
// CREATE SUB CATEGORY
// ==================================================

export const createSubCategory = async (
  req,
  res
) => {
  try {
    const {
      category,
      menuGroup,
      name,
      description,
      image,
      banner,
      sortOrder,
      isFeatured,
      isActive,
    } = req.body;

    // ----------------------------------------------
    // Validation
    // ----------------------------------------------

    if (!category) {
      return res.status(400).json({
        success: false,
        message:
          "Category is required.",
      });
    }

    if (!menuGroup) {
      return res.status(400).json({
        success: false,
        message:
          "Menu group is required.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Sub category name is required.",
      });
    }

    // ----------------------------------------------
    // Check Category
    // ----------------------------------------------

    const categoryExists =
      await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found.",
      });
    }

    // ----------------------------------------------
    // Check Menu Group
    // ----------------------------------------------

    const menuGroupExists =
      await MenuGroup.findById(
        menuGroup
      );

    if (!menuGroupExists) {
      return res.status(404).json({
        success: false,
        message:
          "Menu group not found.",
      });
    }

    // ----------------------------------------------
    // Ensure Menu Group belongs
    // to selected Category
    // ----------------------------------------------

    if (
      menuGroupExists.category.toString() !==
      category.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Selected menu group does not belong to the selected category.",
      });
    }

    // ----------------------------------------------
    // Generate Slug
    // ----------------------------------------------

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    // ----------------------------------------------
    // Check Duplicate
    // ----------------------------------------------

    const exists =
      await SubCategory.findOne({
        menuGroup,
        slug,
      });

    if (exists) {
      return res.status(409).json({
        success: false,
        message:
          "Sub category already exists in this menu group.",
      });
    }

    // ----------------------------------------------
    // Create Sub Category
    // ----------------------------------------------

    const subCategory =
      await SubCategory.create({
        category,
        menuGroup,
        name: name.trim(),
        slug,
        description:
          description || "",
        image: image || "",
        banner: banner || "",
        sortOrder:
          sortOrder !== undefined
            ? Number(sortOrder)
            : 0,
        isFeatured:
          isFeatured !== undefined
            ? Boolean(isFeatured)
            : false,
        isActive:
          isActive !== undefined
            ? Boolean(isActive)
            : true,
      });

    // ----------------------------------------------
    // Populate Response
    // ----------------------------------------------

    const populatedSubCategory =
      await SubCategory.findById(
        subCategory._id
      )
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        );

    res.status(201).json({
      success: true,
      message:
        "Sub category created successfully.",
      data: populatedSubCategory,
    });
  } catch (error) {
    console.error(
      "Create Sub Category Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Sub category already exists in this menu group.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Failed to create sub category.",
    });
  }
};

// ==================================================
// UPDATE SUB CATEGORY
// ==================================================

export const updateSubCategory = async (
  req,
  res
) => {
  try {
    const subCategory =
      await SubCategory.findById(
        req.params.id
      );

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message:
          "Sub category not found.",
      });
    }

    const {
      category,
      menuGroup,
      name,
      description,
      image,
      banner,
      sortOrder,
      isFeatured,
      isActive,
    } = req.body;

    // ----------------------------------------------
    // Determine final Category
    // ----------------------------------------------

    const finalCategory =
      category || subCategory.category;

    // ----------------------------------------------
    // Determine final Menu Group
    // ----------------------------------------------

    const finalMenuGroup =
      menuGroup ||
      subCategory.menuGroup;

    // ----------------------------------------------
    // Check Category
    // ----------------------------------------------

    if (category) {
      const categoryExists =
        await Category.findById(
          category
        );

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message:
            "Category not found.",
        });
      }

      subCategory.category =
        category;
    }

    // ----------------------------------------------
    // Check Menu Group
    // ----------------------------------------------

    if (menuGroup) {
      const menuGroupExists =
        await MenuGroup.findById(
          menuGroup
        );

      if (!menuGroupExists) {
        return res.status(404).json({
          success: false,
          message:
            "Menu group not found.",
        });
      }

      subCategory.menuGroup =
        menuGroup;
    }

    // ----------------------------------------------
    // Verify Category + Menu Group
    // ----------------------------------------------

    const menuGroupExists =
      await MenuGroup.findById(
        finalMenuGroup
      );

    if (!menuGroupExists) {
      return res.status(404).json({
        success: false,
        message:
          "Menu group not found.",
      });
    }

    if (
      menuGroupExists.category.toString() !==
      finalCategory.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Selected menu group does not belong to the selected category.",
      });
    }

    // ----------------------------------------------
    // Update Name + Slug
    // ----------------------------------------------

    if (
      name !== undefined &&
      name.trim()
    ) {
      subCategory.name =
        name.trim();

      subCategory.slug =
        slugify(name, {
          lower: true,
          strict: true,
        });
    }

    // ----------------------------------------------
    // Update Other Fields
    // ----------------------------------------------

    if (
      description !== undefined
    ) {
      subCategory.description =
        description;
    }

    if (image !== undefined) {
      subCategory.image =
        image;
    }

    if (banner !== undefined) {
      subCategory.banner =
        banner;
    }

    if (sortOrder !== undefined) {
      subCategory.sortOrder =
        Number(sortOrder);
    }

    if (isFeatured !== undefined) {
      subCategory.isFeatured =
        Boolean(isFeatured);
    }

    if (isActive !== undefined) {
      subCategory.isActive =
        Boolean(isActive);
    }

    // ----------------------------------------------
    // Save
    // ----------------------------------------------

    await subCategory.save();

    // ----------------------------------------------
    // Populate Response
    // ----------------------------------------------

    const updatedSubCategory =
      await SubCategory.findById(
        subCategory._id
      )
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        );

    res.status(200).json({
      success: true,
      message:
        "Sub category updated successfully.",
      data: updatedSubCategory,
    });
  } catch (error) {
    console.error(
      "Update Sub Category Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Sub category already exists in this menu group.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Failed to update sub category.",
    });
  }
};

// ==================================================
// DELETE SUB CATEGORY
// ==================================================

export const deleteSubCategory = async (
  req,
  res
) => {
  try {
    const subCategory =
      await SubCategory.findById(
        req.params.id
      );

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message:
          "Sub category not found.",
      });
    }

    await subCategory.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Sub category deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Sub Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete sub category.",
    });
  }
};