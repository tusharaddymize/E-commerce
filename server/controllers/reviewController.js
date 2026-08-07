import mongoose from "mongoose";

import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// ==========================================
// Helper - Recalculate Product Rating
// ==========================================

const updateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: {
          $avg: "$rating",
        },
        totalReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  if (stats.length === 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      totalReviews: 0,
    });

    return;
  }

  const averageRating =
    Math.round(stats[0].averageRating * 10) / 10;

  await Product.findByIdAndUpdate(productId, {
    rating: averageRating,
    totalReviews: stats[0].totalReviews,
  });
};

// ==========================================
// Create Review
// POST /api/reviews/:productId
// Protected
// ==========================================

export const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;

    // ======================================
    // Validate Product ID
    // ======================================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // ======================================
    // Validate Fields
    // ======================================

    const numericRating = Number(rating);

    if (
      !numericRating ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select a rating between 1 and 5.",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Review title is required.",
      });
    }

    if (!comment?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Review comment is required.",
      });
    }

    // ======================================
    // Product Exists
    // ======================================

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // ======================================
    // Already Reviewed?
    // ======================================

    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message:
          "You have already reviewed this product. You can edit your existing review.",
      });
    }

    // ======================================
    // Verified Purchase Check
    // ======================================

    const deliveredOrder = await Order.findOne({
      userId: req.user._id,
      orderStatus: "Delivered",

      items: {
        $elemMatch: {
          productId: productId,
        },
      },
    }).select("_id");

    const verifiedPurchase = Boolean(deliveredOrder);

    // ======================================
    // Create Review
    // ======================================

    const review = await Review.create({
      product: productId,
      user: req.user._id,

      rating: numericRating,
      title: title.trim(),
      comment: comment.trim(),

      verifiedPurchase,
    });

    // ======================================
    // Update Product Rating
    // ======================================

    await updateProductRating(productId);

    // ======================================
    // Populate User
    // ======================================

    await review.populate("user", "name avatar");

    const updatedProduct = await Product.findById(
      productId
    ).select("rating totalReviews");

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review,
      rating: updatedProduct?.rating || 0,
      totalReviews: updatedProduct?.totalReviews || 0,
    });
  } catch (error) {
    console.error("Create Review Error:", error);

    // Duplicate review index protection

    if (error?.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Product Reviews
// GET /api/reviews/:productId
// Public
// ==========================================

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const {
      page = 1,
      limit = 10,
      rating,
    } = req.query;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const product = await Product.findById(productId).select(
      "rating totalReviews"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const query = {
      product: productId,
    };

    if (rating) {
      const numericRating = Number(rating);

      if (
        Number.isInteger(numericRating) &&
        numericRating >= 1 &&
        numericRating <= 5
      ) {
        query.rating = numericRating;
      }
    }

    const currentPage = Math.max(1, Number(page) || 1);

    const perPage = Math.min(
      50,
      Math.max(1, Number(limit) || 10)
    );

    const skip = (currentPage - 1) * perPage;

    // ======================================
    // Reviews + Count + Breakdown
    // ======================================

    const [reviews, filteredTotal, breakdown] =
      await Promise.all([
        Review.find(query)
          .populate("user", "name avatar")
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(perPage)
          .lean(),

        Review.countDocuments(query),

        Review.aggregate([
          {
            $match: {
              product:
                new mongoose.Types.ObjectId(productId),
            },
          },
          {
            $group: {
              _id: "$rating",
              count: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
        ]),
      ]);

    // ======================================
    // Always Return 5 → 1 Stars
    // ======================================

    const ratings = [5, 4, 3, 2, 1].map(
      (star) => {
        const found = breakdown.find(
          (item) => item._id === star
        );

        return {
          star,
          count: found?.count || 0,
        };
      }
    );

    return res.status(200).json({
      success: true,

      summary: {
        average: product.rating || 0,
        totalReviews: product.totalReviews || 0,
        ratings,
      },

      page: currentPage,
      limit: perPage,

      filteredTotal,

      totalPages: Math.ceil(
        filteredTotal / perPage
      ),

      reviews,
    });
  } catch (error) {
    console.error("Get Reviews Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Own Review
// PUT /api/reviews/:reviewId
// Protected
// ==========================================

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, title, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID.",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    // ======================================
    // Only Owner Can Edit
    // ======================================

    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own review.",
      });
    }

    // ======================================
    // Rating
    // ======================================

    if (rating !== undefined) {
      const numericRating = Number(rating);

      if (
        !numericRating ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Rating must be between 1 and 5.",
        });
      }

      review.rating = numericRating;
    }

    // ======================================
    // Title
    // ======================================

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Review title cannot be empty.",
        });
      }

      review.title = title.trim();
    }

    // ======================================
    // Comment
    // ======================================

    if (comment !== undefined) {
      if (!comment.trim()) {
        return res.status(400).json({
          success: false,
          message: "Review comment cannot be empty.",
        });
      }

      review.comment = comment.trim();
    }

    await review.save();

    await updateProductRating(review.product);

    await review.populate("user", "name avatar");

    const updatedProduct = await Product.findById(
      review.product
    ).select("rating totalReviews");

    return res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review,
      rating: updatedProduct?.rating || 0,
      totalReviews: updatedProduct?.totalReviews || 0,
    });
  } catch (error) {
    console.error("Update Review Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Own Review
// DELETE /api/reviews/:reviewId
// Protected
// ==========================================

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID.",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    // User can delete own review.
    // Admin can delete any review.

    const isOwner =
      review.user.toString() ===
      req.user._id.toString();

    const isAdmin =
      req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to delete this review.",
      });
    }

    const productId = review.product;

    await review.deleteOne();

    await updateProductRating(productId);

    const updatedProduct = await Product.findById(
      productId
    ).select("rating totalReviews");

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
      rating: updatedProduct?.rating || 0,
      totalReviews: updatedProduct?.totalReviews || 0,
    });
  } catch (error) {
    console.error("Delete Review Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Toggle Helpful
// PUT /api/reviews/:reviewId/helpful
// Protected
// ==========================================

export const toggleHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID.",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const userId = req.user._id.toString();

    const alreadyHelpful = review.helpfulUsers.some(
      (id) => id.toString() === userId
    );

    if (alreadyHelpful) {
      review.helpfulUsers =
        review.helpfulUsers.filter(
          (id) => id.toString() !== userId
        );
    } else {
      review.helpfulUsers.push(req.user._id);
    }

    // Keep count synchronized with users array

    review.helpfulCount =
      review.helpfulUsers.length;

    await review.save();

    return res.status(200).json({
      success: true,

      message: alreadyHelpful
        ? "Helpful removed."
        : "Marked as helpful.",

      helpful: !alreadyHelpful,
      helpfulCount: review.helpfulCount,
    });
  } catch (error) {
    console.error("Helpful Review Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};