import dotenv from "dotenv";
import connectDB from "./config/db.js";

import Category from "./models/Category.js";
import MenuGroup from "./models/MenuGroup.js";
import SubCategory from "./models/SubCategory.js";

dotenv.config();


const seedSubCategories = async () => {
  try {
    await connectDB();

    await SubCategory.deleteMany({});

    const categories = await Category.find();
    const menuGroups = await MenuGroup.find();

    const getCategory = (name) =>
      categories.find((c) => c.name === name);

    const getMenuGroup = (name) =>
      menuGroups.find((m) => m.name === name);

    const subCategories = [


// ======================================================
// Electronics
// ======================================================

// Mobiles
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Android Phones",
  slug: "android-phones",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "iPhones",
  slug: "iphones",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Feature Phones",
  slug: "feature-phones",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Foldable Phones",
  slug: "foldable-phones",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Refurbished Phones",
  slug: "refurbished-phones",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Phone Cases",
  slug: "phone-cases",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Screen Protectors",
  slug: "screen-protectors",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Chargers",
  slug: "chargers",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Power Banks",
  slug: "power-banks",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Smart Watches",
  slug: "smart-watches",
},
{
  menuGroup: getMenuGroup("Mobiles")._id,
  category: getCategory("Electronics")._id,
  name: "Earbuds",
  slug: "earbuds",
},

// Laptops
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "Gaming Laptops",
  slug: "gaming-laptops",
},
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "Business Laptops",
  slug: "business-laptops",
},
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "Student Laptops",
  slug: "student-laptops",
},
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "2-in-1 Laptops",
  slug: "2-in-1-laptops",
},
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "MacBooks",
  slug: "macbooks",
},
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "Laptop Bags",
  slug: "laptop-bags",
},
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "Laptop SSD",
  slug: "laptop-ssd",
},
{
  menuGroup: getMenuGroup("Laptops")._id,
  category: getCategory("Electronics")._id,
  name: "Laptop RAM",
  slug: "laptop-ram",
},

// TVs & Appliances
{
  menuGroup: getMenuGroup("TVs & Appliances")._id,
  category: getCategory("Electronics")._id,
  name: "Smart TVs",
  slug: "smart-tvs",
},
{
  menuGroup: getMenuGroup("TVs & Appliances")._id,
  category: getCategory("Electronics")._id,
  name: "LED TVs",
  slug: "led-tvs",
},
{
  menuGroup: getMenuGroup("TVs & Appliances")._id,
  category: getCategory("Electronics")._id,
  name: "Air Conditioners",
  slug: "air-conditioners",
},
{
  menuGroup: getMenuGroup("TVs & Appliances")._id,
  category: getCategory("Electronics")._id,
  name: "Refrigerators",
  slug: "refrigerators",
},
{
  menuGroup: getMenuGroup("TVs & Appliances")._id,
  category: getCategory("Electronics")._id,
  name: "Washing Machines",
  slug: "washing-machines",
},
{
  menuGroup: getMenuGroup("TVs & Appliances")._id,
  category: getCategory("Electronics")._id,
  name: "Microwave Ovens",
  slug: "microwave-ovens",
},
{
  menuGroup: getMenuGroup("TVs & Appliances")._id,
  category: getCategory("Electronics")._id,
  name: "Water Purifiers",
  slug: "water-purifiers",
},

// Audio
{
  menuGroup: getMenuGroup("Audio")._id,
  category: getCategory("Electronics")._id,
  name: "Bluetooth Speakers",
  slug: "bluetooth-speakers",
},
{
  menuGroup: getMenuGroup("Audio")._id,
  category: getCategory("Electronics")._id,
  name: "Headphones",
  slug: "headphones",
},
{
  menuGroup: getMenuGroup("Audio")._id,
  category: getCategory("Electronics")._id,
  name: "Earphones",
  slug: "earphones",
},
{
  menuGroup: getMenuGroup("Audio")._id,
  category: getCategory("Electronics")._id,
  name: "Soundbars",
  slug: "soundbars",
},
{
  menuGroup: getMenuGroup("Audio")._id,
  category: getCategory("Electronics")._id,
  name: "Home Theatre",
  slug: "home-theatre",
},

// Cameras
{
  menuGroup: getMenuGroup("Cameras")._id,
  category: getCategory("Electronics")._id,
  name: "DSLR",
  slug: "dslr",
},
{
  menuGroup: getMenuGroup("Cameras")._id,
  category: getCategory("Electronics")._id,
  name: "Mirrorless Cameras",
  slug: "mirrorless-cameras",
},
{
  menuGroup: getMenuGroup("Cameras")._id,
  category: getCategory("Electronics")._id,
  name: "Action Cameras",
  slug: "action-cameras",
},
{
  menuGroup: getMenuGroup("Cameras")._id,
  category: getCategory("Electronics")._id,
  name: "Camera Lenses",
  slug: "camera-lenses",
},
{
  menuGroup: getMenuGroup("Cameras")._id,
  category: getCategory("Electronics")._id,
  name: "Tripods",
  slug: "tripods",
},

// Gaming
{
  menuGroup: getMenuGroup("Gaming")._id,
  category: getCategory("Electronics")._id,
  name: "Gaming Consoles",
  slug: "gaming-consoles",
},
{
  menuGroup: getMenuGroup("Gaming")._id,
  category: getCategory("Electronics")._id,
  name: "Gaming PCs",
  slug: "gaming-pcs",
},
{
  menuGroup: getMenuGroup("Gaming")._id,
  category: getCategory("Electronics")._id,
  name: "Gaming Mouse",
  slug: "gaming-mouse",
},
{
  menuGroup: getMenuGroup("Gaming")._id,
  category: getCategory("Electronics")._id,
  name: "Gaming Keyboard",
  slug: "gaming-keyboard",
},
{
  menuGroup: getMenuGroup("Gaming")._id,
  category: getCategory("Electronics")._id,
  name: "Gaming Chair",
  slug: "gaming-chair",
},

// ======================================================
// Fashion
// ======================================================

// Men
{
  menuGroup: getMenuGroup("Men")._id,
  category: getCategory("Fashion")._id,
  name: "T-Shirts",
  slug: "t-shirts",
},
{
  menuGroup: getMenuGroup("Men")._id,
  category: getCategory("Fashion")._id,
  name: "Shirts",
  slug: "shirts",
},
{
  menuGroup: getMenuGroup("Men")._id,
  category: getCategory("Fashion")._id,
  name: "Jeans",
  slug: "jeans",
},
{
  menuGroup: getMenuGroup("Men")._id,
  category: getCategory("Fashion")._id,
  name: "Trousers",
  slug: "trousers",
},
{
  menuGroup: getMenuGroup("Men")._id,
  category: getCategory("Fashion")._id,
  name: "Jackets",
  slug: "jackets",
},
{
  menuGroup: getMenuGroup("Men")._id,
  category: getCategory("Fashion")._id,
  name: "Hoodies",
  slug: "hoodies",
},
{
  menuGroup: getMenuGroup("Men")._id,
  category: getCategory("Fashion")._id,
  name: "Ethnic Wear",
  slug: "ethnic-wear",
},

// ======================================================
// Fashion
// ======================================================

// Women
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Sarees",
  slug: "sarees",
},
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Kurtis",
  slug: "kurtis",
},
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Dresses",
  slug: "dresses",
},
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Tops",
  slug: "tops",
},
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Jeans",
  slug: "women-jeans",
},
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Leggings",
  slug: "leggings",
},
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Handbags",
  slug: "handbags",
},
{
  menuGroup: getMenuGroup("Women")._id,
  category: getCategory("Fashion")._id,
  name: "Heels",
  slug: "heels",
},

// Kids
{
  menuGroup: getMenuGroup("Kids")._id,
  category: getCategory("Fashion")._id,
  name: "Boys Clothing",
  slug: "boys-clothing",
},
{
  menuGroup: getMenuGroup("Kids")._id,
  category: getCategory("Fashion")._id,
  name: "Girls Clothing",
  slug: "girls-clothing",
},
{
  menuGroup: getMenuGroup("Kids")._id,
  category: getCategory("Fashion")._id,
  name: "Baby Wear",
  slug: "baby-wear",
},
{
  menuGroup: getMenuGroup("Kids")._id,
  category: getCategory("Fashion")._id,
  name: "School Uniform",
  slug: "school-uniform",
},
{
  menuGroup: getMenuGroup("Kids")._id,
  category: getCategory("Fashion")._id,
  name: "Kids Shoes",
  slug: "kids-shoes",
},

// Footwear
{
  menuGroup: getMenuGroup("Footwear")._id,
  category: getCategory("Fashion")._id,
  name: "Casual Shoes",
  slug: "casual-shoes",
},
{
  menuGroup: getMenuGroup("Footwear")._id,
  category: getCategory("Fashion")._id,
  name: "Sports Shoes",
  slug: "sports-shoes",
},
{
  menuGroup: getMenuGroup("Footwear")._id,
  category: getCategory("Fashion")._id,
  name: "Formal Shoes",
  slug: "formal-shoes",
},
{
  menuGroup: getMenuGroup("Footwear")._id,
  category: getCategory("Fashion")._id,
  name: "Sandals",
  slug: "sandals",
},
{
  menuGroup: getMenuGroup("Footwear")._id,
  category: getCategory("Fashion")._id,
  name: "Slippers",
  slug: "slippers",
},
{
  menuGroup: getMenuGroup("Footwear")._id,
  category: getCategory("Fashion")._id,
  name: "Boots",
  slug: "boots",
},

// Watches
{
  menuGroup: getMenuGroup("Watches")._id,
  category: getCategory("Fashion")._id,
  name: "Smart Watches",
  slug: "fashion-smart-watches",
},
{
  menuGroup: getMenuGroup("Watches")._id,
  category: getCategory("Fashion")._id,
  name: "Analog Watches",
  slug: "analog-watches",
},
{
  menuGroup: getMenuGroup("Watches")._id,
  category: getCategory("Fashion")._id,
  name: "Digital Watches",
  slug: "digital-watches",
},
{
  menuGroup: getMenuGroup("Watches")._id,
  category: getCategory("Fashion")._id,
  name: "Luxury Watches",
  slug: "luxury-watches",
},

// Bags
{
  menuGroup: getMenuGroup("Bags")._id,
  category: getCategory("Fashion")._id,
  name: "Backpacks",
  slug: "backpacks",
},
{
  menuGroup: getMenuGroup("Bags")._id,
  category: getCategory("Fashion")._id,
  name: "Travel Bags",
  slug: "travel-bags",
},
{
  menuGroup: getMenuGroup("Bags")._id,
  category: getCategory("Fashion")._id,
  name: "Laptop Bags",
  slug: "fashion-laptop-bags",
},
{
  menuGroup: getMenuGroup("Bags")._id,
  category: getCategory("Fashion")._id,
  name: "Duffel Bags",
  slug: "duffel-bags",
},
{
  menuGroup: getMenuGroup("Bags")._id,
  category: getCategory("Fashion")._id,
  name: "Wallets",
  slug: "wallets",
},

// Jewellery
{
  menuGroup: getMenuGroup("Jewellery")._id,
  category: getCategory("Fashion")._id,
  name: "Necklaces",
  slug: "necklaces",
},
{
  menuGroup: getMenuGroup("Jewellery")._id,
  category: getCategory("Fashion")._id,
  name: "Earrings",
  slug: "earrings",
},
{
  menuGroup: getMenuGroup("Jewellery")._id,
  category: getCategory("Fashion")._id,
  name: "Rings",
  slug: "rings",
},
{
  menuGroup: getMenuGroup("Jewellery")._id,
  category: getCategory("Fashion")._id,
  name: "Bracelets",
  slug: "bracelets",
},
{
  menuGroup: getMenuGroup("Jewellery")._id,
  category: getCategory("Fashion")._id,
  name: "Anklets",
  slug: "anklets",
},

// ======================================================
// Home & Living
// ======================================================

// Furniture
{
  menuGroup: getMenuGroup("Furniture")._id,
  category: getCategory("Home & Living")._id,
  name: "Sofas",
  slug: "sofas",
},
{
  menuGroup: getMenuGroup("Furniture")._id,
  category: getCategory("Home & Living")._id,
  name: "Beds",
  slug: "beds",
},
{
  menuGroup: getMenuGroup("Furniture")._id,
  category: getCategory("Home & Living")._id,
  name: "Dining Tables",
  slug: "dining-tables",
},
{
  menuGroup: getMenuGroup("Furniture")._id,
  category: getCategory("Home & Living")._id,
  name: "Office Chairs",
  slug: "office-chairs",
},
{
  menuGroup: getMenuGroup("Furniture")._id,
  category: getCategory("Home & Living")._id,
  name: "Wardrobes",
  slug: "wardrobes",
},
{
  menuGroup: getMenuGroup("Furniture")._id,
  category: getCategory("Home & Living")._id,
  name: "TV Units",
  slug: "tv-units",
},

// Kitchen
{
  menuGroup: getMenuGroup("Kitchen")._id,
  category: getCategory("Home & Living")._id,
  name: "Cookware",
  slug: "cookware",
},
{
  menuGroup: getMenuGroup("Kitchen")._id,
  category: getCategory("Home & Living")._id,
  name: "Pressure Cookers",
  slug: "pressure-cookers",
},
{
  menuGroup: getMenuGroup("Kitchen")._id,
  category: getCategory("Home & Living")._id,
  name: "Mixer Grinders",
  slug: "mixer-grinders",
},
{
  menuGroup: getMenuGroup("Kitchen")._id,
  category: getCategory("Home & Living")._id,
  name: "Gas Stoves",
  slug: "gas-stoves",
},
{
  menuGroup: getMenuGroup("Kitchen")._id,
  category: getCategory("Home & Living")._id,
  name: "Dinner Sets",
  slug: "dinner-sets",
},
{
  menuGroup: getMenuGroup("Kitchen")._id,
  category: getCategory("Home & Living")._id,
  name: "Storage Containers",
  slug: "storage-containers",
},

// Home Decor
{
  menuGroup: getMenuGroup("Home Decor")._id,
  category: getCategory("Home & Living")._id,
  name: "Wall Art",
  slug: "wall-art",
},
{
  menuGroup: getMenuGroup("Home Decor")._id,
  category: getCategory("Home & Living")._id,
  name: "Curtains",
  slug: "curtains",
},
{
  menuGroup: getMenuGroup("Home Decor")._id,
  category: getCategory("Home & Living")._id,
  name: "Carpets",
  slug: "carpets",
},
{
  menuGroup: getMenuGroup("Home Decor")._id,
  category: getCategory("Home & Living")._id,
  name: "Mirrors",
  slug: "mirrors",
},
{
  menuGroup: getMenuGroup("Home Decor")._id,
  category: getCategory("Home & Living")._id,
  name: "Indoor Plants",
  slug: "indoor-plants",
},
{
  menuGroup: getMenuGroup("Home Decor")._id,
  category: getCategory("Home & Living")._id,
  name: "Wall Clocks",
  slug: "wall-clocks",
},

// ======================================================
// Home & Living
// ======================================================

// Bedding
{
  menuGroup: getMenuGroup("Bedding")._id,
  category: getCategory("Home & Living")._id,
  name: "Bedsheets",
  slug: "bedsheets",
},
{
  menuGroup: getMenuGroup("Bedding")._id,
  category: getCategory("Home & Living")._id,
  name: "Blankets",
  slug: "blankets",
},
{
  menuGroup: getMenuGroup("Bedding")._id,
  category: getCategory("Home & Living")._id,
  name: "Comforters",
  slug: "comforters",
},
{
  menuGroup: getMenuGroup("Bedding")._id,
  category: getCategory("Home & Living")._id,
  name: "Pillows",
  slug: "pillows",
},
{
  menuGroup: getMenuGroup("Bedding")._id,
  category: getCategory("Home & Living")._id,
  name: "Mattress Protectors",
  slug: "mattress-protectors",
},

// Lighting
{
  menuGroup: getMenuGroup("Lighting")._id,
  category: getCategory("Home & Living")._id,
  name: "Ceiling Lights",
  slug: "ceiling-lights",
},
{
  menuGroup: getMenuGroup("Lighting")._id,
  category: getCategory("Home & Living")._id,
  name: "Table Lamps",
  slug: "table-lamps",
},
{
  menuGroup: getMenuGroup("Lighting")._id,
  category: getCategory("Home & Living")._id,
  name: "Wall Lights",
  slug: "wall-lights",
},
{
  menuGroup: getMenuGroup("Lighting")._id,
  category: getCategory("Home & Living")._id,
  name: "LED Bulbs",
  slug: "led-bulbs",
},
{
  menuGroup: getMenuGroup("Lighting")._id,
  category: getCategory("Home & Living")._id,
  name: "Outdoor Lights",
  slug: "outdoor-lights",
},

// ======================================================
// Beauty
// ======================================================

// Makeup
{
  menuGroup: getMenuGroup("Makeup")._id,
  category: getCategory("Beauty")._id,
  name: "Lipsticks",
  slug: "lipsticks",
},
{
  menuGroup: getMenuGroup("Makeup")._id,
  category: getCategory("Beauty")._id,
  name: "Foundation",
  slug: "foundation",
},
{
  menuGroup: getMenuGroup("Makeup")._id,
  category: getCategory("Beauty")._id,
  name: "Concealer",
  slug: "concealer",
},
{
  menuGroup: getMenuGroup("Makeup")._id,
  category: getCategory("Beauty")._id,
  name: "Compact Powder",
  slug: "compact-powder",
},
{
  menuGroup: getMenuGroup("Makeup")._id,
  category: getCategory("Beauty")._id,
  name: "Mascara",
  slug: "mascara",
},

// Skincare
{
  menuGroup: getMenuGroup("Skincare")._id,
  category: getCategory("Beauty")._id,
  name: "Face Wash",
  slug: "face-wash",
},
{
  menuGroup: getMenuGroup("Skincare")._id,
  category: getCategory("Beauty")._id,
  name: "Moisturizer",
  slug: "moisturizer",
},
{
  menuGroup: getMenuGroup("Skincare")._id,
  category: getCategory("Beauty")._id,
  name: "Sunscreen",
  slug: "sunscreen",
},
{
  menuGroup: getMenuGroup("Skincare")._id,
  category: getCategory("Beauty")._id,
  name: "Serum",
  slug: "serum",
},
{
  menuGroup: getMenuGroup("Skincare")._id,
  category: getCategory("Beauty")._id,
  name: "Face Mask",
  slug: "face-mask",
},

// Hair Care
{
  menuGroup: getMenuGroup("Hair Care")._id,
  category: getCategory("Beauty")._id,
  name: "Shampoo",
  slug: "shampoo",
},
{
  menuGroup: getMenuGroup("Hair Care")._id,
  category: getCategory("Beauty")._id,
  name: "Conditioner",
  slug: "conditioner",
},
{
  menuGroup: getMenuGroup("Hair Care")._id,
  category: getCategory("Beauty")._id,
  name: "Hair Oil",
  slug: "hair-oil",
},
{
  menuGroup: getMenuGroup("Hair Care")._id,
  category: getCategory("Beauty")._id,
  name: "Hair Serum",
  slug: "hair-serum",
},
{
  menuGroup: getMenuGroup("Hair Care")._id,
  category: getCategory("Beauty")._id,
  name: "Hair Dryer",
  slug: "hair-dryer",
},

// Perfume
{
  menuGroup: getMenuGroup("Perfume")._id,
  category: getCategory("Beauty")._id,
  name: "Men Perfumes",
  slug: "men-perfumes",
},
{
  menuGroup: getMenuGroup("Perfume")._id,
  category: getCategory("Beauty")._id,
  name: "Women Perfumes",
  slug: "women-perfumes",
},
{
  menuGroup: getMenuGroup("Perfume")._id,
  category: getCategory("Beauty")._id,
  name: "Body Mist",
  slug: "body-mist",
},

// ======================================================
// Books
// ======================================================

// Fiction
{
  menuGroup: getMenuGroup("Fiction")._id,
  category: getCategory("Books")._id,
  name: "Novels",
  slug: "novels",
},
{
  menuGroup: getMenuGroup("Fiction")._id,
  category: getCategory("Books")._id,
  name: "Mystery",
  slug: "mystery",
},
{
  menuGroup: getMenuGroup("Fiction")._id,
  category: getCategory("Books")._id,
  name: "Romance",
  slug: "romance",
},
{
  menuGroup: getMenuGroup("Fiction")._id,
  category: getCategory("Books")._id,
  name: "Thriller",
  slug: "thriller",
},

// Non Fiction
{
  menuGroup: getMenuGroup("Non Fiction")._id,
  category: getCategory("Books")._id,
  name: "Biography",
  slug: "biography",
},
{
  menuGroup: getMenuGroup("Non Fiction")._id,
  category: getCategory("Books")._id,
  name: "Self Help",
  slug: "self-help",
},
{
  menuGroup: getMenuGroup("Non Fiction")._id,
  category: getCategory("Books")._id,
  name: "Business",
  slug: "business-books",
},

// Academic
{
  menuGroup: getMenuGroup("Academic")._id,
  category: getCategory("Books")._id,
  name: "Engineering",
  slug: "engineering",
},
{
  menuGroup: getMenuGroup("Academic")._id,
  category: getCategory("Books")._id,
  name: "Medical",
  slug: "medical",
},
{
  menuGroup: getMenuGroup("Academic")._id,
  category: getCategory("Books")._id,
  name: "Competitive Exams",
  slug: "competitive-exams",
},

// Comics
{
  menuGroup: getMenuGroup("Comics")._id,
  category: getCategory("Books")._id,
  name: "Marvel",
  slug: "marvel",
},
{
  menuGroup: getMenuGroup("Comics")._id,
  category: getCategory("Books")._id,
  name: "DC",
  slug: "dc",
},
{
  menuGroup: getMenuGroup("Comics")._id,
  category: getCategory("Books")._id,
  name: "Manga",
  slug: "manga",
},

// ======================================================
// More
// ======================================================

// Sports
{
  menuGroup: getMenuGroup("Sports")._id,
  category: getCategory("More")._id,
  name: "Cricket",
  slug: "cricket",
},
{
  menuGroup: getMenuGroup("Sports")._id,
  category: getCategory("More")._id,
  name: "Football",
  slug: "football",
},
{
  menuGroup: getMenuGroup("Sports")._id,
  category: getCategory("More")._id,
  name: "Badminton",
  slug: "badminton",
},
{
  menuGroup: getMenuGroup("Sports")._id,
  category: getCategory("More")._id,
  name: "Gym Equipment",
  slug: "gym-equipment",
},

// Grocery
{
  menuGroup: getMenuGroup("Grocery")._id,
  category: getCategory("More")._id,
  name: "Rice",
  slug: "rice",
},
{
  menuGroup: getMenuGroup("Grocery")._id,
  category: getCategory("More")._id,
  name: "Flour",
  slug: "flour",
},
{
  menuGroup: getMenuGroup("Grocery")._id,
  category: getCategory("More")._id,
  name: "Spices",
  slug: "spices",
},
{
  menuGroup: getMenuGroup("Grocery")._id,
  category: getCategory("More")._id,
  name: "Pulses",
  slug: "pulses",
},

// Toys
{
  menuGroup: getMenuGroup("Toys")._id,
  category: getCategory("More")._id,
  name: "Remote Cars",
  slug: "remote-cars",
},
{
  menuGroup: getMenuGroup("Toys")._id,
  category: getCategory("More")._id,
  name: "Dolls",
  slug: "dolls",
},
{
  menuGroup: getMenuGroup("Toys")._id,
  category: getCategory("More")._id,
  name: "Board Games",
  slug: "board-games",
},
{
  menuGroup: getMenuGroup("Toys")._id,
  category: getCategory("More")._id,
  name: "Educational Toys",
  slug: "educational-toys",
},

// Automotive
{
  menuGroup: getMenuGroup("Automotive")._id,
  category: getCategory("More")._id,
  name: "Helmets",
  slug: "helmets",
},
{
  menuGroup: getMenuGroup("Automotive")._id,
  category: getCategory("More")._id,
  name: "Car Accessories",
  slug: "car-accessories",
},
{
  menuGroup: getMenuGroup("Automotive")._id,
  category: getCategory("More")._id,
  name: "Bike Accessories",
  slug: "bike-accessories",
},

// Health
{
  menuGroup: getMenuGroup("Health")._id,
  category: getCategory("More")._id,
  name: "Protein Supplements",
  slug: "protein-supplements",
},
{
  menuGroup: getMenuGroup("Health")._id,
  category: getCategory("More")._id,
  name: "Vitamins",
  slug: "vitamins",
},
{
  menuGroup: getMenuGroup("Health")._id,
  category: getCategory("More")._id,
  name: "Medical Devices",
  slug: "medical-devices",
},
{
  menuGroup: getMenuGroup("Health")._id,
  category: getCategory("More")._id,
  name: "Fitness Equipment",
  slug: "fitness-equipment",
},

    ];

    await SubCategory.insertMany(subCategories);

    console.log("✅ Sub Categories Seeded Successfully");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedSubCategories();