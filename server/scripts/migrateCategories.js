import "dotenv/config";
import mongoose from "mongoose";
import slugify from "slugify";

import connectDB from "../config/db.js";

import Product from "../models/Product.js";
import Category from "../models/Category.js";
import MenuGroup from "../models/MenuGroup.js";
import SubCategory from "../models/SubCategory.js";

/* ===========================================================
   CONNECT DATABASE
=========================================================== */

await connectDB();

console.log("\n🚀 Starting Category Migration...\n");

/* ===========================================================
   GET ALL PRODUCTS
=========================================================== */

const products = await Product.find({}).lean();

console.log(`📦 Total Products : ${products.length}`);

if (!products.length) {
  console.log("❌ No products found.");
  process.exit(0);
}

/* ===========================================================
   CREATE CATEGORY MAP
=========================================================== */

const categoryMap = new Map();

const uniqueCategories = [
  ...new Set(
    products
      .map((p) => p.category)
      .filter(Boolean)
      .map(String)
  ),
];

console.log(
  `📂 Found ${uniqueCategories.length} unique categories\n`
);

/* ===========================================================
   CREATE CATEGORIES
=========================================================== */

for (const categoryName of uniqueCategories) {
  const slug = slugify(categoryName, {
    lower: true,
    strict: true,
    trim: true,
  });

  let category = await Category.findOne({
    slug,
  });

  if (!category) {
    category = await Category.create({
      name: categoryName,
      slug,

      description: "",

      icon: "",

      image: "",

      sortOrder: 0,

      isActive: true,
    });

    console.log(
      `✅ Category Created : ${category.name}`
    );
  } else {
    console.log(
      `⚡ Category Exists : ${category.name}`
    );
  }

  categoryMap.set(categoryName, category);
}

/* ===========================================================
   CATEGORY SUMMARY
=========================================================== */

console.log("\n==============================");

console.log(
  `✅ Categories Ready : ${categoryMap.size}`
);

console.log("==============================\n");

/* ===========================================================
   PART B STARTS BELOW
=========================================================== */
/* ===========================================================
   CREATE DEFAULT MENU GROUPS
=========================================================== */

const menuGroupMap = new Map();

for (const [categoryName, category] of categoryMap.entries()) {
  const slug = "general";

  let menuGroup = await MenuGroup.findOne({
    category: category._id,
    slug,
  });

  if (!menuGroup) {
    menuGroup = await MenuGroup.create({
      category: category._id,

      name: "General",

      slug,

      description:
        "Default Menu Group",

      sortOrder: 0,

      isActive: true,
    });

    console.log(
      `✅ MenuGroup Created : ${category.name} -> General`
    );
  } else {
    console.log(
      `⚡ MenuGroup Exists : ${category.name} -> General`
    );
  }

  menuGroupMap.set(categoryName, menuGroup);
}

/* ===========================================================
   MENU GROUP SUMMARY
=========================================================== */

console.log("\n==============================");

console.log(
  `✅ MenuGroups Ready : ${menuGroupMap.size}`
);

console.log("==============================\n");

/* ===========================================================
   CREATE DEFAULT SUB CATEGORIES
=========================================================== */

const subCategoryMap = new Map();

for (const [categoryName, category] of categoryMap.entries()) {
  const menuGroup =
    menuGroupMap.get(categoryName);

  const slug = `${category.slug}-general`;

  let subCategory =
    await SubCategory.findOne({
      slug,
    });

  if (!subCategory) {
    subCategory =
      await SubCategory.create({
        category: category._id,

        menuGroup: menuGroup._id,

        name: "General",

        slug,

        description:
          "Default Sub Category",

        image: "",

        banner: "",

        sortOrder: 0,

        isFeatured: false,

        isActive: true,
      });

    console.log(
      `✅ SubCategory Created : ${category.name} -> General`
    );
  } else {
    console.log(
      `⚡ SubCategory Exists : ${category.name} -> General`
    );
  }

  subCategoryMap.set(
    categoryName,
    subCategory
  );
}

/* ===========================================================
   SUB CATEGORY SUMMARY
=========================================================== */

console.log("\n==============================");

console.log(
  `✅ SubCategories Ready : ${subCategoryMap.size}`
);

console.log("==============================\n");

/* ===========================================================
   PREPARE FOR PRODUCT MIGRATION
=========================================================== */

let updatedProducts = 0;

let skippedProducts = 0;

console.log(
  "\n🚀 Starting Product Migration...\n"
);

/* ===========================================================
   PART C STARTS BELOW
=========================================================== */
/* ===========================================================
   MIGRATE PRODUCTS
=========================================================== */

for (const product of products) {
  try {
    const oldCategory = String(product.category || "").trim();

    if (!oldCategory) {
      skippedProducts++;

      console.log(
        `⚠ Skipped : ${product.title} (No Category)`
      );

      continue;
    }

    const category = categoryMap.get(oldCategory);

    const menuGroup =
      menuGroupMap.get(oldCategory);

    const subCategory =
      subCategoryMap.get(oldCategory);

    if (
      !category ||
      !menuGroup ||
      !subCategory
    ) {
      skippedProducts++;

      console.log(
        `⚠ Mapping Missing : ${product.title}`
      );

      continue;
    }

    await Product.updateOne(
      {
        _id: product._id,
      },
      {
        $set: {
          category: category._id,

          menuGroup:
            menuGroup._id,

          subCategory:
            subCategory._id,
        },
      }
    );

    updatedProducts++;

    console.log(
      `✅ Updated : ${product.title}`
    );
  } catch (error) {
    skippedProducts++;

    console.error(
      `❌ Error : ${product.title}`
    );

    console.error(error.message);
  }
}

/* ===========================================================
   FINAL SUMMARY
=========================================================== */

console.log("\n");

console.log(
  "========================================"
);

console.log("🎉 CATEGORY MIGRATION COMPLETED");

console.log(
  "========================================"
);

console.log(
  `📦 Products          : ${products.length}`
);

console.log(
  `📂 Categories        : ${categoryMap.size}`
);

console.log(
  `📁 Menu Groups       : ${menuGroupMap.size}`
);

console.log(
  `📄 Sub Categories    : ${subCategoryMap.size}`
);

console.log(
  `✅ Products Updated  : ${updatedProducts}`
);

console.log(
  `⚠ Products Skipped  : ${skippedProducts}`
);

console.log(
  "========================================\n"
);

/* ===========================================================
   VERIFY DATABASE
=========================================================== */

const totalCategories =
  await Category.countDocuments();

const totalMenuGroups =
  await MenuGroup.countDocuments();

const totalSubCategories =
  await SubCategory.countDocuments();

console.log(
  `Categories     : ${totalCategories}`
);

console.log(
  `MenuGroups     : ${totalMenuGroups}`
);

console.log(
  `SubCategories  : ${totalSubCategories}`
);

/* ===========================================================
   CLOSE DATABASE
=========================================================== */

await mongoose.disconnect();

console.log(
  "\n🔌 MongoDB Disconnected"
);

console.log(
  "✅ Migration Finished Successfully\n"
);

process.exit(0);