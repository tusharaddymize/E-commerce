import headphone1 from "../../assets/images/na-headphones.png";
import headphone2 from "../../assets/images/product1.png";
import headphone3 from "../../assets/images/product2.png";
import headphone4 from "../../assets/images/product3.png";

export const product = {
  id: 1,

  name: "Premium Wireless Headphones",

  brand: "SoundMax",

  rating: 4.8,

  totalReviews: 284,

  sold: 1256,

  sku: "SM-WH-1001",

  category: "Electronics",

  stock: true,

  price: 1999,

  oldPrice: 2999,

  discount: 33,

  description:
    "Experience crystal-clear sound with our premium wireless headphones. Designed for comfort, long battery life, and immersive music. Perfect for work, gaming, and travel.",

  specifications: [
    {
      title: "Bluetooth",
      value: "5.3",
    },
    {
      title: "Battery",
      value: "40 Hours",
    },
    {
      title: "Charging",
      value: "USB Type-C",
    },
    {
      title: "Noise Cancellation",
      value: "Active",
    },
    {
      title: "Weight",
      value: "240g",
    },
    {
      title: "Warranty",
      value: "1 Year",
    },
  ],

  colors: [
    "#000000",
    "#355E3B",
    "#2563EB",
    "#ffffff",
  ],

  sizes: [
    "S",
    "M",
    "L",
    "XL",
  ],

  images: [
    headphone1,
    headphone2,
    headphone3,
    headphone4,
  ],
};

export const relatedProducts = [
  {
    id: 1,
    title: "Gaming Headset",
    image: headphone2,
    price: 1799,
  },
  {
    id: 2,
    title: "Bluetooth Speaker",
    image: headphone3,
    price: 1499,
  },
  {
    id: 3,
    title: "Smart Watch",
    image: headphone4,
    price: 2499,
  },
  {
    id: 4,
    title: "Wireless Earbuds",
    image: headphone1,
    price: 1299,
  },
];

export const customerReviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "12 July 2026",
    review:
      "Amazing sound quality. Battery backup is excellent. Worth every rupee.",
  },
  {
    id: 2,
    name: "Priya Verma",
    rating: 4,
    date: "09 July 2026",
    review:
      "Comfortable to wear for long hours. Delivery was quick.",
  },
  {
    id: 3,
    name: "Aman Gupta",
    rating: 5,
    date: "03 July 2026",
    review:
      "Noise cancellation is outstanding. Highly recommended.",
      
  },
];