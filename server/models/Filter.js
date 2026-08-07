import mongoose from "mongoose";

const filterOptionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      default: "",
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
    _id: false,
  }
);

const filterSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    menuGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuGroup",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: [
        "checkbox",
        "radio",
        "dropdown",
        "color",
        "range",
        "rating",
      ],
      default: "checkbox",
    },

    options: {
      type: [filterOptionSchema],
      default: [],
    },

    min: {
      type: Number,
      default: null,
    },

    max: {
      type: Number,
      default: null,
    },

    step: {
      type: Number,
      default: 1,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },

    isDynamic: {
  type: Boolean,
  default: true,
},

    isActive: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

filterSchema.index({
  category: 1,
  menuGroup: 1,
  subCategory: 1,
});

filterSchema.index({
  key: 1,
});

export default mongoose.model(
  "Filter",
  filterSchema
);