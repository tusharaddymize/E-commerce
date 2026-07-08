// export const navLinks = [
//   {
//     id: 1,
//     title: "Home",
//     path: "/",
//   },
//   {
//     id: 2,
//     title: "Categories",
//     path: "/categories",
//   },
//   {
//     id: 3,
//     title: "Best Sellers",
//     path: "/best-sellers",
//   },
//   {
//     id: 4,
//     title: "New Arrivals",
//     path: "/new-arrivals",
//   },
//   {
//     id: 5,
//     title: "Today's Deals",
//     path: "/deals",
//   },
//   {
//     id: 6,
//     title: "Electronics",
//     path: "/electronics",
//   },
//   {
//     id: 7,
//     title: "Fashion",
//     path: "/fashion",
//   },
//   {
//     id: 8,
//     title: "Home & Living",
//     path: "/home-living",
//   },
//   {
//     id: 9,
//     title: "More",
//     path: "/more",
//   },
// ];

// export const categories = [
//   {
//     id: 1,
//     name: "Electronics",
//     icon: "📱",
//   },
//   {
//     id: 2,
//     name: "Fashion",
//     icon: "👕",
//   },
//   {
//     id: 3,
//     name: "Home & Kitchen",
//     icon: "🏠",
//   },
//   {
//     id: 4,
//     name: "Beauty",
//     icon: "💄",
//   },
//   {
//     id: 5,
//     name: "Sports",
//     icon: "⚽",
//   },
//   {
//     id: 6,
//     name: "Books",
//     icon: "📚",
//   },
// ];




export const navLinks = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },

  {
    id: 2,
    title: "Categories",
    megaMenu: true,

    sections: [
      {
        title: "Men",
        items: [
          "T-Shirts",
          "Shirts",
          "Jeans",
          "Kurta",
          "Blazers",
          "Jackets",
          "Shoes",
          "Watches",
        ],
      },

      {
        title: "Women",
        items: [
          "Sarees",
          "Kurtis",
          "Lehengas",
          "Tops",
          "Jeans",
          "Dresses",
          "Handbags",
          "Jewellery",
        ],
      },

      {
        title: "Electronics",
        items: [
          "Mobiles",
          "Laptops",
          "Headphones",
          "Smart Watches",
          "Camera",
          "Gaming",
          "Power Bank",
          "TV",
        ],
      },

      {
        title: "Home",
        items: [
          "Furniture",
          "Kitchen",
          "Decor",
          "Lighting",
          "Storage",
          "Bedsheets",
          "Curtains",
          "Plants",
        ],
      },

      {
        title: "Beauty",
        items: [
          "Makeup",
          "Skincare",
          "Hair Care",
          "Perfume",
          "Lipstick",
          "Face Wash",
          "Body Lotion",
        ],
      },
    ],
  },

  {
    id: 3,
    title: "Best Sellers",
    path: "/best-sellers",
  },

  {
    id: 4,
    title: "New Arrivals",
    path: "/new-arrivals",
  },

  {
    id: 5,
    title: "Today's Deals",
    path: "/deals",
  },

  {
    id: 6,
    title: "Electronics",
    megaMenu: true,

    sections: [
      {
        title: "Mobiles",
        items: [
          "Apple",
          "Samsung",
          "OnePlus",
          "Realme",
          "Nothing",
          "Motorola",
        ],
      },

      {
        title: "Computers",
        items: [
          "Laptop",
          "Monitor",
          "Keyboard",
          "Mouse",
          "Printer",
          "SSD",
        ],
      },

      {
        title: "Accessories",
        items: [
          "Headphones",
          "Speaker",
          "Charger",
          "Power Bank",
          "Smart Watch",
          "Camera",
        ],
      },
    ],
  },

  {
    id: 7,
    title: "Fashion",
    megaMenu: true,

    sections: [
      {
        title: "Men Fashion",
        items: [
          "Shirts",
          "Jeans",
          "Shoes",
          "Jackets",
          "Kurta",
          "Blazers",
        ],
      },

      {
        title: "Women Fashion",
        items: [
          "Saree",
          "Kurti",
          "Lehenga",
          "Dress",
          "Top",
          "Handbags",
        ],
      },

      {
        title: "Kids Fashion",
        items: [
          "Boys",
          "Girls",
          "Baby Care",
          "Shoes",
          "School Bags",
        ],
      },
    ],
  },

  {
    id: 8,
    title: "Home & Living",
    megaMenu: true,

    sections: [
      {
        title: "Furniture",
        items: [
          "Sofa",
          "Bed",
          "Dining Table",
          "Chair",
          "Cupboard",
        ],
      },

      {
        title: "Kitchen",
        items: [
          "Cookware",
          "Mixer",
          "Bottle",
          "Dinner Set",
          "Storage",
        ],
      },

      {
        title: "Decoration",
        items: [
          "Wall Art",
          "Lamps",
          "Plants",
          "Clock",
          "Vases",
        ],
      },
    ],
  },

  {
    id: 9,
    title: "More",
    megaMenu: true,

    sections: [
      {
        title: "Sports",
        items: [
          "Cricket",
          "Football",
          "Gym",
          "Cycling",
        ],
      },

      {
        title: "Books",
        items: [
          "Education",
          "Novel",
          "Comics",
          "Biography",
        ],
      },

      {
        title: "Automobile",
        items: [
          "Helmet",
          "Bike Accessories",
          "Car Care",
        ],
      },
    ],
  },
];

