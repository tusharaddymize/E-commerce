import dotenv from "dotenv";
import connectDB from "./config/db.js";

import Category from "./models/Category.js";
import MenuGroup from "./models/MenuGroup.js";

dotenv.config();

const seedMenuGroups = async () => {
  try {
    await connectDB();

    await MenuGroup.deleteMany({});

    const categories = await Category.find();

    const getCategory = (name) =>
      categories.find((c) => c.name === name);

    const menuGroups = [
      // ================= Electronics =================

      { category: getCategory("Electronics")._id, name: "Mobiles", slug: "mobiles", sortOrder: 1 },
      { category: getCategory("Electronics")._id, name: "Laptops", slug: "laptops", sortOrder: 2 },
      { category: getCategory("Electronics")._id, name: "TVs & Appliances", slug: "tvs-appliances", sortOrder: 3 },
      { category: getCategory("Electronics")._id, name: "Audio", slug: "audio", sortOrder: 4 },
      { category: getCategory("Electronics")._id, name: "Cameras", slug: "cameras", sortOrder: 5 },
      { category: getCategory("Electronics")._id, name: "Gaming", slug: "gaming", sortOrder: 6 },
      { category: getCategory("Electronics")._id, name: "Accessories", slug: "accessories", sortOrder: 7 },

      // ================= Fashion =================

      { category: getCategory("Fashion")._id, name: "Men", slug: "men", sortOrder: 1 },
      { category: getCategory("Fashion")._id, name: "Women", slug: "women", sortOrder: 2 },
      { category: getCategory("Fashion")._id, name: "Kids", slug: "kids", sortOrder: 3 },
      { category: getCategory("Fashion")._id, name: "Footwear", slug: "footwear", sortOrder: 4 },
      { category: getCategory("Fashion")._id, name: "Watches", slug: "watches", sortOrder: 5 },
      { category: getCategory("Fashion")._id, name: "Bags", slug: "bags", sortOrder: 6 },
      { category: getCategory("Fashion")._id, name: "Jewellery", slug: "jewellery", sortOrder: 7 },

      // ================= Home =================

      { category: getCategory("Home & Living")._id, name: "Furniture", slug: "furniture", sortOrder: 1 },
      { category: getCategory("Home & Living")._id, name: "Kitchen", slug: "kitchen", sortOrder: 2 },
      { category: getCategory("Home & Living")._id, name: "Home Decor", slug: "home-decor", sortOrder: 3 },
      { category: getCategory("Home & Living")._id, name: "Lighting", slug: "lighting", sortOrder: 4 },
      { category: getCategory("Home & Living")._id, name: "Bedding", slug: "bedding", sortOrder: 5 },

      // ================= Beauty =================

      { category: getCategory("Beauty")._id, name: "Makeup", slug: "makeup", sortOrder: 1 },
      { category: getCategory("Beauty")._id, name: "Skincare", slug: "skincare", sortOrder: 2 },
      { category: getCategory("Beauty")._id, name: "Hair Care", slug: "hair-care", sortOrder: 3 },
      { category: getCategory("Beauty")._id, name: "Perfume", slug: "perfume", sortOrder: 4 },

      // ================= Books =================

      { category: getCategory("Books")._id, name: "Fiction", slug: "fiction", sortOrder: 1 },
      { category: getCategory("Books")._id, name: "Non Fiction", slug: "non-fiction", sortOrder: 2 },
      { category: getCategory("Books")._id, name: "Academic", slug: "academic", sortOrder: 3 },
      { category: getCategory("Books")._id, name: "Comics", slug: "comics", sortOrder: 4 },

      // ================= More =================

      { category: getCategory("More")._id, name: "Sports", slug: "sports", sortOrder: 1 },
      { category: getCategory("More")._id, name: "Grocery", slug: "grocery", sortOrder: 2 },
      { category: getCategory("More")._id, name: "Toys", slug: "toys", sortOrder: 3 },
      { category: getCategory("More")._id, name: "Automotive", slug: "automotive", sortOrder: 4 },
      { category: getCategory("More")._id, name: "Health", slug: "health", sortOrder: 5 },
    ];

    await MenuGroup.insertMany(menuGroups);

    console.log("✅ Menu Groups Seeded Successfully");

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedMenuGroups();