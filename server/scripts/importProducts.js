import fs from "fs";
import path from "path";
import csv from "csv-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const csvFile = path.resolve("amazon.csv");

const products = [];

const slugify = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};

const extractBrand = (title = "") => {
  const words = title.split(" ");

  if (words.length === 0) return "Unknown";

  return words[0];
};

const parsePrice = (price = "") => {
  if (!price) return 0;

  return Number(
    price
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .trim()
  );
};

const randomStock = () => Math.floor(Math.random() * 90) + 10;

const randomSold = () => Math.floor(Math.random() * 500);

const randomFeatured = () => Math.random() > 0.9;

const randomTrending = () => Math.random() > 0.8;

fs.createReadStream(csvFile)
  .pipe(csv())
  .on("data", (row) => {
    const title = row.product_name?.trim();

    if (!title) return;

    const slug = slugify(title + "-" + row.product_id);

    const price = parsePrice(row.discounted_price);

    const oldPrice = parsePrice(row.actual_price);

    const discount = Number(
      String(row.discount_percentage)
        .replace("%", "")
        .trim()
    );

    const rating = Number(row.rating) || 0;

    const totalReviews = Number(
      String(row.rating_count).replace(/,/g, "")
    ) || 0;

    const category =
      row.category?.split("|")[0]?.trim() || "General";

    const image = row.img_link || "";

    const product = {
      title,

      slug,

      description: row.about_product || "",

      brand: extractBrand(title),

      category,

      price,

      oldPrice,

      discount,

      stock: randomStock(),

      sku: "SKU-" + row.product_id,

      thumbnail: image,

      images: image ? [image] : [],

      sizes: [],

      colors: [],

      rating,

      totalReviews,

      sold: randomSold(),

      fabric: "",

      pattern: "",

      occasion: "",

      country: "India",

      isFeatured: randomFeatured(),

      isTrending: randomTrending(),

      status: "active",
    };

    products.push(product);
  })
  .on("end", async () => {
    try {
      await connectDB();

      console.log(
        `CSV Loaded : ${products.length} Products`
      );

      await Product.deleteMany();

      await Product.insertMany(products);

      console.log(
        "====================================="
      );

      console.log(
        `✅ ${products.length} Products Imported`
      );

      console.log(
        "====================================="
      );

      await mongoose.connection.close();

      process.exit();
    } catch (err) {
      console.error(err);

      process.exit(1);
    }
  });