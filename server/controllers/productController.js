import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

import Category from "../models/Category.js";
import MenuGroup from "../models/MenuGroup.js";
import SubCategory from "../models/SubCategory.js";
import Filter from "../models/Filter.js";

// =======================================
// Helper - Upload File To Cloudinary
// =======================================

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file?.buffer) {
      return reject(
        new Error("Invalid image file.")
      );
    }

    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: "products",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(file.buffer)
      .pipe(stream);
  });
};

// =======================================
// Helper - Parse JSON Safely
// =======================================

const parseJSON = (
  value,
  fallback
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

// =======================================
// Helper - Parse Comma Array
// =======================================

const parseArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        String(item).trim()
      )
      .filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// =======================================
// Helper - Boolean
// =======================================

const parseBoolean = (value) => {
  return (
    value === true ||
    value === "true"
  );
};

// =======================================
// Helper - Number
// =======================================

const parseNumber = (
  value,
  fallback = 0
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  const number = Number(value);

  return Number.isNaN(number)
    ? fallback
    : number;
};

// =======================================
// Helper - Create Slug
// =======================================

const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// =======================================
// Helper - Clean Highlights
// =======================================

const cleanHighlights = (value) => {
  const parsed = parseJSON(value, []);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .map((item) => ({
      label: String(
        item?.label || ""
      ).trim(),

      value: String(
        item?.value || ""
      ).trim(),
    }))
    .filter(
      (item) =>
        item.label &&
        item.value
    )
    .slice(0, 8);
};

// =======================================
// Get All Products
// =======================================

export const getProducts = async (
  req,
  res
) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      menuGroup,
      subCategory,
      brand,
      search,
      minPrice,
      maxPrice,
      rating,
      sort,
    } = req.query;

    const query = {};

    // =====================================
    // Advanced Search
    // =====================================

    if (search) {
      const regex = new RegExp(
        search,
        "i"
      );

      const [
        categories,
        menuGroups,
        subCategories,
      ] = await Promise.all([
        Category.find({
          name: regex,
        }).select("_id"),

        MenuGroup.find({
          name: regex,
        }).select("_id"),

        SubCategory.find({
          name: regex,
        }).select("_id"),
      ]);

      query.$or = [
        {
          title: {
            $regex: regex,
          },
        },

        {
          brand: {
            $regex: regex,
          },
        },

        {
          category: {
            $in: categories.map(
              (item) => item._id
            ),
          },
        },

        {
          menuGroup: {
            $in: menuGroups.map(
              (item) => item._id
            ),
          },
        },

        {
          subCategory: {
            $in: subCategories.map(
              (item) => item._id
            ),
          },
        },
      ];
    }

    // =====================================
    // Category
    // =====================================

    if (category) {
      const categoryDoc =
        await Category.findOne({
          slug: category,
        }).select("_id");

      if (categoryDoc) {
        query.category =
          categoryDoc._id;
      }
    }

    // =====================================
    // Menu Group
    // =====================================

    if (menuGroup) {
      const menuGroupDoc =
        await MenuGroup.findOne({
          slug: menuGroup,
        }).select("_id");

      if (menuGroupDoc) {
        query.menuGroup =
          menuGroupDoc._id;
      }
    }

    // =====================================
    // Sub Category
    // =====================================

    if (subCategory) {
      const subCategoryDoc =
        await SubCategory.findOne({
          slug: subCategory,
        }).select("_id");

      if (subCategoryDoc) {
        query.subCategory =
          subCategoryDoc._id;
      }
    }

    // =====================================
    // Brand
    // =====================================

    if (brand) {
      query.brand = {
        $regex: brand,
        $options: "i",
      };
    }

    // =====================================
    // Price
    // =====================================

    if (
      minPrice ||
      maxPrice
    ) {
      query.price = {};

      if (minPrice) {
        query.price.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte =
          Number(maxPrice);
      }
    }

    // =====================================
    // Rating
    // =====================================

    if (rating) {
      query.rating = {
        $gte: Number(rating),
      };
    }

    // =====================================
    // Dynamic Attribute Filters
    // =====================================

    const reservedKeys = [
      "page",
      "limit",
      "category",
      "menuGroup",
      "subCategory",
      "brand",
      "search",
      "minPrice",
      "maxPrice",
      "rating",
      "sort",
    ];

    Object.entries(
      req.query
    ).forEach(
      ([key, value]) => {
        if (
          reservedKeys.includes(
            key
          ) ||
          value === undefined ||
          value === null ||
          value === ""
        ) {
          return;
        }

        // Array values

        if (
          Array.isArray(value)
        ) {
          query[
            `attributes.${key}`
          ] = {
            $in: value,
          };

          return;
        }

        // Comma separated values

        if (
          typeof value ===
            "string" &&
          value.includes(",")
        ) {
          query[
            `attributes.${key}`
          ] = {
            $in: value
              .split(",")
              .map((item) =>
                item.trim()
              ),
          };

          return;
        }

        // Single value

        query[
          `attributes.${key}`
        ] = value;
      }
    );

    // =====================================
    // Sorting
    // =====================================

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

      default:
        sortOption = {
          createdAt: -1,
        };
    }

    // =====================================
    // Pagination
    // =====================================

    const currentPage =
      Math.max(
        1,
        Number(page)
      );

    const perPage =
      Math.max(
        1,
        Number(limit)
      );

    const skip =
      (currentPage - 1) *
      perPage;

    const products =
      await Product.find(query)
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        )
        .populate(
          "subCategory",
          "name slug"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(perPage);

    const total =
      await Product.countDocuments(
        query
      );

    res.status(200).json({
      success: true,
      page: currentPage,
      limit: perPage,
      total,
      totalPages:
        Math.ceil(
          total / perPage
        ),
      products,
    });
  } catch (error) {
    console.error(
      "Get Products Error:",
      error
    );

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
      )
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        )
        .populate(
          "subCategory",
          "name slug"
        );

    if (!product) {
      return res
        .status(404)
        .json({
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
    console.error(
      "Get Product Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Create Product
// =======================================

export const createProduct = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      brand,

      category,
      menuGroup,
      subCategory,

      price,
      oldPrice,
      discount,

      stock,
      sku,

      sizes,
      colors,

      attributes,
      highlights,

      fabric,
      pattern,
      occasion,
      country,

      isFeatured,
      isTrending,
      isNewArrival,
      isBestSelling,

      status,
    } = req.body;

    // =====================================
    // Validation
    // =====================================

    if (
      !title ||
      !description ||
      !brand ||
      !category ||
      !menuGroup ||
      !subCategory ||
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Please fill all required fields.",
        });
    }

    // =====================================
    // Slug
    // =====================================

    const slug =
      createSlug(title);

    // =====================================
    // Prevent Duplicate Slug
    // =====================================

    const existingProduct =
      await Product.findOne({
        slug,
      });

    if (existingProduct) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "A product with this title already exists.",
        });
    }

    // =====================================
    // Files From upload.fields()
    // =====================================

    const thumbnailFile =
      req.files?.thumbnail?.[0];

    const additionalFiles =
      req.files?.images || [];

    // =====================================
    // Main Image Required
    // =====================================

    if (!thumbnailFile) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Main product image is required.",
        });
    }

    // =====================================
    // Upload Main Image
    // =====================================

    const thumbnailResult =
      await uploadToCloudinary(
        thumbnailFile
      );

    const thumbnail =
      thumbnailResult.secure_url;

    // =====================================
    // Upload Additional Images
    // =====================================

    const additionalResults =
      await Promise.all(
        additionalFiles.map(
          (file) =>
            uploadToCloudinary(
              file
            )
        )
      );

    const additionalImages =
      additionalResults.map(
        (result) =>
          result.secure_url
      );

    // =====================================
    // Complete Gallery
    //
    // images[0] = main image
    // images[1-4] = angles
    // =====================================

    const productImages = [
      thumbnail,
      ...additionalImages,
    ].slice(0, 5);

    // =====================================
    // Product Highlights
    // =====================================

    const parsedHighlights =
      cleanHighlights(
        highlights
      );

    // =====================================
    // Product Attributes
    // =====================================

    const parsedAttributes =
      parseJSON(
        attributes,
        {}
      );

    // =====================================
    // Create Product
    // =====================================

    const product =
      await Product.create({
        title,
        slug,
        description,
        brand,

        category,
        menuGroup,
        subCategory,

        price:
          parseNumber(price),

        oldPrice:
          parseNumber(
            oldPrice
          ),

        discount:
          parseNumber(
            discount
          ),

        stock:
          parseNumber(stock),

        sku: sku || "",

        // Images

        thumbnail,

        images:
          productImages,

        // Variants

        sizes:
          parseArray(sizes),

        colors:
          parseArray(colors),

        // Dynamic attributes

        attributes:
          parsedAttributes,

        // Highlights

        highlights:
          parsedHighlights,

        // Legacy fields

        fabric:
          fabric || "",

        pattern:
          pattern || "",

        occasion:
          occasion || "",

        country:
          country ||
          "India",

        // Homepage flags

        isFeatured:
          parseBoolean(
            isFeatured
          ),

        isTrending:
          parseBoolean(
            isTrending
          ),

        isNewArrival:
          parseBoolean(
            isNewArrival
          ),

        isBestSelling:
          parseBoolean(
            isBestSelling
          ),

        status:
          status ||
          "active",
      });

    const populatedProduct =
      await Product.findById(
        product._id
      )
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        )
        .populate(
          "subCategory",
          "name slug"
        );

    res.status(201).json({
      success: true,
      message:
        "Product added successfully.",
      product:
        populatedProduct,
    });
  } catch (error) {
    console.error(
      "Create Product Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Update Product
// =======================================

export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Product not found",
        });
    }

    // =====================================
    // Files
    // =====================================

    const thumbnailFile =
      req.files?.thumbnail?.[0];

    const additionalFiles =
      req.files?.images || [];

    // =====================================
    // New Main Image
    // =====================================

    if (thumbnailFile) {
      const result =
        await uploadToCloudinary(
          thumbnailFile
        );

      product.thumbnail =
        result.secure_url;
    }

    // =====================================
    // New Additional Images
    // =====================================

    if (
      additionalFiles.length >
      0
    ) {
      const results =
        await Promise.all(
          additionalFiles.map(
            (file) =>
              uploadToCloudinary(
                file
              )
          )
        );

      const newImages =
        results.map(
          (result) =>
            result.secure_url
        );

      product.images = [
        product.thumbnail,
        ...newImages,
      ].slice(0, 5);
    } else if (
      thumbnailFile
    ) {
      // Main image changed but
      // additional images weren't sent.
      // Keep old angle images.

      const oldAdditional =
        (
          product.images || []
        ).filter(
          (image) =>
            image !==
            product.thumbnail
        );

      product.images = [
        product.thumbnail,
        ...oldAdditional,
      ].slice(0, 5);
    }

    // Ensure main image is first

    if (
      product.thumbnail
    ) {
      product.images = [
        product.thumbnail,
        ...(
          product.images || []
        ).filter(
          (image) =>
            image !==
            product.thumbnail
        ),
      ].slice(0, 5);
    }

    // =====================================
    // Basic Details
    // =====================================

    if (
      req.body.title !==
      undefined
    ) {
      product.title =
        req.body.title;

      product.slug =
        createSlug(
          req.body.title
        );
    }

    if (
      req.body.description !==
      undefined
    ) {
      product.description =
        req.body.description;
    }

    if (
      req.body.brand !==
      undefined
    ) {
      product.brand =
        req.body.brand;
    }

    if (
      req.body.category !==
      undefined
    ) {
      product.category =
        req.body.category;
    }

    if (
      req.body.menuGroup !==
      undefined
    ) {
      product.menuGroup =
        req.body.menuGroup;
    }

    if (
      req.body.subCategory !==
      undefined
    ) {
      product.subCategory =
        req.body.subCategory;
    }

    // =====================================
    // Numbers
    // =====================================

    if (
      req.body.price !==
      undefined
    ) {
      product.price =
        parseNumber(
          req.body.price,
          product.price
        );
    }

    if (
      req.body.oldPrice !==
      undefined
    ) {
      product.oldPrice =
        parseNumber(
          req.body.oldPrice
        );
    }

    if (
      req.body.discount !==
      undefined
    ) {
      product.discount =
        parseNumber(
          req.body.discount
        );
    }

    if (
      req.body.stock !==
      undefined
    ) {
      product.stock =
        parseNumber(
          req.body.stock
        );
    }

    // =====================================
    // SKU / Legacy Fields
    // =====================================

    if (
      req.body.sku !==
      undefined
    ) {
      product.sku =
        req.body.sku;
    }

    if (
      req.body.fabric !==
      undefined
    ) {
      product.fabric =
        req.body.fabric;
    }

    if (
      req.body.pattern !==
      undefined
    ) {
      product.pattern =
        req.body.pattern;
    }

    if (
      req.body.occasion !==
      undefined
    ) {
      product.occasion =
        req.body.occasion;
    }

    if (
      req.body.country !==
      undefined
    ) {
      product.country =
        req.body.country;
    }

    if (
      req.body.status !==
      undefined
    ) {
      product.status =
        req.body.status;
    }

    // =====================================
    // Sizes
    // =====================================

    if (
      req.body.sizes !==
      undefined
    ) {
      product.sizes =
        parseArray(
          req.body.sizes
        );
    }

    // =====================================
    // Colors
    // =====================================

    if (
      req.body.colors !==
      undefined
    ) {
      product.colors =
        parseArray(
          req.body.colors
        );
    }

    // =====================================
    // Dynamic Attributes
    // =====================================

    if (
      req.body.attributes !==
      undefined
    ) {
      product.attributes =
        parseJSON(
          req.body.attributes,
          {}
        );
    }

    // =====================================
    // Highlights
    // =====================================

    if (
      req.body.highlights !==
      undefined
    ) {
      product.highlights =
        cleanHighlights(
          req.body.highlights
        );
    }

    // =====================================
    // Boolean Fields
    // =====================================

    if (
      req.body.isFeatured !==
      undefined
    ) {
      product.isFeatured =
        parseBoolean(
          req.body.isFeatured
        );
    }

    if (
      req.body.isTrending !==
      undefined
    ) {
      product.isTrending =
        parseBoolean(
          req.body.isTrending
        );
    }

    if (
      req.body.isNewArrival !==
      undefined
    ) {
      product.isNewArrival =
        parseBoolean(
          req.body.isNewArrival
        );
    }

    if (
      req.body.isBestSelling !==
      undefined
    ) {
      product.isBestSelling =
        parseBoolean(
          req.body.isBestSelling
        );
    }

    // =====================================
    // Save
    // =====================================

    await product.save();

    const updatedProduct =
      await Product.findById(
        product._id
      )
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "menuGroup",
          "name slug"
        )
        .populate(
          "subCategory",
          "name slug"
        );

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully.",
      product:
        updatedProduct,
    });
  } catch (error) {
    console.error(
      "Update Product Error:",
      error
    );

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
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Product not found",
        });
    }

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Product Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Dynamic Product Filters
// =======================================

export const getProductFilters = async (
  req,
  res
) => {
  try {
    const {
      category,
      menuGroup,
      subCategory,
      brand,
    } = req.query;

    const query = {};
    const filterScope = {};

    // =====================================
    // SubCategory Slug → ObjectId
    // =====================================

    if (subCategory) {
      const subCategoryDoc =
        await SubCategory.findOne({
          slug: subCategory,
        }).select("_id");

      if (!subCategoryDoc) {
        return res
          .status(200)
          .json({
            success: true,
            filters: [],
          });
      }

      query.subCategory =
        subCategoryDoc._id;

      filterScope.subCategory =
        subCategoryDoc._id;
    }

    // =====================================
    // Category Slug → ObjectId
    // =====================================

    if (category) {
      const categoryDoc =
        await Category.findOne({
          slug: category,
        }).select("_id");

      if (!categoryDoc) {
        return res
          .status(200)
          .json({
            success: true,
            filters: [],
          });
      }

      query.category =
        categoryDoc._id;

      if (!subCategory) {
        filterScope.category =
          categoryDoc._id;
      }
    }

    // =====================================
    // No Scope
    // =====================================

    if (
      !subCategory &&
      !category
    ) {
      return res
        .status(200)
        .json({
          success: true,
          filters: [],
        });
    }

    // =====================================
    // MenuGroup
    // =====================================

    if (menuGroup) {
      const menuGroupDoc =
        await MenuGroup.findOne({
          slug: menuGroup,
        }).select("_id");

      if (menuGroupDoc) {
        query.menuGroup =
          menuGroupDoc._id;
      }
    }

    // =====================================
    // Brand
    // =====================================

    if (brand) {
      query.brand = {
        $regex: `^${brand}$`,
        $options: "i",
      };
    }

    // =====================================
    // Defined Filters
    // =====================================

    const definedFilters =
      await Filter.find({
        ...filterScope,
        isActive: true,
      }).sort({
        sortOrder: 1,
      });

    if (
      !definedFilters.length
    ) {
      return res
        .status(200)
        .json({
          success: true,
          filters: [],
        });
    }

    const attributeKeys =
      definedFilters.map(
        (filter) =>
          filter.key
      );

    // =====================================
    // Products
    // =====================================

    const products =
      await Product.find(
        query
      )
        .select("attributes")
        .lean();

    const valueSets = {};

    attributeKeys.forEach(
      (key) => {
        valueSets[key] =
          new Set();
      }
    );

    products.forEach(
      (product) => {
        const attrs =
          product.attributes ||
          {};

        attributeKeys.forEach(
          (key) => {
            const value =
              attrs[key];

            if (
              value ===
                undefined ||
              value === null ||
              value === ""
            ) {
              return;
            }

            if (
              Array.isArray(
                value
              )
            ) {
              value.forEach(
                (item) =>
                  valueSets[
                    key
                  ].add(
                    String(
                      item
                    )
                  )
              );
            } else {
              valueSets[
                key
              ].add(
                String(value)
              );
            }
          }
        );
      }
    );

    // =====================================
    // Response
    // =====================================

    const response =
      definedFilters
        .filter(
          (filter) =>
            filter.type ===
              "range" ||
            valueSets[
              filter.key
            ].size > 0
        )
        .map(
          (filter) => {
            if (
              filter.type ===
              "range"
            ) {
              return {
                key:
                  filter.key,

                title:
                  filter.title,

                type:
                  filter.type,

                min:
                  filter.min,

                max:
                  filter.max,

                step:
                  filter.step,
              };
            }

            return {
              key:
                filter.key,

              title:
                filter.title,

              type:
                filter.type,

              sortOrder:
                filter.sortOrder,

              options: [
                ...valueSets[
                  filter.key
                ],
              ]
                .sort(
                  (a, b) =>
                    a.localeCompare(
                      b
                    )
                )
                .map(
                  (value) => ({
                    label:
                      value,
                    value,
                  })
                ),
            };
          }
        );

    return res
      .status(200)
      .json({
        success: true,
        filters: response,
      });
  } catch (error) {
    console.error(
      "Get Product Filters Error:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          error.message,
      });
  }
};