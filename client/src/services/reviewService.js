import API from "./api";

// ==========================================
// Get Product Reviews
// Public
// ==========================================

export const getProductReviews = async (
  productId,
  params = {}
) => {
  const { data } = await API.get(
    `/reviews/product/${productId}`,
    {
      params,
    }
  );

  return data;
};

// ==========================================
// Create Review
// Login Required
// ==========================================

export const createReview = async (
  productId,
  reviewData
) => {
  const { data } = await API.post(
    `/reviews/product/${productId}`,
    reviewData
  );

  return data;
};

// ==========================================
// Update Own Review
// Login Required
// ==========================================

export const updateReview = async (
  reviewId,
  reviewData
) => {
  const { data } = await API.put(
    `/reviews/${reviewId}`,
    reviewData
  );

  return data;
};

// ==========================================
// Delete Review
// Owner / Admin
// ==========================================

export const deleteReview = async (
  reviewId
) => {
  const { data } = await API.delete(
    `/reviews/${reviewId}`
  );

  return data;
};

// ==========================================
// Toggle Helpful
// Login Required
// ==========================================

export const toggleReviewHelpful = async (
  reviewId
) => {
  const { data } = await API.put(
    `/reviews/${reviewId}/helpful`
  );

  return data;
};