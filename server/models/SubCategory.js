import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    // ==========================================
    // Parent Category
    // ==========================================

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    // ==========================================
    // Parent Menu Group
    // ==========================================

    menuGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuGroup",
      required: true,
      index: true,
    },

    // ==========================================
    // Sub Category Name
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // ==========================================
    // Slug
    // ==========================================

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // ==========================================
    // Description
    // ==========================================

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    // ==========================================
    // Image
    // ==========================================

    image: {
      type: String,
      default: "",
    },

    // ==========================================
    // Banner
    // ==========================================

    banner: {
      type: String,
      default: "",
    },

    // ==========================================
    // Sort Order
    // ==========================================

    sortOrder: {
      type: Number,
      default: 0,
    },

    // ==========================================
    // Featured
    // ==========================================

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // Active / Inactive
    // ==========================================

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// Main Sorting Index
// ==========================================

subCategorySchema.index({
  category: 1,
  menuGroup: 1,
  sortOrder: 1,
});

// ==========================================
// Prevent Duplicate Sub Categories
// inside the Same Menu Group
// ==========================================

subCategorySchema.index(
  {
    menuGroup: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

// ==========================================
// Export Model
// ==========================================

const SubCategory = mongoose.model(
  "SubCategory",
  subCategorySchema
);

export default SubCategory;