import "dotenv/config";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import SubCategory from "./models/SubCategory.js";
import Filter from "./models/Filter.js";

/* =========================================================
   FILTER TEMPLATES

   key        = Product.attributes me save hone wali key
   title      = Admin/customer ko dikhne wala naam
   type       = checkbox / dropdown / radio / color / range
   options    = Common predefined options

   NOTE:
   Product-specific values future me Product.attributes
   se bhi generate/update ki ja sakti hain.
========================================================= */

const option = (value, color = "") => ({
  label: String(value),
  value: String(value).toLowerCase(),
  color,
  sortOrder: 0,
  isActive: true,
});

const templates = {
  /* =======================================================
      ELECTRONICS - MOBILES
  ======================================================= */

  "android-phones": [
    {
      title: "RAM",
      key: "ram",
      type: "checkbox",
      options: ["4GB", "6GB", "8GB", "12GB", "16GB"],
    },
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: [
        "64GB",
        "128GB",
        "256GB",
        "512GB",
        "1TB",
      ],
    },
    {
      title: "Network",
      key: "network",
      type: "checkbox",
      options: ["4G", "5G"],
    },
    {
      title: "Battery",
      key: "battery",
      type: "checkbox",
      options: [
        "4000mAh",
        "5000mAh",
        "6000mAh",
      ],
    },
  ],

  "feature-phones": [
    {
      title: "Network",
      key: "network",
      type: "checkbox",
      options: ["2G", "4G"],
    },
    {
      title: "SIM Type",
      key: "sim-type",
      type: "checkbox",
      options: ["Single SIM", "Dual SIM"],
    },
    {
      title: "Battery",
      key: "battery",
      type: "checkbox",
      options: [
        "1000mAh",
        "1500mAh",
        "2000mAh",
      ],
    },
  ],

  "foldable-phones": [
    {
      title: "RAM",
      key: "ram",
      type: "checkbox",
      options: ["8GB", "12GB", "16GB"],
    },
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: ["256GB", "512GB", "1TB"],
    },
    {
      title: "Network",
      key: "network",
      type: "checkbox",
      options: ["5G"],
    },
  ],

  iphones: [
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: [
        "128GB",
        "256GB",
        "512GB",
        "1TB",
      ],
    },
    {
      title: "Network",
      key: "network",
      type: "checkbox",
      options: ["5G"],
    },
  ],

  chargers: [
    {
      title: "Wattage",
      key: "wattage",
      type: "checkbox",
      options: [
        "18W",
        "20W",
        "25W",
        "33W",
        "45W",
        "65W",
        "100W",
      ],
    },
    {
      title: "Connector Type",
      key: "connector-type",
      type: "checkbox",
      options: [
        "USB-A",
        "USB-C",
        "Lightning",
      ],
    },
  ],

  earbuds: [
    {
      title: "Connectivity",
      key: "connectivity",
      type: "checkbox",
      options: ["Bluetooth", "Wired"],
    },
    {
      title: "Noise Cancellation",
      key: "noise-cancellation",
      type: "checkbox",
      options: ["ANC", "ENC", "No"],
    },
    {
      title: "Battery Life",
      key: "battery-life",
      type: "checkbox",
      options: [
        "20 Hours",
        "30 Hours",
        "40 Hours",
        "50+ Hours",
      ],
    },
  ],

  "power-banks": [
    {
      title: "Capacity",
      key: "capacity",
      type: "checkbox",
      options: [
        "5000mAh",
        "10000mAh",
        "20000mAh",
        "30000mAh",
      ],
    },
    {
      title: "Fast Charging",
      key: "fast-charging",
      type: "checkbox",
      options: ["Yes", "No"],
    },
  ],

  "phone-cases": [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Silicone",
        "Leather",
        "Plastic",
        "TPU",
      ],
    },
  ],

  "screen-protectors": [
    {
      title: "Type",
      key: "protector-type",
      type: "checkbox",
      options: [
        "Tempered Glass",
        "Privacy Glass",
        "Matte",
      ],
    },
  ],

  "smart-watches": [
    {
      title: "Display",
      key: "display",
      type: "checkbox",
      options: ["AMOLED", "LCD", "OLED"],
    },
    {
      title: "Connectivity",
      key: "connectivity",
      type: "checkbox",
      options: [
        "Bluetooth",
        "Wi-Fi",
        "GPS",
        "LTE",
      ],
    },
  ],

  "refurbished-phones": [
    {
      title: "Condition",
      key: "condition",
      type: "checkbox",
      options: [
        "Excellent",
        "Good",
        "Fair",
      ],
    },
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: [
        "64GB",
        "128GB",
        "256GB",
        "512GB",
      ],
    },
  ],

  /* =======================================================
      ELECTRONICS - LAPTOPS
  ======================================================= */

  "2-in-1-laptops": laptopFilters(),
  "business-laptops": laptopFilters(),
  "gaming-laptops": [
    ...laptopFilters(),
    {
      title: "Graphics",
      key: "graphics",
      type: "checkbox",
      options: [
        "RTX 3050",
        "RTX 4050",
        "RTX 4060",
        "RTX 4070",
      ],
    },
  ],
  macbooks: [
    {
      title: "Chip",
      key: "processor",
      type: "checkbox",
      options: ["M1", "M2", "M3", "M4"],
    },
    {
      title: "RAM",
      key: "ram",
      type: "checkbox",
      options: [
        "8GB",
        "16GB",
        "24GB",
        "32GB",
      ],
    },
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: [
        "256GB",
        "512GB",
        "1TB",
        "2TB",
      ],
    },
  ],
  "student-laptops": laptopFilters(),

  "laptop-ram": [
    {
      title: "Capacity",
      key: "capacity",
      type: "checkbox",
      options: ["4GB", "8GB", "16GB", "32GB"],
    },
    {
      title: "RAM Type",
      key: "ram-type",
      type: "checkbox",
      options: ["DDR4", "DDR5"],
    },
  ],

  "laptop-ssd": [
    {
      title: "Capacity",
      key: "capacity",
      type: "checkbox",
      options: [
        "256GB",
        "512GB",
        "1TB",
        "2TB",
      ],
    },
    {
      title: "Interface",
      key: "interface",
      type: "checkbox",
      options: ["SATA", "NVMe"],
    },
  ],

  "laptop-bags": [
    {
      title: "Laptop Size",
      key: "laptop-size",
      type: "checkbox",
      options: [
        "13 inch",
        "14 inch",
        "15.6 inch",
        "17 inch",
      ],
    },
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Polyester",
        "Nylon",
        "Leather",
      ],
    },
  ],

  /* =======================================================
      TV & APPLIANCES
  ======================================================= */

  "air-conditioners": [
    {
      title: "Capacity",
      key: "capacity",
      type: "checkbox",
      options: ["1 Ton", "1.5 Ton", "2 Ton"],
    },
    {
      title: "AC Type",
      key: "ac-type",
      type: "checkbox",
      options: ["Split", "Window"],
    },
    {
      title: "Star Rating",
      key: "star-rating",
      type: "checkbox",
      options: ["3 Star", "4 Star", "5 Star"],
    },
  ],

  "led-tvs": tvFilters(),
  "smart-tvs": tvFilters(),

  refrigerators: [
    {
      title: "Capacity",
      key: "capacity",
      type: "checkbox",
      options: [
        "Below 200L",
        "200-300L",
        "300-500L",
        "500L+",
      ],
    },
    {
      title: "Door Type",
      key: "door-type",
      type: "checkbox",
      options: [
        "Single Door",
        "Double Door",
        "Side by Side",
      ],
    },
  ],

  "washing-machines": [
    {
      title: "Capacity",
      key: "capacity",
      type: "checkbox",
      options: [
        "6kg",
        "7kg",
        "8kg",
        "9kg",
        "10kg+",
      ],
    },
    {
      title: "Load Type",
      key: "load-type",
      type: "checkbox",
      options: [
        "Front Load",
        "Top Load",
      ],
    },
  ],

  "microwave-ovens": [
    {
      title: "Capacity",
      key: "capacity",
      type: "checkbox",
      options: [
        "20L",
        "25L",
        "30L",
        "32L+",
      ],
    },
    {
      title: "Type",
      key: "microwave-type",
      type: "checkbox",
      options: [
        "Solo",
        "Grill",
        "Convection",
      ],
    },
  ],

  "water-purifiers": [
    {
      title: "Purification",
      key: "purification",
      type: "checkbox",
      options: ["RO", "UV", "UF", "RO + UV"],
    },
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: ["5L", "7L", "10L", "12L+"],
    },
  ],

  /* =======================================================
      AUDIO
  ======================================================= */

  "bluetooth-speakers": audioFilters(),
  earphones: audioFilters(),
  headphones: audioFilters(),
  soundbars: audioFilters(),

  "home-theatre": [
    ...audioFilters(),
    {
      title: "Channels",
      key: "channels",
      type: "checkbox",
      options: ["2.1", "5.1", "7.1"],
    },
  ],

  /* =======================================================
      CAMERAS
  ======================================================= */

  dslr: cameraFilters(),
  "mirrorless-cameras": cameraFilters(),

  "action-cameras": [
    {
      title: "Video Resolution",
      key: "video-resolution",
      type: "checkbox",
      options: ["1080p", "4K", "5.3K", "8K"],
    },
    {
      title: "Waterproof",
      key: "waterproof",
      type: "checkbox",
      options: ["Yes", "No"],
    },
  ],

  "camera-lenses": [
    {
      title: "Lens Mount",
      key: "lens-mount",
      type: "checkbox",
      options: [
        "Canon RF",
        "Canon EF",
        "Sony E",
        "Nikon Z",
        "Nikon F",
      ],
    },
    {
      title: "Lens Type",
      key: "lens-type",
      type: "checkbox",
      options: [
        "Prime",
        "Zoom",
        "Wide Angle",
        "Telephoto",
        "Macro",
      ],
    },
  ],

  tripods: [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Aluminium",
        "Carbon Fiber",
        "Plastic",
      ],
    },
    {
      title: "Usage",
      key: "usage",
      type: "checkbox",
      options: [
        "Camera",
        "Mobile",
        "Both",
      ],
    },
  ],

  /* =======================================================
      GAMING
  ======================================================= */

  "gaming-chair": [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Fabric",
        "Leather",
        "Mesh",
      ],
    },
    {
      title: "Reclining",
      key: "reclining",
      type: "checkbox",
      options: ["Yes", "No"],
    },
  ],

  "gaming-consoles": [
    {
      title: "Platform",
      key: "platform",
      type: "checkbox",
      options: [
        "PlayStation",
        "Xbox",
        "Nintendo",
      ],
    },
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: ["512GB", "1TB", "2TB"],
    },
  ],

  "gaming-keyboard": [
    {
      title: "Keyboard Type",
      key: "keyboard-type",
      type: "checkbox",
      options: [
        "Mechanical",
        "Membrane",
      ],
    },
    {
      title: "Connectivity",
      key: "connectivity",
      type: "checkbox",
      options: ["Wired", "Wireless"],
    },
  ],

  "gaming-mouse": [
    {
      title: "Connectivity",
      key: "connectivity",
      type: "checkbox",
      options: ["Wired", "Wireless"],
    },
    {
      title: "DPI",
      key: "dpi",
      type: "checkbox",
      options: [
        "3200",
        "6400",
        "12000",
        "16000+",
      ],
    },
  ],

  "gaming-pcs": [
    ...laptopFilters(),
    {
      title: "Graphics",
      key: "graphics",
      type: "checkbox",
      options: [
        "RTX 3050",
        "RTX 4060",
        "RTX 4070",
        "RTX 4080",
      ],
    },
  ],

  /* =======================================================
      FASHION - CLOTHING
  ======================================================= */

  hoodies: clothingFilters(),
  jackets: clothingFilters(),
  shirts: clothingFilters(),
  "t-shirts": clothingFilters(),
  trousers: clothingFilters(),
  "ethnic-wear": clothingFilters(),
  dresses: clothingFilters(),
  kurtis: clothingFilters(),
  leggings: clothingFilters(),
  sarees: clothingFilters(),
  tops: clothingFilters(),
  "baby-wear": clothingFilters(),
  "boys-clothing": clothingFilters(),
  "girls-clothing": clothingFilters(),
  "school-uniform": clothingFilters(),

  jeans: [
    ...clothingFilters(),
    {
      title: "Waist",
      key: "waist",
      type: "checkbox",
      options: [
        "28",
        "30",
        "32",
        "34",
        "36",
        "38",
        "40",
      ],
    },
  ],

"women-jeans": [
  ...clothingFilters(),
  {
    title: "Waist",
    key: "waist",
    type: "checkbox",
    options: ["26", "28", "30", "32", "34", "36", "38"],
  },
],
  

  /* =======================================================
      FASHION - FOOTWEAR
  ======================================================= */

  boots: footwearFilters(),
  "casual-shoes": footwearFilters(),
  "formal-shoes": footwearFilters(),
  sandals: footwearFilters(),
  slippers: footwearFilters(),
  "sports-shoes": footwearFilters(),
  "kids-shoes": footwearFilters(),
  heels: footwearFilters(),

  /* =======================================================
      WATCHES
  ======================================================= */
"fashion-smart-watches": [
  {
    title: "Display",
    key: "display",
    type: "checkbox",
    options: ["AMOLED", "OLED", "LCD"],
  },
  {
    title: "Connectivity",
    key: "connectivity",
    type: "checkbox",
    options: ["Bluetooth", "Wi-Fi", "GPS", "LTE"],
  },
  {
    title: "Compatibility",
    key: "compatibility",
    type: "checkbox",
    options: ["Android", "iOS", "Android & iOS"],
  },
],
  "analog-watches": watchFilters(),
  "digital-watches": watchFilters(),
  "luxury-watches": watchFilters(),

  /* =======================================================
      BAGS
  ======================================================= */
"fashion-laptop-bags": [
  {
    title: "Laptop Size",
    key: "laptop-size",
    type: "checkbox",
    options: ["13 inch", "14 inch", "15.6 inch", "17 inch"],
  },
  {
    title: "Material",
    key: "material",
    type: "checkbox",
    options: ["Polyester", "Nylon", "Leather", "Canvas"],
  },
],
  backpacks: bagFilters(),
  "duffel-bags": bagFilters(),
  "travel-bags": bagFilters(),
  handbags: bagFilters(),
  wallets: bagFilters(),

  /* =======================================================
      JEWELLERY
  ======================================================= */

anklets: jewelleryFilters(),
bracelets: jewelleryFilters(),
earrings: jewelleryFilters(),

necklaces: jewelleryFilters(),

rings: [
  ...jewelleryFilters(),
  {
    title: "Ring Size",
    key: "size",
    type: "checkbox",
    options: ["6", "7", "8", "9", "10", "11", "12"],
  },
],

  /* =======================================================
      HOME & LIVING - FURNITURE
  ======================================================= */

  beds: [
    {
      title: "Bed Size",
      key: "size",
      type: "checkbox",
      options: [
        "Single",
        "Double",
        "Queen",
        "King",
      ],
    },
    ...furnitureFilters(),
  ],

  "dining-tables": furnitureFilters(),
  "office-chairs": furnitureFilters(),
  sofas: furnitureFilters(),
  "tv-units": furnitureFilters(),
  wardrobes: furnitureFilters(),

  /* =======================================================
      KITCHEN
  ======================================================= */

  cookware: kitchenFilters(),
  "dinner-sets": kitchenFilters(),
  "gas-stoves": kitchenFilters(),
  "mixer-grinders": kitchenFilters(),
  "pressure-cookers": kitchenFilters(),
  "storage-containers": kitchenFilters(),

  /* =======================================================
      HOME DECOR
  ======================================================= */

  carpets: decorFilters(),
  curtains: decorFilters(),
  "indoor-plants": decorFilters(),
  mirrors: decorFilters(),
  "wall-art": decorFilters(),
  "wall-clocks": decorFilters(),

  /* =======================================================
      LIGHTING
  ======================================================= */

  "ceiling-lights": lightingFilters(),
  "led-bulbs": lightingFilters(),
  "outdoor-lights": lightingFilters(),
  "table-lamps": lightingFilters(),
  "wall-lights": lightingFilters(),

  /* =======================================================
      BEDDING
  ======================================================= */

  bedsheets: beddingFilters(),
  blankets: beddingFilters(),
  comforters: beddingFilters(),
  "mattress-protectors": beddingFilters(),
  pillows: beddingFilters(),

  /* =======================================================
      BEAUTY
  ======================================================= */

  "compact-powder": makeupFilters(),
  concealer: makeupFilters(),
  foundation: makeupFilters(),
  lipsticks: makeupFilters(),
  mascara: makeupFilters(),

  "face-mask": skincareFilters(),
  "face-wash": skincareFilters(),
  moisturizer: skincareFilters(),
  serum: skincareFilters(),
  sunscreen: skincareFilters(),

  conditioner: hairFilters(),
  "hair-dryer": hairFilters(),
  "hair-oil": hairFilters(),
  "hair-serum": hairFilters(),
  shampoo: hairFilters(),

  "body-mist": perfumeFilters(),
  "men-perfumes": perfumeFilters(),
  "women-perfumes": perfumeFilters(),

  /* =======================================================
      BOOKS
  ======================================================= */

  mystery: bookFilters(),
  novels: bookFilters(),
  romance: bookFilters(),
  thriller: bookFilters(),
  biography: bookFilters(),
  business: bookFilters(),
  "business-books": bookFilters(),
  "self-help": bookFilters(),
  "competitive-exams": academicBookFilters(),
  engineering: academicBookFilters(),
  medical: academicBookFilters(),
  dc: comicFilters(),
  manga: comicFilters(),
  marvel: comicFilters(),

  /* =======================================================
      SPORTS
  ======================================================= */

  badminton: sportsFilters(),
  cricket: sportsFilters(),
  football: sportsFilters(),
  "gym-equipment": sportsFilters(),

  /* =======================================================
      GROCERY
  ======================================================= */

  flour: groceryFilters(),
  pulses: groceryFilters(),
  rice: groceryFilters(),
  spices: groceryFilters(),

  /* =======================================================
      TOYS
  ======================================================= */

  "board-games": toyFilters(),
  dolls: toyFilters(),
  "educational-toys": toyFilters(),
  "remote-cars": toyFilters(),

  /* =======================================================
      AUTOMOTIVE
  ======================================================= */

  "bike-accessories": automotiveFilters(),
  "car-accessories": automotiveFilters(),
  helmets: [
    {
      title: "Helmet Size",
      key: "size",
      type: "checkbox",
      options: ["S", "M", "L", "XL"],
    },
    {
      title: "Helmet Type",
      key: "helmet-type",
      type: "checkbox",
      options: [
        "Full Face",
        "Open Face",
        "Modular",
      ],
    },
  ],

  /* =======================================================
      HEALTH
  ======================================================= */

  "fitness-equipment": healthFilters(),
  "medical-devices": healthFilters(),
  "protein-supplements": healthFilters(),
  vitamins: healthFilters(),
};

/* =========================================================
   REUSABLE FILTER GROUPS
========================================================= */

function laptopFilters() {
  return [
    {
      title: "RAM",
      key: "ram",
      type: "checkbox",
      options: [
        "4GB",
        "8GB",
        "16GB",
        "32GB",
        "64GB",
      ],
    },
    {
      title: "Storage",
      key: "storage",
      type: "checkbox",
      options: [
        "256GB",
        "512GB",
        "1TB",
        "2TB",
      ],
    },
    {
      title: "Processor",
      key: "processor",
      type: "checkbox",
      options: [
        "Core i3",
        "Core i5",
        "Core i7",
        "Ryzen 5",
        "Ryzen 7",
      ],
    },
  ];
}

function tvFilters() {
  return [
    {
      title: "Screen Size",
      key: "screen-size",
      type: "checkbox",
      options: [
        "32 inch",
        "43 inch",
        "50 inch",
        "55 inch",
        "65 inch",
      ],
    },
    {
      title: "Resolution",
      key: "resolution",
      type: "checkbox",
      options: [
        "HD",
        "Full HD",
        "4K",
        "8K",
      ],
    },
  ];
}

function audioFilters() {
  return [
    {
      title: "Connectivity",
      key: "connectivity",
      type: "checkbox",
      options: [
        "Bluetooth",
        "Wired",
        "Wi-Fi",
      ],
    },
    {
      title: "Power",
      key: "power",
      type: "checkbox",
      options: ["10W", "20W", "40W", "100W+"],
    },
  ];
}

function cameraFilters() {
  return [
    {
      title: "Megapixels",
      key: "megapixels",
      type: "checkbox",
      options: [
        "20MP",
        "24MP",
        "33MP",
        "45MP",
        "50MP+",
      ],
    },
    {
      title: "Sensor",
      key: "sensor",
      type: "checkbox",
      options: [
        "APS-C",
        "Full Frame",
        "Micro Four Thirds",
      ],
    },
    {
      title: "Video Resolution",
      key: "video-resolution",
      type: "checkbox",
      options: ["Full HD", "4K", "8K"],
    },
  ];
}

function clothingFilters() {
  return [
    {
      title: "Size",
      key: "size",
      type: "checkbox",
      options: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      title: "Fit",
      key: "fit",
      type: "checkbox",
      options: [
        "Slim",
        "Regular",
        "Relaxed",
        "Oversized",
      ],
    },
    {
      title: "Fabric",
      key: "fabric",
      type: "checkbox",
      options: [
        "Cotton",
        "Polyester",
        "Wool",
        "Linen",
        "Denim",
      ],
    },
  ];
}

function footwearFilters() {
  return [
    {
      title: "Size",
      key: "size",
      type: "checkbox",
      options: [
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
    },
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Leather",
        "Synthetic",
        "Mesh",
        "Canvas",
      ],
    },
  ];
}

function watchFilters() {
  return [
    {
      title: "Dial Shape",
      key: "dial-shape",
      type: "checkbox",
      options: [
        "Round",
        "Square",
        "Rectangle",
      ],
    },
    {
      title: "Strap Material",
      key: "strap-material",
      type: "checkbox",
      options: [
        "Leather",
        "Metal",
        "Silicone",
      ],
    },
  ];
}

function bagFilters() {
  return [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Leather",
        "Polyester",
        "Nylon",
        "Canvas",
      ],
    },
    {
      title: "Size",
      key: "size",
      type: "checkbox",
      options: ["Small", "Medium", "Large"],
    },
  ];
}

function jewelleryFilters() {
  return [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Gold",
        "Silver",
        "Artificial",
        "Stainless Steel",
      ],
    },
  ];
}

function furnitureFilters() {
  return [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Wood",
        "Metal",
        "Engineered Wood",
        "Plastic",
      ],
    },
  ];
}

function kitchenFilters() {
  return [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Stainless Steel",
        "Aluminium",
        "Glass",
        "Plastic",
      ],
    },
  ];
}

function decorFilters() {
  return [
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Wood",
        "Metal",
        "Fabric",
        "Glass",
        "Plastic",
      ],
    },
  ];
}

function lightingFilters() {
  return [
    {
      title: "Power",
      key: "power",
      type: "checkbox",
      options: [
        "5W",
        "9W",
        "12W",
        "20W",
        "40W+",
      ],
    },
    {
      title: "Light Color",
      key: "light-color",
      type: "checkbox",
      options: [
        "Warm White",
        "Cool White",
        "Natural White",
      ],
    },
  ];
}

function beddingFilters() {
  return [
    {
      title: "Size",
      key: "size",
      type: "checkbox",
      options: [
        "Single",
        "Double",
        "Queen",
        "King",
      ],
    },
    {
      title: "Material",
      key: "material",
      type: "checkbox",
      options: [
        "Cotton",
        "Microfiber",
        "Polyester",
      ],
    },
  ];
}

function makeupFilters() {
  return [
    {
      title: "Finish",
      key: "finish",
      type: "checkbox",
      options: [
        "Matte",
        "Glossy",
        "Natural",
        "Satin",
      ],
    },
    {
      title: "Skin Type",
      key: "skin-type",
      type: "checkbox",
      options: [
        "Normal",
        "Dry",
        "Oily",
        "Combination",
      ],
    },
  ];
}

function skincareFilters() {
  return [
    {
      title: "Skin Type",
      key: "skin-type",
      type: "checkbox",
      options: [
        "Normal",
        "Dry",
        "Oily",
        "Combination",
        "Sensitive",
      ],
    },
  ];
}

function hairFilters() {
  return [
    {
      title: "Hair Type",
      key: "hair-type",
      type: "checkbox",
      options: [
        "Normal",
        "Dry",
        "Oily",
        "Curly",
        "Damaged",
      ],
    },
  ];
}

function perfumeFilters() {
  return [
    {
      title: "Fragrance",
      key: "fragrance",
      type: "checkbox",
      options: [
        "Fresh",
        "Woody",
        "Floral",
        "Citrus",
        "Oriental",
      ],
    },
  ];
}

function bookFilters() {
  return [
    {
      title: "Language",
      key: "language",
      type: "checkbox",
      options: [
        "English",
        "Hindi",
        "Other",
      ],
    },
    {
      title: "Format",
      key: "format",
      type: "checkbox",
      options: [
        "Paperback",
        "Hardcover",
      ],
    },
  ];
}

function academicBookFilters() {
  return [
    ...bookFilters(),
    {
      title: "Level",
      key: "level",
      type: "checkbox",
      options: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
    },
  ];
}

function comicFilters() {
  return [
    ...bookFilters(),
    {
      title: "Edition",
      key: "edition",
      type: "checkbox",
      options: [
        "Standard",
        "Collector",
        "Special",
      ],
    },
  ];
}

function sportsFilters() {
  return [
    {
      title: "Level",
      key: "level",
      type: "checkbox",
      options: [
        "Beginner",
        "Intermediate",
        "Professional",
      ],
    },
  ];
}

function groceryFilters() {
  return [
    {
      title: "Weight",
      key: "weight",
      type: "checkbox",
      options: [
        "250g",
        "500g",
        "1kg",
        "5kg",
        "10kg",
      ],
    },
    {
      title: "Type",
      key: "food-type",
      type: "checkbox",
      options: ["Regular", "Organic"],
    },
  ];
}

function toyFilters() {
  return [
    {
      title: "Age Group",
      key: "age-group",
      type: "checkbox",
      options: [
        "0-3 Years",
        "3-5 Years",
        "5-8 Years",
        "8-12 Years",
        "12+ Years",
      ],
    },
  ];
}

function automotiveFilters() {
  return [
    {
      title: "Vehicle Type",
      key: "vehicle-type",
      type: "checkbox",
      options: [
        "Bike",
        "Car",
        "Universal",
      ],
    },
  ];
}

function healthFilters() {
  return [
    {
      title: "Usage",
      key: "usage",
      type: "checkbox",
      options: [
        "Home",
        "Fitness",
        "Professional",
      ],
    },
  ];
}

/* =========================================================
   NORMALIZE TEMPLATE
========================================================= */

const normalizeFilter = (filter) => ({
  ...filter,

  options: (filter.options || []).map((item) =>
    typeof item === "string"
      ? option(item)
      : item
  ),

  isRequired: false,
  isDynamic: true,
  isActive: true,
  sortOrder: 0,
});

/* =========================================================
   SEED FILTERS
========================================================= */

const seedFilters = async () => {
  try {
    await connectDB();

    console.log("🌱 Filter seeding started...");

    const subCategories =
      await SubCategory.find({
        isActive: true,
      });

    console.log(
      `📦 ${subCategories.length} subcategories found`
    );

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const subCategory of subCategories) {
      const slug = subCategory.slug
        ?.trim()
        .toLowerCase();

      const template = templates[slug];

      if (!template?.length) {
        console.log(
          `⚠️ No template: ${subCategory.name} (${slug})`
        );

        skipped++;
        continue;
      }

      for (const rawFilter of template) {
        const filter =
          normalizeFilter(rawFilter);

        const existing =
          await Filter.findOne({
            subCategory: subCategory._id,
            key: filter.key,
          });

        const data = {
          category: subCategory.category,
          menuGroup: subCategory.menuGroup,
          subCategory: subCategory._id,

          title: filter.title,
          key: filter.key,
          type: filter.type,

          options: filter.options,

          min: filter.min ?? null,
          max: filter.max ?? null,
          step: filter.step ?? 1,

          isRequired:
            filter.isRequired ?? false,

          isDynamic: true,
          isActive: true,

          sortOrder:
            filter.sortOrder ?? 0,
        };

        if (existing) {
          await Filter.findByIdAndUpdate(
            existing._id,
            data,
            {
              new: true,
              runValidators: true,
            }
          );

          updated++;
        } else {
          await Filter.create(data);
          created++;
        }
      }

      console.log(
        `✅ ${subCategory.name}`
      );
    }

    console.log("");
    console.log("==========================");
    console.log("🎉 FILTER SEED COMPLETE");
    console.log("==========================");
    console.log(`Created : ${created}`);
    console.log(`Updated : ${updated}`);
    console.log(`Skipped : ${skipped}`);
    console.log("==========================");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Filter seed failed:",
      error
    );

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedFilters();