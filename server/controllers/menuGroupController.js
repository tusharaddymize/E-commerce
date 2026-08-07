import MenuGroup from "../models/MenuGroup.js";
import slugify from "slugify";

/* ==========================================
   Get All Menu Groups
========================================== */

export const getMenuGroups = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const groups = await MenuGroup.find(filter)
      .populate("category", "name slug")
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch menu groups.",
    });
  }
};

/* ==========================================
   Create Menu Group
========================================== */

export const createMenuGroup = async (req, res) => {
  try {
    const {
      category,
      name,
      description,
      sortOrder,
    } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const exists = await MenuGroup.findOne({
      category,
      slug,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Menu group already exists.",
      });
    }

    const group = await MenuGroup.create({
      category,
      name,
      slug,
      description,
      sortOrder,
    });

    res.status(201).json({
      success: true,
      data: group,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create menu group.",
    });
  }
};

/* ==========================================
   Update Menu Group
========================================== */

export const updateMenuGroup = async (req, res) => {
  try {
    const group = await MenuGroup.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Menu group not found.",
      });
    }

    Object.assign(group, req.body);

    if (req.body.name) {
      group.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    }

    await group.save();

    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update menu group.",
    });
  }
};

/* ==========================================
   Delete Menu Group
========================================== */

export const deleteMenuGroup = async (req, res) => {
  try {
    await MenuGroup.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Menu group deleted.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete menu group.",
    });
  }
};