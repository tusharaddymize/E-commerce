import mongoose from "mongoose";

// ==========================================
// Product Schema
// ==========================================

const productSchema = new mongoose.Schema(
  {
    // ========================================
    // Basic Product Information
    // ========================================

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
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // ========================================
    // Category Structure
    // ========================================

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    menuGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuGroup",
      required: true,
      index: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
      index: true,
    },

    // ========================================
    // Pricing
    // ========================================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    oldPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // ========================================
    // Inventory
    // ========================================

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

    // ========================================
    // Product Images
    // ========================================

    thumbnail: {
      type: String,
      default: "",
      trim: true,
    },

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // ========================================
    // Product Variants
    // ========================================

    sizes: [
      {
        type: String,
        trim: true,
      },
    ],

    colors: [
      {
        type: String,
        trim: true,
      },
    ],

    // ========================================
    // Dynamic Product Attributes
    // ========================================
    //
    // Complete category-specific attributes.
    //
    // Examples:
    //
    // Smartwatch:
    // display: "1.96 AMOLED"
    // battery: "7 Days"
    // bluetooth: "5.3"
    //
    // T-Shirt:
    // fabric: "Cotton"
    // fit: "Regular"
    // sleeve: "Half Sleeve"
    //
    // These attributes can also be used
    // for product filters/specifications.
    // ========================================

    attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // ========================================
    // Product Highlights
    // ========================================
    //
    // Important information shown quickly
    // on Product Details page.
    //
    // Example:
    //
    // highlights: [
    //   {
    //     label: "Display",
    //     value: "1.96 inch AMOLED"
    //   },
    //   {
    //     label: "Battery",
    //     value: "Up to 7 Days"
    //   }
    // ]
    //
    // Recommended: 4 - 8 highlights
    // ========================================

    highlights: [
      {
        label: {
          type: String,
          trim: true,
          default: "",
        },

        value: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],

    // ========================================
    // Rating & Sales
    // ========================================

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    sold: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ========================================
    // Legacy Fashion Fields
    // ========================================
    //
    // Keep these fields for existing products.
    // New dynamic products should preferably
    // use attributes + highlights.
    // ========================================

    fabric: {
      type: String,
      default: "",
      trim: true,
    },

    pattern: {
      type: String,
      default: "",
      trim: true,
    },

    occasion: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },

    // ========================================
    // Product Flags
    // ========================================

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isBestSelling: {
      type: Boolean,
      default: false,
    },

    // ========================================
    // Product Status
    // ========================================

    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// Text Search Index
// ==========================================

productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
});

// ==========================================
// Useful Query Indexes
// ==========================================

productSchema.index({
  category: 1,
  menuGroup: 1,
  subCategory: 1,
});

productSchema.index({
  status: 1,
  createdAt: -1,
});

// ==========================================
// Clean Highlights Before Save
// ==========================================

productSchema.pre("save", function (next) {
  if (Array.isArray(this.highlights)) {
    this.highlights = this.highlights.filter(
      (item) =>
        item?.label?.trim() &&
        item?.value?.trim()
    );
  }

  next();
});

// ==========================================
// Product Model
// ==========================================

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;