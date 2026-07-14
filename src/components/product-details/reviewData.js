import user1 from "../../assets/images/users/user1.png";
import user2 from "../../assets/images/users/user2.png";
import user3 from "../../assets/images/users/user3.png";

import review1 from "../../assets/images/reviews/review1.png";
import review2 from "../../assets/images/reviews/review2.png";
import review3 from "../../assets/images/reviews/review3.png";

export const reviewSummary = {
  average: 4.8,
  totalReviews: 327,
  ratings: [
    {
      star: 5,
      count: 250,
    },
    {
      star: 4,
      count: 52,
    },
    {
      star: 3,
      count: 15,
    },
    {
      star: 2,
      count: 6,
    },
    {
      star: 1,
      count: 4,
    },
  ],
};

export const reviews = [
  {
    id: 1,

    user: "Rahul Sharma",

    avatar: user1,

    rating: 5,

    verified: true,

    date: "12 July 2026",

    title: "Excellent Quality",

    review:
      "Fabric quality is amazing. Stitching is premium and fitting is perfect. Highly recommended.",

    helpful: 32,

    images: [
      review1,
      review2,
    ],
  },

  {
    id: 2,

    user: "Priya Verma",

    avatar: user2,

    rating: 5,

    verified: true,

    date: "10 July 2026",

    title: "Worth Every Penny",

    review:
      "Very comfortable and stylish. Same as shown in the images. Delivery was also very fast.",

    helpful: 18,

    images: [
      review3,
    ],
  },

  {
    id: 3,

    user: "Amit Kumar",

    avatar: user3,

    rating: 4,

    verified: true,

    date: "8 July 2026",

    title: "Nice Product",

    review:
      "Good quality for the price. Packaging was excellent. Would definitely buy again.",

    helpful: 9,

    images: [],
  },
];