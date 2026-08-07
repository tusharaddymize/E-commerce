import mongoose from "mongoose";

// ==========================================
// Review Schema
// ==========================================

const reviewSchema = new mongoose.Schema(
  {
    // ======================================
    // Product
    // ======================================

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    // ======================================
    // User
    // ======================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ======================================
    // Rating
    // ======================================

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // ======================================
    // Review Title
    // ======================================

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    // ======================================
    // Review Comment
    // ======================================

    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    // ======================================
    // Review Images
    // Future ready
    // ======================================

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // ======================================
    // Verified Purchase
    // Backend will calculate this from Order
    // ======================================

    verifiedPurchase: {
      type: Boolean,
      default: false,
    },

    // ======================================
    // Helpful
    // ======================================

    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    helpfulUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ==========================================
// One Review Per User Per Product
// ==========================================

reviewSchema.index(
  {
    product: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

// ==========================================
// Product Review Query Index
// ==========================================

reviewSchema.index({
  product: 1,
  createdAt: -1,
});

// ==========================================
// Rating Filter Index
// ==========================================

reviewSchema.index({
  product: 1,
  rating: -1,
});

// ==========================================
// Review Model
// ==========================================

const Review = mongoose.model(
  "Review",
  reviewSchema
);

export default Review;