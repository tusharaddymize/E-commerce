import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Category from "./models/Category.js";

dotenv.config();

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    sortOrder: 1,
  },
  {
    name: "Fashion",
    slug: "fashion",
    sortOrder: 2,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    sortOrder: 3,
  },
  {
    name: "Beauty",
    slug: "beauty",
    sortOrder: 4,
  },
  {
    name: "Books",
    slug: "books",
    sortOrder: 5,
  },
  {
    name: "More",
    slug: "more",
    sortOrder: 6,
  },
];

const seedCategories = async () => {
  try {
    await connectDB();

    await Category.deleteMany({});

    await Category.insertMany(categories);

    console.log("✅ Categories seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedCategories();