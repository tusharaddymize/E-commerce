import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// =======================================
// Get All Products
// =======================================

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      brand,
      search,
      minPrice,
      maxPrice,
      rating,
      sort,
    } = req.query;

const query = {};

    // ==========================
    // Search
    // ==========================

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          brand: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ==========================
    // Category
    // ==========================

    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }

    // ==========================
    // Brand
    // ==========================

    if (brand) {
      query.brand = {
        $regex: brand,
        $options: "i",
      };
    }

    // ==========================
    // Price
    // ==========================

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // ==========================
    // Rating
    // ==========================

    if (rating) {
      query.rating = {
        $gte: Number(rating),
      };
    }

    // ==========================
    // Sorting
    // ==========================

    let sortOption = {
      createdAt: -1,
    };

    switch (sort) {
      case "priceLow":
        sortOption = {
          price: 1,
        };
        break;

      case "priceHigh":
        sortOption = {
          price: -1,
        };
        break;

      case "rating":
        sortOption = {
          rating: -1,
        };
        break;

      case "popular":
        sortOption = {
          sold: -1,
        };
        break;

      case "latest":
      default:
        sortOption = {
          createdAt: -1,
        };
    }

    // ==========================
    // Pagination
    // ==========================

const currentPage = Math.max(1, Number(page));
const perPage = Math.max(1, Number(limit));

const skip = (currentPage - 1) * perPage;

    const products =
      await Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(perPage);
    const total =
      await Product.countDocuments(query);

res.status(200).json({
  success: true,
  page: currentPage,
  limit: perPage,
  total,
  totalPages: Math.ceil(total / perPage),
  products,
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =======================================
// Get Single Product
// =======================================

export const getProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =======================================
// Create Product
// =======================================

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      brand,
      category,
      price,
      oldPrice,
      discount,
      stock,
      sku,
      sizes,
      colors,
      fabric,
      pattern,
      occasion,
      country,
      isFeatured,
      isTrending,
      status,
    } = req.body;

    // ==========================
    // Validation
    // ==========================

    if (!title || !description || !brand || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // ==========================
    // Slug
    // ==========================

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    // ==========================
    // Upload Thumbnail
    // ==========================

    let thumbnail = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      thumbnail = uploadResult.secure_url;
    }

    // ==========================
    // Create Product
    // ==========================

    const product = await Product.create({
      title,
      slug,
      description,
      brand,
      category,
      price,
      oldPrice,
      discount,
      stock,
      sku,
      thumbnail,
      images: thumbnail ? [thumbnail] : [],
      sizes: sizes
        ? Array.isArray(sizes)
          ? sizes
          : sizes.split(",").map((i) => i.trim())
        : [],
      colors: colors
        ? Array.isArray(colors)
          ? colors
          : colors.split(",").map((i) => i.trim())
        : [],
      fabric,
      pattern,
      occasion,
      country,
      isFeatured:
        isFeatured === true || isFeatured === "true",
      isTrending:
        isTrending === true || isTrending === "true",
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Update Product
// =======================================

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Upload new image if selected
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      product.thumbnail = uploadResult.secure_url;
      product.images = [uploadResult.secure_url];
    }

    // Update fields
    product.title = req.body.title || product.title;
    product.description =
      req.body.description || product.description;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.oldPrice = req.body.oldPrice || product.oldPrice;
    product.discount = req.body.discount || product.discount;
    product.stock = req.body.stock || product.stock;
    product.sku = req.body.sku || product.sku;
    product.fabric = req.body.fabric || product.fabric;
    product.pattern = req.body.pattern || product.pattern;
    product.occasion = req.body.occasion || product.occasion;
    product.country = req.body.country || product.country;
    product.status = req.body.status || product.status;

    product.isFeatured =
      req.body.isFeatured === "true" ||
      req.body.isFeatured === true;

    product.isTrending =
      req.body.isTrending === "true" ||
      req.body.isTrending === true;

    product.sizes = req.body.sizes
      ? req.body.sizes.split(",").map((i) => i.trim())
      : product.sizes;

    product.colors = req.body.colors
      ? req.body.colors.split(",").map((i) => i.trim())
      : product.colors;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =======================================
// Delete Product
// =======================================

export const deleteProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};