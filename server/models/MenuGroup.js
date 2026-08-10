import mongoose from "mongoose";

const menuGroupSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

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
// Prevent duplicate menu groups
// inside the same category
// ==========================================

menuGroupSchema.index(
  {
    category: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

// ==========================================
// Sorting
// ==========================================

menuGroupSchema.index({
  category: 1,
  sortOrder: 1,
});

const MenuGroup = mongoose.model(
  "MenuGroup",
  menuGroupSchema
);

export default MenuGroup;