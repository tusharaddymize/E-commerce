import MenuGroup from "../models/MenuGroup.js";
import Category from "../models/Category.js";
import slugify from "slugify";


// ==================================================
// GET ALL MENU GROUPS
// ==================================================

export const getMenuGroups = async (
  req,
  res
) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category =
        req.query.category;
    }

    const groups =
      await MenuGroup.find(filter)
        .populate(
          "category",
          "name slug"
        )
        .sort({
          sortOrder: 1,
          name: 1,
        });

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    console.error(
      "Get Menu Groups Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch menu groups.",
    });
  }
};


// ==================================================
// GET SINGLE MENU GROUP
// ==================================================

export const getMenuGroup = async (
  req,
  res
) => {
  try {
    const group =
      await MenuGroup.findById(
        req.params.id
      ).populate(
        "category",
        "name slug"
      );

    if (!group) {
      return res.status(404).json({
        success: false,
        message:
          "Menu group not found.",
      });
    }

    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch menu group.",
    });
  }
};


// ==================================================
// CREATE MENU GROUP
// ==================================================

export const createMenuGroup = async (
  req,
  res
) => {
  try {
    const {
      category,
      name,
      description,
      sortOrder,
      isActive,
    } = req.body;

    // Validate category

    if (!category) {
      return res.status(400).json({
        success: false,
        message:
          "Category is required.",
      });
    }

    // Validate name

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Menu group name is required.",
      });
    }

    // Check category exists

    const categoryExists =
      await Category.findById(
        category
      );

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message:
          "Selected category not found.",
      });
    }

    // Create slug

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    // Check duplicate

    const exists =
      await MenuGroup.findOne({
        category,
        slug,
      });

    if (exists) {
      return res.status(409).json({
        success: false,
        message:
          "Menu group already exists in this category.",
      });
    }

    // Create

    const group =
      await MenuGroup.create({
        category,
        name: name.trim(),
        slug,
        description:
          description || "",
        sortOrder:
          Number(sortOrder) || 0,
        isActive:
          isActive ?? true,
      });

    const populatedGroup =
      await MenuGroup.findById(
        group._id
      ).populate(
        "category",
        "name slug"
      );

    res.status(201).json({
      success: true,
      message:
        "Menu group created successfully.",
      data: populatedGroup,
    });
  } catch (error) {
    console.error(
      "Create Menu Group Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create menu group.",
    });
  }
};


// ==================================================
// UPDATE MENU GROUP
// ==================================================

export const updateMenuGroup = async (
  req,
  res
) => {
  try {
    const group =
      await MenuGroup.findById(
        req.params.id
      );

    if (!group) {
      return res.status(404).json({
        success: false,
        message:
          "Menu group not found.",
      });
    }

    const {
      category,
      name,
      description,
      sortOrder,
      isActive,
    } = req.body;

    if (category) {
      const categoryExists =
        await Category.findById(
          category
        );

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message:
            "Selected category not found.",
        });
      }

      group.category =
        category;
    }

    if (name?.trim()) {
      group.name =
        name.trim();

      group.slug =
        slugify(name, {
          lower: true,
          strict: true,
        });
    }

    if (
      description !== undefined
    ) {
      group.description =
        description;
    }

    if (
      sortOrder !== undefined
    ) {
      group.sortOrder =
        Number(sortOrder);
    }

    if (
      isActive !== undefined
    ) {
      group.isActive =
        isActive;
    }

    await group.save();

    const populatedGroup =
      await MenuGroup.findById(
        group._id
      ).populate(
        "category",
        "name slug"
      );

    res.json({
      success: true,
      message:
        "Menu group updated successfully.",
      data: populatedGroup,
    });
  } catch (error) {
    console.error(
      "Update Menu Group Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update menu group.",
    });
  }
};


// ==================================================
// DELETE MENU GROUP
// ==================================================

export const deleteMenuGroup = async (
  req,
  res
) => {
  try {
    const group =
      await MenuGroup.findById(
        req.params.id
      );

    if (!group) {
      return res.status(404).json({
        success: false,
        message:
          "Menu group not found.",
      });
    }

    await group.deleteOne();

    res.json({
      success: true,
      message:
        "Menu group deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Menu Group Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete menu group.",
    });
  }
};