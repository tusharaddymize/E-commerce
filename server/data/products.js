import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      default: "",
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    sizes: [
      {
        type: String,
      },
    ],

    colors: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    fabric: {
      type: String,
      default: "",
    },

    pattern: {
      type: String,
      default: "",
    },

    occasion: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "India",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Text Search Index
productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
});

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;